# AI Assistant API Route (`POST /api/chat`)

Этот файл реализует POST-обработчик API на Next.js 15, который используется для отправки сообщений в OpenAI Assistant и получения стримингового ответа в режиме реального времени.

## 📌 Назначение

Обработчик принимает текстовое сообщение от пользователя, выполняет валидации и модерацию, инициирует или продолжает thread в OpenAI, обрабатывает tool calls, логирует все сообщения и возвращает поток ответа от ассистента.

---

## 🔄 Последовательность обработки

1. **Извлечение IP-адреса**

   - Определяется IP клиента для применения rate limiting.

2. **Проверка лимитов**

   - Применяется краткосрочный rate limiter (`rate-limiter-flexible`), чтобы ограничить частоту запросов.

3. **Валидация сообщения**

   - Проверяется, что сообщение не пустое, не слишком короткое/длинное (на основе `MIN_CHAR_LENGTH` / `MAX_CHAR_LENGTH`).

4. **Модерация**

   - Проверка сообщения через OpenAI Moderation API.
   - В случае флага — возвращается ошибка с указанием категорий.

5. **Обработка thread-а**

   - Если передан `threadId`, используется он.
   - Иначе создаётся новый thread через `openai.beta.threads.create()`.

6. **Отмена предыдущего незавершённого run**

   - Если последний `run` в статусе `in_progress` или `queued`, он отменяется перед продолжением.

7. **Логирование сообщения пользователя**

   - Сохраняется в MongoDB с полями `threadId`, `role: "user"`, `content`, `ip`, `timestamp`.

8. **Добавление сообщения в OpenAI thread**

   - Отправляется в `openai.beta.threads.messages.create()`.

9. **Запуск AI-ассистента и обработка потока**

   - Используется `openai.beta.threads.runs.stream()` — ответ ассистента стримится частями.
   - Обрабатываются:
     - `thread.message.delta` — основной текст;
     - `thread.run.step.delta` — tool calls;
     - `thread.run.requires_action` — выполнение tool call через `handleToolCalls`.

10. **Логирование ответа ассистента**
    - Финальный текст сохраняется в MongoDB с `role: "assistant"`.

---

## 🧱 Зависимости

- **OpenAI SDK** — `openai`
- **MongoDB** — логирование сообщений
- **RateLimiter** — `rate-limiter-flexible`
- **Stream API** — `ReadableStream` для передачи ответа клиенту
- **Модули**:
  - `checkRateLimit`
  - `moderateMessage`
  - `validateMessageInput`
  - `handleToolCalls`
  - `logMessageToDatabase`

---

## 📂 Связанные файлы

- `src/utils/validateMessageInput.ts`
- `src/utils/moderateMessage.ts`
- `src/utils/checkRateLimit.ts`
- `src/utils/toolCallHandler.ts`
- `src/lib/db/logMessageToDatabase.ts`
- `src/types/openai.ts`

---

## 🧪 Пример использования на фронте

Запрос:

```ts
const res = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({
    threadId,
    message: "Привет, можешь помочь мне составить бриф?",
    context: { goal: "digital agency brief" },
  }),
});
```
