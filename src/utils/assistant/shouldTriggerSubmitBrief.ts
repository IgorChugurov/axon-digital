import { AssistantContext } from "./generateAdditionalInstructions";

export function shouldTriggerSubmitBrief(context: AssistantContext): boolean {
  const hasGoal = Boolean(context.project?.goal?.description);
  const hasAudience = Boolean(context.project?.audience?.description);
  const hasFeatures = Boolean(context.technical?.features?.mustHave?.length);
  const hasDeadline = Boolean(context.delivery?.deadline);
  const hasBudget = Boolean(context.delivery?.budget?.range);
  const hasContact = Boolean(context.contact?.value);

  return (
    hasGoal &&
    hasAudience &&
    hasFeatures &&
    hasDeadline &&
    hasBudget &&
    hasContact
  );
}
