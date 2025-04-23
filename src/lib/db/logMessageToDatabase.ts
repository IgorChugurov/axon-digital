import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "chatlogs";
const COLLECTION = "messages";

let cachedClient: MongoClient | null = null;

async function getClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export interface LogMessageInput {
  threadId: string;
  role: "user" | "assistant";
  content: string;
  ip?: string;
  timestamp?: Date;
}

export async function logMessageToDatabase(data: LogMessageInput) {
  try {
    const client = await getClient();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

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
