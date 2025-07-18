import { getMongoClient, getDatabase } from "@/lib/db/client";
import { SimplifiedAssistantContext } from "@/utils/assistant/createEmptyAssistantContext";

export async function loadContextFromDatabase(
  threadId: string
): Promise<SimplifiedAssistantContext | null> {
  try {
    const client = await getMongoClient();
    const db = getDatabase(client);
    const collection = db.collection("assistant_contexts");

    const result = await collection.findOne(
      { threadId },
      { sort: { updatedAt: -1 } }
    );

    if (!result) {
      return null;
    }

    // Конвертируем MongoDB документ в SimplifiedAssistantContext
    const context: SimplifiedAssistantContext = {
      threadId: result.threadId,
      project_goal: result.project_goal || "",
      project_type: result.project_type || "",
      target_audience: result.target_audience || "",
      industry: result.industry || "",
      key_features: result.key_features || [],
      recommended_services: result.recommended_services || [],
      deadline: result.deadline || "",
      budget_range: result.budget_range || "",
      platform: result.platform || "",
      integrations: result.integrations || [],
      contact_name: result.contact_name || "",
      contact_info: result.contact_info || "",
      updatedAt: result.updatedAt || new Date(),
    };

    return context;
  } catch (error) {
    console.error("❌ Error loading context from database:", error);
    return null;
  }
}
