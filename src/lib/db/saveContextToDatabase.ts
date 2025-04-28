import { getMongoClient, getDatabase } from "@/lib/db/client";
import { AssistantContext } from "@/utils/assistant/generateAdditionalInstructions";

interface SaveContextInput {
  threadId: string;
  context: AssistantContext;
}

export async function saveContextToDatabase({
  threadId,
  context,
}: SaveContextInput) {
  try {
    const client = await getMongoClient();
    const db = getDatabase(client);
    const collection = db.collection("assistant_contexts");

    await collection.updateOne(
      { threadId },
      { $set: { ...context, updatedAt: new Date() } },
      { upsert: true }
    );
  } catch (error) {
    console.error("❌ Failed to save AssistantContext to MongoDB:", error);
  }
}
