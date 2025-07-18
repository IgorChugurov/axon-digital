# AI Agent Workflow Documentation

## Система сбора технических заданий (RFP) через AI диалог

### 🎯 **Цель системы**

Автоматизированный сбор информации от клиентов через естественный диалог для формирования технического задания (RFP - Request for Proposal) с последующей отправкой клиенту и сохранением в базу данных.

---

## 📋 **Архитектура системы**

### **Основные компоненты:**

1. **Frontend UI** - `ChatWindowStream.tsx`
2. **API Gateway** - `/api/assistant/stream/route.ts`
3. **Assistant Service** - `assistant.service.ts`
4. **Context Management** - система управления контекстом
5. **Function Handlers** - обработчики вызовов функций
6. **Database Layer** - сохранение данных в БД

---

## 🔄 **Workflow детально**

### **1. Инициализация диалога**

```typescript
// 1.1 Пользователь открывает чат
const [messages, setMessages] = useState<Message[]>([]);
const [threadId, setThreadId] = useState<string | undefined>();

// 1.2 Проверяется существующий thread в localStorage
const savedThreadId = localStorage.getItem(THREAD_KEY);
if (savedThreadId) {
  setThreadId(savedThreadId);
  getMessages(savedThreadId); // Загружаются предыдущие сообщения
}

// 1.3 Создается пустой контекст
const initialContext = context || createEmptyAssistantContext(thread.id);
```

### **2. Структура контекста (AssistantContext)**

```typescript
interface AssistantContext {
  threadId: string;
  project: {
    goal: { type: string; description: string };
    industry: string;
    audience: { type: string; description: string; specifics?: string };
    usp: string;
  };
  technical: {
    features: { mustHave: string[]; niceToHave?: string[] };
    integrations: { standard?: string[]; custom?: string[] };
    infrastructure: string[];
    platform: string;
    multilingual: boolean;
    accessibilityCompliance: { required: boolean; notes?: string };
  };
  seoAndPerformance: {
    advancedSeoRequired?: boolean;
    notes?: string;
  };
  delivery: {
    deadline: string;
    budget: { range: string; description?: string };
    paymentModel: string;
    phasedDevelopment: boolean;
    supportRequired: boolean;
  };
  contact: {
    preferredChannel: string;
    value: string;
  };
  updatedAt: Date;
}
```

### **3. Диалоговый процесс**

#### **3.1 Приоритеты сбора информации:**

```typescript
const priorityGroups = [
  { fields: ["goal", "audience"], priority: 1 }, // Критичные
  { fields: ["features", "deadline"], priority: 2 }, // Важные
  { fields: ["industry", "usp", "platform"], priority: 3 }, // Полезные
  {
    fields: [
      "integrations",
      "infrastructure",
      "multilingual",
      "accessibilityCompliance",
      "advancedSeoRequired",
    ],
    priority: 4,
  }, // Технические
  {
    fields: ["budget", "phasedDevelopment", "supportRequired", "contact"],
    priority: 5,
  }, // Финальные
];
```

#### **3.2 Генерация инструкций:**

```typescript
// На основе недостающих полей генерируются динамические инструкции
export function generateAdditionalInstructions(
  context: AssistantContext
): string {
  const missingFields = []; // Определяются пустые поля
  const focusBlock = buildFocusBlock(missingFields); // Создаются подсказки

  return `
    🧠 Current known facts: ${generateKnownFactsBlock(context)}
    📝 Focus for this message: ${focusBlock}
    🔧 Function Call Requirements: MANDATORY after EVERY reply
  `;
}
```

### **4. Обработка сообщений**

#### **4.1 Клиентская часть (ChatWindowStream):**

```typescript
const handleSendMessage = async (text: string) => {
  // Добавление сообщения пользователя
  setMessages([...messages, { id, text, sender: "user" }]);

  // Отправка на сервер
  const res = await fetch("/api/assistant/stream", {
    method: "POST",
    body: JSON.stringify({ message: text, threadId }),
  });

  // Потоковое получение ответа
  const reader = res.body?.getReader();
  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    // Обновление UI в реальном времени
  }
};
```

#### **4.2 Серверная часть (API Route):**

```typescript
export async function POST(req: NextRequest) {
  // Валидация и модерация
  const validationResult = validateMessageInput(message);
  const moderationResult = await moderateMessage(message);

  // Создание или использование существующего thread
  const thread = threadId
    ? { id: threadId }
    : await openai.beta.threads.create();

  // Загрузка контекста из БД
  const loadedContext = await loadContextFromDatabase(threadId);

  // Делегирование обработки в Assistant Service
  const { stream } = await handleUserMessage({
    threadId: thread.id,
    message,
    context: loadedContext,
    ip,
  });

  return new Response(stream);
}
```

### **5. Assistant Service & Function Calls**

#### **5.1 Основной процесс:**

```typescript
export async function handleUserMessage({ threadId, message, context, ip }) {
  // Генерация дополнительных инструкций на основе контекста
  const additionalInstructions = generateAdditionalInstructions(context);

  // Создание сообщения в OpenAI thread
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });

  // Запуск потокового ответа
  const runStream = await openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
    additional_instructions: additionalInstructions,
  });

  // Обработка событий потока
  for await (const event of runStream) {
    if (event.event === "thread.message.delta") {
      // Потоковый вывод текста
    }

    if (event.event === "thread.run.requires_action") {
      // Обработка вызовов функций
      const { outputs, updatedContext } = await handleToolCalls(
        toolCalls,
        threadId,
        currentContext
      );
    }
  }
}
```

#### **5.2 Обработчик функций:**

```typescript
export async function handleToolCalls(toolCalls, threadId, currentContext) {
  for (const toolCall of toolCalls) {
    const { name, arguments: argsString } = toolCall.function;
    const args = JSON.parse(argsString);

    if (name === "update_context") {
      // Обновление контекста
      updatedContext = updateAssistantContextFromFunctionCall(
        updatedContext,
        args
      );
      await saveContextToDatabase({ threadId, context: updatedContext });
    } else if (name === "submitBrief") {
      // Финализация RFP
      await saveBriefToDatabase({
        threadId,
        name: args.name,
        contact: args.contact,
        brief: args.brief,
      });

      await sendContactEmail({
        name: args.name,
        email: args.contact,
        message: args.brief,
      });
    }
  }
}
```

---

## 🚨 **Текущие проблемы**

### **1. Функции обновления контекста не срабатывают**

**Возможные причины:**

- Неправильная конфигурация функций в OpenAI Assistant
- Ошибки в схеме `update_context.json`
- Проблемы с `strict` режимом в функциях
- Недостаточно четкие инструкции для вызова функций

### **2. Нет связи с сервисами агентства**

**Проблема:** Контекст не учитывает конкретные услуги из `servicesPages.json`:

- Project Documentation
- Documentation Audit
- Web Application Development
- Website Creation
- Process Automation
- AI Integration

### **3. Общая структура RFP**

**Проблема:** `submitBrief` формирует слишком общий brief, не привязанный к конкретным услугам агентства.

---

## 🎯 **План улучшений**

### **1. Исправление функций контекста**

- [ ] Проверить конфигурацию Assistant в OpenAI
- [ ] Обновить схемы функций
- [ ] Добавить отладку вызовов функций
- [ ] Улучшить инструкции для принудительного вызова

### **2. Интеграция с сервисами агентства**

- [ ] Добавить поле `recommendedServices` в контекст
- [ ] Создать логику определения подходящих услуг
- [ ] Обновить промпты с описанием услуг

### **3. Структурированный RFP**

- [ ] Создать шаблоны RFP для каждого типа услуг
- [ ] Добавить автоматическое определение типа проекта
- [ ] Улучшить финальный brief с четкими разделами

### **4. UX улучшения**

- [ ] Прогресс-бар сбора информации
- [ ] Предпросмотр RFP перед отправкой
- [ ] Возможность редактирования собранных данных

---

## 📁 **Структура файлов**

```
src/
├── app/components/
│   └── ChatWindowStream.tsx           # UI компонент чата
├── app/api/assistant/stream/
│   └── route.ts                       # API endpoint
├── services/
│   └── assistant.service.ts           # Бизнес-логика ассистента
├── utils/assistant/
│   ├── createEmptyAssistantContext.ts # Инициализация контекста
│   ├── generateAdditionalInstructions.ts # Генерация инструкций
│   ├── updateAssistantContextFromFunctionCall.ts # Обновление контекста
│   ├── toolCallHandler.ts             # Обработчик функций
│   ├── fieldInstructions.ts           # Инструкции по полям
│   └── functions/
│       ├── update_context.json        # Схема функции обновления
│       └── submitBrief.json          # Схема функции отправки
├── lib/db/
│   ├── saveContextToDatabase.ts       # Сохранение контекста
│   ├── loadContextFromDatabase.ts     # Загрузка контекста
│   └── logMessageToDatabase.ts        # Логирование сообщений
└── content/
    └── servicesPages.json             # Услуги агентства

prompts/sections/                      # System instructions
├── 00_intro.txt                       # Роль и цели
├── 02_dialog_flow.txt                 # Логика диалога
├── 18_critical_rules.txt              # Критические правила
└── ...                               # Остальные инструкции

scripts/
└── setSystemPrompt.mjs               # Обновление промпта в OpenAI
```

---

## 🔍 **Отладка и мониторинг**

### **Логирование:**

- Все сообщения сохраняются в БД
- Контекст версионируется
- Вызовы функций логируются

### **Метрики:**

- Успешность завершения диалогов
- Время до получения контактов
- Качество собранной информации

---

_Документация создана для анализа и улучшения workflow AI агента_
