import { SimplifiedAssistantContext } from "./createEmptyAssistantContext";

export function shouldTriggerSubmitBrief(
  context: SimplifiedAssistantContext
): boolean {
  // Check that we have minimum required data to send brief
  const hasContactInfo = Boolean(context.contact_name && context.contact_info);
  const hasProjectGoal = Boolean(context.project_goal);
  const hasProjectType = Boolean(context.project_type);

  // Minimum requirements: project goal, type and contact information
  const readyToSubmit = hasContactInfo && hasProjectGoal && hasProjectType;

  console.log("🎯 Submit brief check:", {
    hasContactInfo,
    hasProjectGoal,
    hasProjectType,
    readyToSubmit,
  });

  return readyToSubmit;
}
