import { getMongoClient, getDatabase } from "@/lib/db/client";
import { SimplifiedAssistantContext } from "@/utils/assistant/createEmptyAssistantContext";

interface SaveContextParams {
  threadId: string;
  context: SimplifiedAssistantContext;
}

export async function saveContextToDatabase({
  threadId,
  context,
}: SaveContextParams): Promise<void> {
  try {
    const client = await getMongoClient();
    const db = getDatabase(client);
    const collection = db.collection("assistant_contexts");

    // Create document for saving
    const contextDocument = {
      threadId,
      project_goal: context.project_goal || "",
      project_type: context.project_type || "",
      target_audience: context.target_audience || "",
      industry: context.industry || "",
      key_features: context.key_features || [],
      recommended_services: context.recommended_services || [],
      updatedAt: new Date(),
    };

    // Update or create document
    await collection.replaceOne({ threadId }, contextDocument, {
      upsert: true,
    });

    console.log("💾 Context saved to database:", {
      threadId,
      fieldsCount: Object.keys(contextDocument).filter(
        (key) =>
          contextDocument[key as keyof typeof contextDocument] &&
          contextDocument[key as keyof typeof contextDocument] !== ""
      ).length,
    });
  } catch (error) {
    console.error("❌ Error saving context to database:", error);
    throw error;
  }
}
