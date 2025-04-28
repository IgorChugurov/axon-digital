import { getMongoClient, getDatabase } from "@/lib/db/client";
import { AssistantContext } from "@/utils/assistant/generateAdditionalInstructions";

export async function loadContextFromDatabase(
  threadId: string
): Promise<AssistantContext | null> {
  try {
    const client = await getMongoClient();
    const db = getDatabase(client);
    const collection = db.collection("contexts");

    const doc = await collection.findOne({ threadId });
    return doc?.context || null;
  } catch (err) {
    console.error("❌ Failed to load AssistantContext from MongoDB:", err);
    return null;
  }
}
