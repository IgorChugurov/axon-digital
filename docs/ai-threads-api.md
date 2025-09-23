# AI Threads API Documentation

## Обзор

AI Threads API предоставляет функциональность для управления AI-тредами и ответами. Система включает авторизацию через внешний сервис, работу с MongoDB и интеграцию с Bedrock API для генерации ответов.

## Переменные окружения

Добавьте следующие переменные в ваш `.env.local`:

```bash
# AI Threads API Configuration
PROXY_AUTH_URL=https://dev-idp.opiesoftware.com/connect/userinfo

# Bedrock Direct SDK Configuration
BEDROCK_REGION=us-east-1
BEDROCK_MODELID=anthropic.claude-3-5-sonnet-20241022-v2:0
BEDROCK_API_KEY=your-bedrock-api-key

# CORS Configuration (используется та же переменная, что и для PDF API)
PDF_CORS_ORIGINS=https://dev.opiesoftware.com,https://opiesoftware.com

# Rate Limiting и Retry настройки (опционально)
BEDROCK_MIN_INTERVAL=1500        # Минимальный интервал между запросами в мс
BEDROCK_MAX_RETRIES=3           # Максимальное количество повторных попыток
BEDROCK_BASE_RETRY_DELAY=2000   # Базовая задержка для повторных попыток в мс

# Legacy Bedrock HTTP API (для существующего /api/bedrock)
BEDROCK_API_URL=http://localhost:3000/api/bedrock
PROXY_API_KEY=your-proxy-api-key

# MongoDB Configuration (должна уже быть настроена)
MONGODB_URI=mongodb://localhost:27017

# CORS Configuration
BEDROCK_CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

**Важно**:

- AI Threads теперь использует прямое подключение к Bedrock SDK и не зависит от `/api/bedrock` эндпоинта
- Переменные `BEDROCK_API_URL` и `PROXY_API_KEY` нужны только для совместимости с существующим API
- `BEDROCK_CORS_ORIGINS` - список разрешенных доменов для CORS (через запятую)

## API Эндпоинты

### 1. GET /api/ai-threads/:outputId

Загружает все треды для указанного outputId.

**Заголовки:**

```
Authorization: Bearer <token>
```

**Ответ:**

```json
[
  {
    "id": "string",
    "outputId": "string",
    "promptId": "string",
    "outputBody": "string",
    "promptBody": "string",
    "promptTitle": "string (optional)",
    "projectUserId": "string",
    "facilityId": "string",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "aiAnswers": [
      {
        "id": "string",
        "aiThreadId": "string",
        "body": "string",
        "comment": "string (optional)",
        "isGood": false,
        "isBad": false,
        "projectUserId": "string",
        "facilityId": "string",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "inputTokens": 120,
        "outputTokens": 200,
        "totalTokens": 320
      }
    ]
  }
]
```

### 2. POST /api/ai-threads/upload-document

Проверяет токен авторизации (пустой роут).

**Заголовки:**

```
Authorization: Bearer <token>
```

**Ответ:**

```json
{
  "message": "Token validated successfully",
  "user": {
    "opieUserId": "string",
    "facilityId": "string",
    "role": "string"
  }
}
```

### 3. POST /api/ai-threads/:outputId/:promptId

Создает новый тред и генерирует первый ответ.

**Заголовки:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Тело запроса:**

```json
{
  "outputBody": "string",
  "promptBody": "string",
  "promptTitle": "string (optional)"
}
```

**Ответ:**

```json
{
  "id": "string",
  "outputId": "string",
  "promptId": "string",
  "outputBody": "string",
  "promptBody": "string",
  "promptTitle": "string (optional)",
  "projectUserId": "string",
  "facilityId": "string",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "aiAnswers": [
    {
      "id": "string",
      "aiThreadId": "string",
      "body": "string",
      "comment": "string (optional)",
      "isGood": false,
      "isBad": false,
      "projectUserId": "string",
      "facilityId": "string",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "inputTokens": 120,
      "outputTokens": 200,
      "totalTokens": 320
    }
  ]
}
```

### 4. POST /api/ai-threads/regenerate/:outputId/:promptId

Регенерирует существующий тред.

**Заголовки:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Тело запроса:**

```json
{
  "outputBody": "string",
  "promptBody": "string",
  "promptTitle": "string (optional)",
  "regenerateFromScratch": false
}
```

**Ответ:** Аналогично созданию треда.

### 5. PATCH /api/ai-answers/:answerId

Обновляет комментарий и оценки ответа.

**Заголовки:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Тело запроса:**

```json
{
  "comment": "string (optional)",
  "isGood": true,
  "isBad": false
}
```

**Ответ:**

```json
{
  "id": "string",
  "aiThreadId": "string",
  "body": "string",
  "comment": "string",
  "isGood": true,
  "isBad": false,
  "projectUserId": "string",
  "facilityId": "string",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "inputTokens": 120,
  "outputTokens": 200,
  "totalTokens": 320
}
```

## Информация о токенах

Каждый ответ AI (AiAnswer) содержит информацию о количестве использованных токенов:

- **inputTokens**: Количество токенов во входящем запросе (prompt + body)
- **outputTokens**: Количество токенов в сгенерированном ответе
- **totalTokens**: Общее количество токенов (inputTokens + outputTokens)

Эта информация помогает отслеживать затраты на использование AI сервисов и оптимизировать промпты.

## Авторизация

Все эндпоинты требуют Bearer токен в заголовке Authorization. Токен валидируется через POST запрос к `PROXY_AUTH_URL`.

Пример ответа от auth service:

```json
{
  "OpieUserId": "3",
  "OpieJsVersion": "latest",
  "FacilityID": "4A6872A3-85EA-46A3-AC7B-1C0AB1572DAB",
  "ReleaseChannel": "LATEST",
  "FacilityUserID": "1B372D18-F4F9-4042-B855-695A5E651BF3",
  "BIUsername": "ryan.kerwin@opiesoftware.com",
  "role": "opie-user",
  "sub": "b06e1eeb-3834-44d5-9383-0de28601d31b"
}
```

## Структура данных MongoDB

### Коллекция `ai_threads`

```typescript
{
  _id: ObjectId,
  id: string, // _id.toString()
  outputId: string,
  promptId: string,
  outputBody: string,
  promptBody: string,
  promptTitle?: string,
  projectUserId?: string,
  facilityId?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Коллекция `ai_answers`

```typescript
{
  _id: ObjectId,
  id: string, // _id.toString()
  aiThreadId: string, // ID треда
  body: string,
  comment?: string,
  isGood: boolean,
  isBad: boolean,
  projectUserId?: string,
  facilityId?: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Логика регенерации

Система поддерживает интеллектуальную регенерацию ответов:

1. **Полная регенерация** (`regenerateFromScratch: true`): Удаляет все ответы и создает новый
2. **Умная регенерация**: Анализирует последние ответы с комментариями и использует их как контекст
3. **Пропуск регенерации**: Если последний ответ помечен как хороший или не имеет комментариев

## Пример использования

```javascript
// Создание треда
const createResponse = await fetch("/api/ai-threads/output123/prompt456", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_TOKEN",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    outputBody: "Document content here...",
    promptBody: "Analyze this document and provide insights...",
    promptTitle: "Document Analysis",
  }),
});
const createdThread = await createResponse.json(); // Прямо AiThread объект

// Обновление ответа
const updateResponse = await fetch("/api/ai-answers/answer789", {
  method: "PATCH",
  headers: {
    Authorization: "Bearer YOUR_TOKEN",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    comment: "Good analysis but needs more detail on risks",
    isBad: true,
  }),
});
const updatedAnswer = await updateResponse.json(); // Прямо AiAnswer объект

// Получение тредов
const threadsResponse = await fetch("/api/ai-threads/output123", {
  headers: {
    Authorization: "Bearer YOUR_TOKEN",
  },
});
const threads = await threadsResponse.json(); // Прямо массив AiThread[]

// Регенерация с учетом комментариев
const regenerateResponse = await fetch(
  "/api/ai-threads/regenerate/output123/prompt456",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_TOKEN",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      outputBody: "Updated document content...",
      promptBody: "Analyze this document with focus on risks...",
      regenerateFromScratch: false,
    }),
  }
);
const regeneratedThread = await regenerateResponse.json(); // Прямо AiThread объект
```

## Обработка ошибок Rate Limiting

API автоматически обрабатывает ошибки `ThrottlingException` от AWS Bedrock:

### Встроенная защита:

- **Rate Limiting**: Автоматическая задержка между запросами (по умолчанию 1.5 сек)
- **Retry с экспоненциальной задержкой**: До 3 повторных попыток с увеличивающейся задержкой
- **Конфигурируемые параметры**: Через переменные окружения

### Рекомендации:

- Для высоконагруженных приложений увеличьте `BEDROCK_MIN_INTERVAL` до 2000-3000 мс
- При частых ошибках throttling увеличьте `BEDROCK_BASE_RETRY_DELAY`
- Мониторьте логи на предмет сообщений о rate limiting

## Коды ошибок

- `400` - BadRequest: Неверные параметры или тело запроса
- `401` - AuthenticationError: Неверный или отсутствующий токен
- `403` - AccessDenied: Нет прав доступа к ресурсу
- `404` - NotFound: Ресурс не найден
- `409` - Conflict: Тред уже существует
- `429` - Too Many Requests: Превышен лимит скорости запросов (автоматически обрабатывается)
- `500` - InternalServerError: Внутренняя ошибка сервера
- `502` - Bad Gateway: Ошибка при обращении к Bedrock API
- `500` - InternalError: Внутренняя ошибка сервера

## Архитектура

### Новая структура проекта

Все компоненты AI Threads API вынесены в отдельную папку `src/features/ai-threads/`:

```
src/features/ai-threads/
├── types/
│   └── index.ts              # Все типы и интерфейсы
├── auth/
│   └── authUtils.ts          # Утилиты авторизации и AuthService
├── db/
│   └── aiThreadsDb.ts        # Работа с MongoDB
├── services/
│   ├── aiThreadService.ts    # Сервис управления тредами
│   ├── aiAnswerService.ts    # Сервис управления ответами
│   └── llmService.ts         # Сервис для работы с LLM (Bedrock)
└── index.ts                  # Экспорт всех компонентов
```

### Схема взаимодействия

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Routes    │───▶│  authenticateUser │───▶│   Services      │
│  (inline auth)  │    │   (per route)     │    │ (ai-threads)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                ▲                        │
                                │                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │  External Auth   │    │   MongoDB       │
                       │   (PROXY_AUTH)   │    │  (aiThreadsDb)  │
                       └──────────────────┘    └─────────────────┘
                                                         ▲
                                                         │
                                                ┌─────────────────┐
                                                │   LLM Service   │
                                                │ (Direct Bedrock │
                                                │      SDK)       │
                                                └─────────────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │   AWS Bedrock   │
                                                │   (Claude 3.5)  │
                                                └─────────────────┘
```

### Ключевые изменения

1. **Убран глобальный middleware** - авторизация проверяется индивидуально в каждом роутере через `authenticateUser(req)`
2. **Модульная структура** - все компоненты сгруппированы в `features/ai-threads/`
3. **Прямое обращение к Bedrock SDK** - убрана лишняя HTTP прокладка, LLM сервис напрямую использует AWS SDK
4. **Полная поддержка CORS** - все эндпоинты поддерживают CORS для работы с фронтенд приложениями
5. **Переиспользуемость** - функции авторизации можно легко использовать в других частях системы (например, для PDF генерации)
6. **Изолированность** - AI Threads функциональность не влияет на остальную систему
7. **Производительность** - нет лишних HTTP запросов внутри приложения

### Использование в других частях системы

Для использования в PDF генерации или других модулях:

```typescript
import {
  authenticateUser,
  AuthService,
  aiThreadService,
} from "@/features/ai-threads";

// В любом API роуте
export async function POST(req: NextRequest) {
  try {
    const user = await authenticateUser(req);
    // Работа с авторизованным пользователем
  } catch (error) {
    // Обработка ошибок авторизации
  }
}
```
