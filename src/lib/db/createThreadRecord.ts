// src/lib/db/createThreadRecord.ts
import { getMongoClient, getDatabase } from "@/lib/db/client";

interface CreateThreadInput {
  threadId: string;
  title: string;
  ip?: string;
}
/**
 * Creates a new thread record in the database.
 *
 * @param {CreateThreadInput} params - The parameters for creating a thread record.
 * @param {string} params.threadId - The unique identifier for the thread.
 * @param {string} params.title - The title of the thread.
 * @param {string} [params.ip] - The IP address of the user (optional).
 */

export async function createThreadRecord({
  threadId,
  title,
  ip,
}: CreateThreadInput) {
  try {
    const client = await getMongoClient();
    const db = getDatabase(client);
    const collection = db.collection("threads");

    await collection.insertOne({
      threadId,
      title,
      ip,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("❌ Failed to create thread record:", err);
  }
}
