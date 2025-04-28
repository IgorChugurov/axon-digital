import { getMongoClient, getDatabase } from "@/lib/db/client";
import { sendContactEmail } from "./sendContactEmail";

interface BriefData {
  threadId: string;
  name: string;
  contact: string;
  brief: string;
}

export async function saveBriefToDatabase(data: BriefData) {
  try {
    const client = await getMongoClient();
    const db = getDatabase(client);
    const collection = db.collection("briefs");

    await collection.insertOne({
      ...data,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("❌ Failed to save brief or send email:", error);
  }
}
