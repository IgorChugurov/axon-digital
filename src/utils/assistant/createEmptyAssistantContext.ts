// Simplified context structure for better compatibility with OpenAI functions
export interface SimplifiedAssistantContext {
  threadId: string;
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
  updatedAt: Date;
}

/**
 * Creates a fresh empty SimplifiedAssistantContext object.
 */
export function createEmptyAssistantContext(
  threadId: string
): SimplifiedAssistantContext {
  return {
    threadId,
    project_goal: "",
    project_type: "",
    target_audience: "",
    industry: "",
    key_features: [],
    recommended_services: [],
    deadline: "",
    budget_range: "",
    platform: "",
    integrations: [],
    contact_name: "",
    contact_info: "",
    updatedAt: new Date(),
  };
}
