// file: app/api/conversation/log/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "chatlogs";
const collectionName = "messages";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const { threadId, role, content, timestamp = new Date() } = body;

    if (!threadId || !role || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertOne({
      threadId,
      role,
      content,
      timestamp: new Date(timestamp),
    });

    await client.close();

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Failed to log message", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
