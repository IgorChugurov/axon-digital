// src/app/api/conversations/threads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getMongoClient, getDatabase } from "@/lib/db/client";
import { extractClientIp } from "@/utils/getClientIp";

export async function GET(req: NextRequest) {
  const ip = extractClientIp(req);

  if (!ip) {
    return NextResponse.json([]); // Return empty list if IP not available
  }

  try {
    const client = await getMongoClient();
    const db = getDatabase(client);
    const collection = db.collection("threads");

    const threads = await collection
      .find({ ip })
      .sort({ createdAt: -1 })
      .project({ _id: 0 })
      .toArray();

    return NextResponse.json({ threads });
  } catch (error) {
    console.error("❌ Failed to fetch thread list:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
