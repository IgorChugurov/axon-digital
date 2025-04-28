// src/utils/assistant/updateAssistantContextFromFunctionCall.ts

import { AssistantContext } from "./generateAdditionalInstructions";

interface ContextUpdatePayload {
  project?: {
    goal?: { type: string; description: string };
    industry?: string;
    audience?: { type: string; description: string; specifics?: string };
    usp?: string;
  };
  technical?: {
    features?: { mustHave: string[]; niceToHave?: string[] };
    integrations?: { standard?: string[]; custom?: string[] };
    infrastructure?: string[];
    platform?: string;
    multilingual?: boolean;
    accessibilityCompliance?: { required: boolean; notes?: string };
  };
  seoAndPerformance?: {
    advancedSeoRequired?: boolean;
    notes?: string;
  };
  delivery?: {
    deadline?: string;
    budget?: { range: string; description?: string };
    paymentModel?: string;
    phasedDevelopment?: boolean;
    supportRequired?: boolean;
  };
  contact?: {
    preferredChannel?: string;
    value?: string;
  };
}

export function updateAssistantContextFromFunctionCall(
  previousContext: AssistantContext,
  updates: ContextUpdatePayload
): AssistantContext {
  const updatedContext: AssistantContext = {
    ...previousContext,
    project: {
      ...previousContext.project,
      ...updates.project,
    },
    technical: {
      ...previousContext.technical,
      ...updates.technical,
    },
    seoAndPerformance: {
      ...previousContext.seoAndPerformance,
      ...updates.seoAndPerformance,
    },
    delivery: {
      ...previousContext.delivery,
      ...updates.delivery,
    },
    contact: {
      ...previousContext.contact,
      ...updates.contact,
    },
    updatedAt: new Date(),
  };

  return updatedContext;
}
