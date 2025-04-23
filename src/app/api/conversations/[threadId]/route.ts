// src/app/api/conversations/[threadId]/route.ts

import { NextRequest } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "chatlogs";
const collectionName = "messages";

const client = new MongoClient(uri);

export async function GET(req: NextRequest, context: any) {
  const { threadId } = await context.params;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const messages = await collection
      .find({ threadId })
      .sort({ timestamp: 1 })
      .toArray();

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching thread:", error);
    return new Response("Failed to fetch thread", { status: 500 });
  }
}
