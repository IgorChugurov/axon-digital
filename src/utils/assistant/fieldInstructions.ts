// src/utils/assistant/fieldInstructions.ts

export interface FieldInstruction {
  microTip: string;
  exampleQuestions: string[];
}

export const fieldInstructions: Record<string, FieldInstruction> = {
  goal: {
    microTip:
      "Help the client clearly formulate their desired business outcome, not just a technical task.",
    exampleQuestions: [
      "What result would you like to achieve with this project?",
      "What part of your business would you like to improve?",
      "What should become simpler, faster, or more efficient after implementation?",
    ],
  },
  industry: {
    microTip:
      "If the industry is not clearly mentioned, softly clarify the business area.",
    exampleQuestions: [
      "Could you tell me a bit more about your business? What sector are you in?",
      "Are there any industry-specific needs we should consider?",
    ],
  },
  audience: {
    microTip:
      "Find out who will primarily use the product: customers, partners, or internal teams.",
    exampleQuestions: [
      "Who will be the main users of this system?",
      "Is the solution aimed at end clients, companies, or your internal teams?",
    ],
  },
  usp: {
    microTip:
      "Gently discover the client's unique selling points without pressure.",
    exampleQuestions: [
      "What makes your product or service special for your clients?",
      "Is there something that sets you apart from competitors?",
    ],
  },
  features: {
    microTip:
      "Start with business tasks, then help specify features if needed.",
    exampleQuestions: [
      "What key tasks should the system solve for you?",
      "Would you like me to suggest typical features for your type of business?",
    ],
  },
  integrations: {
    microTip:
      "First ask if integrations are needed, then clarify CRM, ERP, payment services, etc.",
    exampleQuestions: [
      "Do you have existing systems that need to be connected to the new project?",
      "For example, CRM, accounting systems, payment providers?",
    ],
  },
  infrastructure: {
    microTip:
      "Clarify whether there is an existing infrastructure or if everything needs to be built from scratch.",
    exampleQuestions: [
      "Do you currently have a website, CRM, or other IT systems in place?",
      "Or are we starting from scratch?",
    ],
  },
  platform: {
    microTip:
      "Web is assumed. Softly clarify if a mobile app or other platforms are needed.",
    exampleQuestions: [
      "Will the project be web-only, or would you also like to consider a mobile app?",
    ],
  },
  multilingual: {
    microTip:
      "Ask only if there are hints at international or multilingual needs.",
    exampleQuestions: [
      "Do you plan to offer the site/platform in multiple languages for different audiences?",
    ],
  },
  accessibilityCompliance: {
    microTip:
      "Basic accessibility is provided; ask only about additional standards.",
    exampleQuestions: [
      "Are there any additional accessibility standards you’d like us to consider (like WCAG 2.1)?",
    ],
  },
  advancedSeoRequired: {
    microTip:
      "Basic SEO is included. Clarify if enhanced SEO is needed for local/global optimization.",
    exampleQuestions: [
      "Would you like enhanced SEO optimization, for example, local SEO targeting?",
    ],
  },
  deadline: {
    microTip: "Ask about deadlines gently. No pressure for exact dates.",
    exampleQuestions: [
      "Do you have a target timeline for launching the project?",
    ],
  },
  budget: {
    microTip:
      "Never ask about budget immediately. Offer ranges only after clarifying needs.",
    exampleQuestions: [
      "Once we understand the scope, I can suggest a rough budget range. Would that be helpful?",
    ],
  },
  paymentModel: {
    microTip:
      "Explain that the initial phase is billed hourly, followed by a fixed estimate.",
    exampleQuestions: [
      "We typically start with hourly work for analysis and architecture, then move to a detailed project estimate.",
    ],
  },
  phasedDevelopment: {
    microTip: "Offer phased MVP launch if budget or timeline is a concern.",
    exampleQuestions: [
      "Would you like to first launch a minimum viable version (MVP) and expand it later?",
    ],
  },
  supportRequired: {
    microTip: "Softly offer post-launch support and maintenance.",
    exampleQuestions: [
      "Would you like us to provide ongoing maintenance and support after the launch?",
    ],
  },
  contact: {
    microTip: "Request contact information only after value is demonstrated.",
    exampleQuestions: [
      "To prepare a detailed proposal for you, could you please share your preferred contact — email or WhatsApp?",
    ],
  },
};
