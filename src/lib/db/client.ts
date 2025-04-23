// src/lib/db/client.ts
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "chatlogs";

let cachedClient: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export function getDatabase(client: MongoClient) {
  return client.db(DB_NAME);
}
