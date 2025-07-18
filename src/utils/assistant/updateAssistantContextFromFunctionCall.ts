// src/utils/assistant/updateAssistantContextFromFunctionCall.ts

import { SimplifiedAssistantContext } from "./createEmptyAssistantContext";

interface ContextUpdatePayload {
  project_goal?: string;
  project_type?: string;
  target_audience?: string;
  industry?: string;
  key_features?: string[];
  recommended_services?: string[];
  deadline?: string;
  budget_range?: string;
  platform?: string;
  integrations?: string[];
  contact_name?: string;
  contact_info?: string;
}

export function updateAssistantContextFromFunctionCall(
  previousContext: SimplifiedAssistantContext,
  updates: ContextUpdatePayload
): SimplifiedAssistantContext {
  const updatedContext: SimplifiedAssistantContext = {
    ...previousContext,
    ...updates,
    updatedAt: new Date(),
  };

  // Logging for debugging
  console.log("🔄 Context updated:", {
    threadId: updatedContext.threadId,
    hasGoal: !!updatedContext.project_goal,
    hasType: !!updatedContext.project_type,
    hasAudience: !!updatedContext.target_audience,
    hasContact: !!updatedContext.contact_info,
    featuresCount: updatedContext.key_features?.length || 0,
    servicesCount: updatedContext.recommended_services?.length || 0,
  });

  return updatedContext;
}
