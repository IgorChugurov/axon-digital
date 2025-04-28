import { AssistantContext } from "./generateAdditionalInstructions";

/**
 * Creates a fresh empty AssistantContext object.
 */
export function createEmptyAssistantContext(
  threadId: string
): AssistantContext {
  return {
    threadId,
    project: {
      goal: { type: "", description: "" },
      industry: "",
      audience: { type: "", description: "" },
      usp: "",
    },
    technical: {
      features: { mustHave: [], niceToHave: [] },
      integrations: { standard: [], custom: [] },
      infrastructure: [],
      platform: "",
      multilingual: false,
      accessibilityCompliance: { required: false },
    },
    seoAndPerformance: {
      advancedSeoRequired: false,
      notes: "",
    },
    delivery: {
      deadline: "",
      budget: { range: "", description: "" },
      paymentModel: "",
      phasedDevelopment: false,
      supportRequired: false,
    },
    contact: {
      preferredChannel: "",
      value: "",
    },
    updatedAt: new Date(),
  };
}
