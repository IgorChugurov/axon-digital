import { fieldInstructions } from "./fieldInstructions";
// Тип AssistantContext
export interface AssistantContext {
  threadId: string;
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
  updatedAt: Date;
}

// Поля и их приоритеты
const priorityGroups: { fields: string[]; priority: number }[] = [
  { fields: ["goal", "audience"], priority: 1 },
  { fields: ["features", "deadline"], priority: 2 },
  { fields: ["industry", "usp", "platform"], priority: 3 },
  {
    fields: [
      "integrations",
      "infrastructure",
      "multilingual",
      "accessibilityCompliance",
      "advancedSeoRequired",
    ],
    priority: 4,
  },
  {
    fields: ["budget", "phasedDevelopment", "supportRequired", "contact"],
    priority: 5,
  },
];

// Проверка заполненности поля
const isFilled = (context: AssistantContext, field: string): boolean => {
  switch (field) {
    case "goal":
      return Boolean(context.project?.goal?.description);
    case "audience":
      return Boolean(context.project?.audience?.description);
    case "features":
      return Boolean(context.technical?.features?.mustHave?.length);
    case "deadline":
      return Boolean(context.delivery?.deadline);
    case "industry":
      return Boolean(context.project?.industry);
    case "usp":
      return Boolean(context.project?.usp);
    case "platform":
      return Boolean(context.technical?.platform);
    case "integrations":
      return Boolean(
        context.technical?.integrations?.standard?.length ||
          context.technical?.integrations?.custom?.length
      );
    case "infrastructure":
      return Boolean(context.technical?.infrastructure?.length);
    case "multilingual":
      return context.technical?.multilingual !== undefined;
    case "accessibilityCompliance":
      return context.technical?.accessibilityCompliance !== undefined;
    case "advancedSeoRequired":
      return context.seoAndPerformance?.advancedSeoRequired !== undefined;
    case "budget":
      return Boolean(context.delivery?.budget?.range);
    case "phasedDevelopment":
      return context.delivery?.phasedDevelopment !== undefined;
    case "supportRequired":
      return context.delivery?.supportRequired !== undefined;
    case "contact":
      return Boolean(context.contact?.value);
    default:
      return true;
  }
};

// Генератор инструкции
export function generateAdditionalInstructions(
  context: AssistantContext
): string {
  const missingFields: string[] = [];

  for (const group of priorityGroups) {
    for (const field of group.fields) {
      if (!isFilled(context, field)) {
        missingFields.push(field);
      }
    }
  }

  const isStartingPhase = missingFields.length >= 10;

  const philosophyBlock = isStartingPhase
    ? `
🎓 Remember:
- You represent a professional digital agency.
- We work iteratively (Agile), focus on real business outcomes, maintain transparency, and adapt solutions to client needs.
- Your task is to guide the client’s thinking naturally and respectfully — not just ask questions.
    `.trim()
    : "";

  const missingFieldsText = missingFields.length
    ? buildFocusBlock(missingFields)
    : "- (None. You can proceed to finalize the project brief.)";

  return `
${philosophyBlock}

🧠 Current known facts about the project:
${generateKnownFactsBlock(context)}

---

📝 Focus for this message:

You still need to collect information about:
${missingFieldsText}

---

🔧 Function Call Requirements:
- After EVERY user reply, you MUST immediately call the \`update_context\` function.
- This is MANDATORY even if the update is small or if no new information was obtained.
- If no new information was obtained, call \`update_context\` with an empty object \`{}\`.
- Never skip calling \`update_context\`. Failure to do so is a critical error.
- After FULLY clarifying the project (requirements, goals, deadlines, and contacts), call \`submitBrief\`.
- If the user provides name and contact information (email, phone number, WhatsApp), you MUST immediately call \`submitBrief\`, even if some minor clarifications are pending.
- Do not continue asking questions after receiving contact details unless the user explicitly asks to add something.
- You are responsible for strictly following these instructions.
After successfully calling the \`submitBrief\` function, you MUST immediately send a message to the user confirming that their project brief was received and thanking them.

---

🎯 Behavioral Rules:
- Ask no more than one question at a time unless invited.
- Avoid technical jargon unless the user is technical.
- Confirm understanding if the topic is complex.
- Summarize facts if multiple points are clarified.
- Keep your tone natural, respectful, and professional.
  `.trim();
}

// Функция генерации блока фокуса
function buildFocusBlock(missingFields: string[]): string {
  return missingFields
    .map((field) => {
      const instruction = fieldInstructions[field];
      if (!instruction) {
        return `- ${capitalizeFieldName(field)}`;
      }
      return `
  - **${capitalizeFieldName(field)}**:
    - Tip: ${instruction.microTip}
    - Example Questions:
  ${instruction.exampleQuestions.map((q) => `    • ${q}`).join("\n")}
      `.trim();
    })
    .join("\n\n");
}

// Функция для красивого отображения имени поля
function capitalizeFieldName(field: string): string {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

// Генерация описания собранных фактов

function generateKnownFactsBlock(context: AssistantContext): string {
  const facts: string[] = [];

  if (context.project?.goal?.description) {
    facts.push(`- **Project Goal**: ${context.project.goal.description}`);
  }
  if (context.project?.audience?.description) {
    facts.push(
      `- **Target Audience**: ${context.project.audience.description}`
    );
  }
  if (context.technical?.features?.mustHave?.length) {
    facts.push(
      `- **Core Features**: ${context.technical.features.mustHave.join(", ")}`
    );
  }
  if (context.delivery?.deadline) {
    facts.push(`- **Estimated Deadline**: ${context.delivery.deadline}`);
  }
  if (context.project?.industry) {
    facts.push(`- **Business Industry**: ${context.project.industry}`);
  }
  if (context.project?.usp) {
    facts.push(`- **Unique Value Proposition (USP)**: ${context.project.usp}`);
  }
  if (context.technical?.platform) {
    facts.push(`- **Target Platforms**: ${context.technical.platform}`);
  }
  if (
    context.technical?.integrations?.standard?.length ||
    context.technical?.integrations?.custom?.length
  ) {
    const integrations = [
      ...(context.technical.integrations?.standard || []),
      ...(context.technical.integrations?.custom || []),
    ];
    facts.push(`- **Required Integrations**: ${integrations.join(", ")}`);
  }
  if (context.technical?.infrastructure?.length) {
    facts.push(
      `- **Existing Infrastructure**: ${context.technical.infrastructure.join(", ")}`
    );
  }
  if (context.technical?.multilingual !== undefined) {
    facts.push(
      `- **Multilingual Support**: ${context.technical.multilingual ? "Yes" : "No"}`
    );
  }
  if (context.technical?.accessibilityCompliance !== undefined) {
    facts.push(
      `- **Accessibility Requirements**: ${context.technical.accessibilityCompliance.required ? "Special standards required" : "Basic compliance"}`
    );
  }
  if (context.seoAndPerformance?.advancedSeoRequired !== undefined) {
    facts.push(
      `- **Advanced SEO Focus**: ${context.seoAndPerformance.advancedSeoRequired ? "Yes" : "No"}`
    );
  }
  if (context.delivery?.budget?.range) {
    facts.push(`- **Budget Estimate**: ${context.delivery.budget.range}`);
  }
  if (context.delivery?.phasedDevelopment !== undefined) {
    facts.push(
      `- **Phased Development Plan**: ${context.delivery.phasedDevelopment ? "Yes" : "No"}`
    );
  }
  if (context.delivery?.supportRequired !== undefined) {
    facts.push(
      `- **Post-Launch Support Needed**: ${context.delivery.supportRequired ? "Yes" : "No"}`
    );
  }
  if (context.contact?.value) {
    facts.push(
      `- **Contact Information**: ${context.contact.preferredChannel}: ${context.contact.value}`
    );
  }

  return facts.length ? facts.join("\n") : "- (no confirmed facts yet)";
}
