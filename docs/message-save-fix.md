# Исправление проблемы с сохранением сообщений

## Проблема

При использовании компонента `ChatWindowStream` сообщения сохранялись в базу данных, но некоторые из них имели `content: null`. Это происходило из-за того, что в `copilot.service.ts` при вызове `logMessageToDatabase` не передавался параметр `content`.

## Причина

В файле `src/services/copilot.service.ts` на строках 23 и 84:

```typescript
// ❌ Неправильно - content не передается
await logMessageToDatabase({
  assistantId,
  threadId,
  role: "user",
  ip,
  timestamp: new Date(),
});

// ❌ Неправильно - content не передается
await logMessageToDatabase({
  assistantId,
  threadId,
  role: "assistant",
  ip,
  timestamp: new Date(),
});
```

Это приводило к сохранению сообщений с `content: undefined`, что в MongoDB отображалось как `null`.

## Решение

### 1. Исправлен `copilot.service.ts`

Добавлен параметр `content` при вызове `logMessageToDatabase`:

```typescript
// ✅ Правильно - content передается
await logMessageToDatabase({
  assistantId,
  threadId,
  role: "user",
  content: message, // Добавлено
  ip,
  timestamp: new Date(),
});

// ✅ Правильно - content передается
await logMessageToDatabase({
  assistantId,
  threadId,
  role: "assistant",
  content: assistantReply, // Добавлено
  ip,
  timestamp: new Date(),
});
```

### 2. Обновлен `logMessageToDatabase.ts`

- Сделан параметр `content` обязательным
- Добавлена валидация для предотвращения сохранения пустых сообщений
- Добавлено логирование попыток сохранения пустых сообщений

```typescript
export interface LogMessageInput {
  assistantId?: string;
  threadId: string;
  role: "user" | "assistant";
  content: string; // Теперь обязательный
  ip?: string;
  timestamp?: Date;
}

export async function logMessageToDatabase(data: LogMessageInput) {
  try {
    // Валидация: не сохраняем сообщения с пустым контентом
    if (!data.content || data.content.trim() === "") {
      console.warn("⚠️ Attempting to save message with empty content, skipping:", {
        threadId: data.threadId,
        role: data.role,
        timestamp: data.timestamp
      });
      return;
    }

    // ... остальной код
    content: data.content.trim(), // Убираем лишние пробелы
  } catch (err) {
    console.error("❌ Failed to log message to MongoDB:", err);
  }
}
```

### 3. Обновлен API endpoint `/api/conversations/[threadId]/route.ts`

Добавлена фильтрация сообщений с пустым контентом при загрузке:

```typescript
const messages = await collection
  .find({
    threadId,
    // Фильтруем сообщения с пустым или null контентом
    content: {
      $exists: true,
      $ne: null,
      $ne: "",
      $not: /^\s*$/,
    },
  })
  .sort({ timestamp: 1 })
  .toArray();
```

### 4. Обновлена функция `getMessagesFromServer`

Добавлена дополнительная фильтрация на уровне приложения:

```typescript
const messages: Message[] = data
  // Дополнительная фильтрация на уровне приложения
  .filter((msg) => msg.content && msg.content.trim() !== "")
  .map((msg) => {
    return {
      id: new Date(msg.timestamp).getTime(),
      text: msg.content,
      sender: msg.role === "assistant" ? "bot" : "user",
    };
  });
```

### 5. Создан скрипт очистки

Создан скрипт `scripts/cleanEmptyMessages.mjs` для очистки существующих сообщений с пустым контентом:

```bash
npm run clean:empty-messages
```

## Результат

Теперь:

- ✅ Все сообщения сохраняются с корректным контентом
- ✅ Пустые сообщения не сохраняются в базу данных
- ✅ При загрузке сообщений фильтруются записи с пустым контентом
- ✅ Добавлена валидация для предотвращения подобных проблем в будущем

## Файлы, которые были изменены

1. `src/services/copilot.service.ts` - исправлены вызовы `logMessageToDatabase`
2. `src/lib/db/logMessageToDatabase.ts` - добавлена валидация и обязательность `content`
3. `src/app/api/conversations/[threadId]/route.ts` - добавлена фильтрация при загрузке
4. `src/services/threads.ts` - добавлена дополнительная фильтрация
5. `scripts/cleanEmptyMessages.mjs` - создан скрипт очистки
6. `package.json` - добавлен скрипт для запуска очистки
