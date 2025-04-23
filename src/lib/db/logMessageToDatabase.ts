// src/lib/db/logMessageToDatabase.ts
import { getMongoClient, getDatabase } from "@/lib/db/client";

export interface LogMessageInput {
  threadId: string;
  role: "user" | "assistant";
  content: string;
  ip?: string;
  timestamp?: Date;
}

export async function logMessageToDatabase(data: LogMessageInput) {
  try {
    const client = await getMongoClient();
    const db = getDatabase(client);
    const collection = db.collection("messages");

    await collection.insertOne({
      threadId: data.threadId,
      role: data.role,
      content: data.content,
      ip: data.ip,
      timestamp: data.timestamp || new Date(),
    });
  } catch (err) {
    console.error("❌ Failed to log message to MongoDB:", err);
  }
}
