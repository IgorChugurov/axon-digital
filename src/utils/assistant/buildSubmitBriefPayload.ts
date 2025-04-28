import { AssistantContext } from "./generateAdditionalInstructions";

interface SubmitBriefPayload {
  projectGoal: string;
  industry?: string;
  targetAudience: string;
  usp?: string;
  coreFeatures: string[];
  integrations?: {
    standard?: string[];
    custom?: string[];
  };
  platform?: string;
  infrastructure?: string[];
  multilingualSupport?: boolean;
  accessibilityRequirements?: boolean;
  advancedSeoRequired?: boolean;
  deadline: string;
  budgetEstimate: string;
  paymentModel?: string;
  phasedDevelopment?: boolean;
  postLaunchSupport?: boolean;
  contact: {
    channel: string;
    value: string;
  };
  createdAt: string;
}

export function buildSubmitBriefPayload(
  context: AssistantContext
): SubmitBriefPayload {
  if (
    !context.project?.goal?.description ||
    !context.project?.audience?.description ||
    !context.technical?.features?.mustHave ||
    !context.delivery?.deadline ||
    !context.delivery?.budget?.range ||
    !context.contact?.value
  ) {
    throw new Error("Context is incomplete for submitting a brief.");
  }

  return {
    projectGoal: context.project.goal.description,
    industry: context.project.industry,
    targetAudience: context.project.audience.description,
    usp: context.project.usp,
    coreFeatures: context.technical.features.mustHave,
    integrations: context.technical.integrations,
    platform: context.technical.platform,
    infrastructure: context.technical.infrastructure,
    multilingualSupport: context.technical.multilingual,
    accessibilityRequirements:
      context.technical.accessibilityCompliance?.required,
    advancedSeoRequired: context.seoAndPerformance?.advancedSeoRequired,
    deadline: context.delivery.deadline,
    budgetEstimate: context.delivery.budget.range,
    paymentModel: context.delivery.paymentModel,
    phasedDevelopment: context.delivery.phasedDevelopment,
    postLaunchSupport: context.delivery.supportRequired,
    contact: {
      channel: context.contact.preferredChannel || "email",
      value: context.contact.value,
    },
    createdAt: new Date().toISOString(),
  };
}
