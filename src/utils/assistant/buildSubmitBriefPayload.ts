import { SimplifiedAssistantContext } from "./createEmptyAssistantContext";

interface SubmitBriefPayload {
  projectGoal: string;
  audience: string;
  features: string[];
  timeline: string;
  budget: string;
  industry: string;
  platform: string;
  integrations: string[];
  recommendedServices: string[];
}

export function buildSubmitBriefPayload(
  context: SimplifiedAssistantContext
): SubmitBriefPayload {
  return {
    projectGoal: context.project_goal || "Not specified",
    audience: context.target_audience || "Not specified",
    features: context.key_features || [],
    timeline: context.deadline || "Not specified",
    budget: context.budget_range || "Not specified",
    industry: context.industry || "Not specified",
    platform: context.platform || "Web",
    integrations: context.integrations || [],
    recommendedServices: context.recommended_services || [],
  };
}
