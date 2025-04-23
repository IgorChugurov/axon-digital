import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "chatlogs";
const collectionName = "messages";

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const threads = await collection
      .aggregate([
        { $group: { _id: "$threadId", latest: { $max: "$timestamp" } } },
        { $sort: { latest: -1 } },
      ])
      .toArray();

    await client.close();

    return NextResponse.json({ threads });
  } catch (error) {
    console.error("Failed to fetch thread list:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
