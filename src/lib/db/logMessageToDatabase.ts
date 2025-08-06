// src/lib/db/logMessageToDatabase.ts
import { getMongoClient, getDatabase } from "@/lib/db/client";

export interface LogMessageInput {
  assistantId?: string;
  threadId: string;
  role: "user" | "assistant";
  content: string; // Делаем content обязательным
  ip?: string;
  timestamp?: Date;
}

export async function logMessageToDatabase(data: LogMessageInput) {
  try {
    // Валидация: не сохраняем сообщения с пустым контентом
    if (!data.content || data.content.trim() === "") {
      console.warn(
        "⚠️ Attempting to save message with empty content, skipping:",
        {
          threadId: data.threadId,
          role: data.role,
          timestamp: data.timestamp,
        }
      );
      return;
    }

    const client = await getMongoClient();
    const db = getDatabase(client);
    const collection = db.collection("messages");

    await collection.insertOne({
      assistantId: data?.assistantId,
      threadId: data.threadId,
      role: data.role,
      content: data.content.trim(), // Убираем лишние пробелы
      ip: data.ip,
      timestamp: data.timestamp || new Date(),
    });
  } catch (err) {
    console.error("❌ Failed to log message to MongoDB:", err);
  }
}
