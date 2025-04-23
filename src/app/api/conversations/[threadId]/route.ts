// ✅ src/app/api/conversations/[threadId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "chatlogs";
const collectionName = "messages";

export async function GET(
  _req: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const resolvedParams = await params;
    const threadId = resolvedParams.threadId;

    const messages = await collection
      .find({ threadId: threadId })
      .sort({ timestamp: 1 })
      .toArray();

    await client.close();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Failed to fetch conversation:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
