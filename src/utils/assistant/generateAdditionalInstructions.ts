import { SimplifiedAssistantContext } from "./createEmptyAssistantContext";

// Our services for recommendations
const AGENCY_SERVICES = [
  { id: "spec-documentation", name: "Project and Technical Documentation" },
  { id: "documentation-audit", name: "Documentation Audit and Evaluation" },
  { id: "web-app-development", name: "Web Application Development" },
  { id: "website-creation", name: "Website Creation" },
  { id: "process-automation", name: "Business Process Automation" },
  { id: "ai-integration", name: "AI Integration into Business Workflows" },
  { id: "tvorflow-platform", name: "TvorFlow Platform - No-Code Development" },
];

// Priorities for fields to collect RFP
const PRIORITY_FIELDS = [
  { fields: ["project_goal", "target_audience"], priority: 1 },
  { fields: ["project_type", "key_features"], priority: 2 },
  { fields: ["industry", "platform"], priority: 3 },
  { fields: ["integrations"], priority: 4 },
  { fields: ["contact_name", "contact_info"], priority: 5 },
];

// Check if field is filled
const isFilled = (
  context: SimplifiedAssistantContext,
  field: string
): boolean => {
  switch (field) {
    case "project_goal":
      return Boolean(context.project_goal);
    case "target_audience":
      return Boolean(context.target_audience);
    case "project_type":
      return Boolean(context.project_type);
    case "key_features":
      return Boolean(context.key_features?.length);
    case "industry":
      return Boolean(context.industry);
    case "platform":
      return Boolean(context.platform);
    case "integrations":
      return Boolean(context.integrations?.length);
    case "contact_name":
      return Boolean(context.contact_name);
    case "contact_info":
      return Boolean(context.contact_info);
    default:
      return true;
  }
};

// Generator instructions
export function generateAdditionalInstructions(
  context: SimplifiedAssistantContext
): string {
  const missingFields: string[] = [];

  for (const group of PRIORITY_FIELDS) {
    for (const field of group.fields) {
      if (!isFilled(context, field)) {
        missingFields.push(field);
      }
    }
  }

  const isStartingPhase = missingFields.length >= 6;
  const readyForServices = context.project_goal && context.project_type;
  const readyForContact = missingFields.length <= 2;

  const servicesBlock = readyForServices
    ? `
📋 **AxonDigital Services:**
We offer 7 specialized services:
1. **Project Documentation** - Technical specs, architecture, timelines
2. **Documentation Audit** - Review existing project documentation
3. **Web Application Development** - Custom web apps, CRM systems
4. **Website Creation** - Corporate sites, landing pages, ecommerce
5. **Process Automation** - Digitize workflows, HR, logistics
6. **AI Integration** - LLM integration, AI assistants, automation
7. **TvorFlow Platform** - No-code application development with auto-generated CRUD

Based on what we've discussed, I can recommend specific services that fit your needs.
  `
    : "";

  const criticalInstructions = `
🔥 **CRITICAL RFP GATHERING RULES:**
1. You MUST call update_context function after EVERY user message
2. Even if no new information was provided - call update_context with empty object {}
3. This is NON-NEGOTIABLE. Failure to call this function is a system error
4. When you have comprehensive project information and contact details, immediately call submitBrief
5. NEVER discuss pricing, budgets, costs, or give any estimates
6. NEVER propose technical solutions, timelines, or implementation details
7. Focus ONLY on gathering information for RFP preparation
  `;

  const knownFactsText = generateKnownFactsBlock(context);
  const missingFieldsText = missingFields.length
    ? buildFocusBlock(missingFields)
    : "✅ All key information collected. Ready to request contact details.";

  return `
${criticalInstructions}

🧠 **Current RFP Information Collected:**
${knownFactsText}

${servicesBlock}

📝 **Still Need to Gather:**
${missingFieldsText}

${
  readyForContact
    ? `
🎯 **Ready for RFP Submission:**
You have enough information to proceed. Ask for the client's name and contact (email or WhatsApp) to prepare their detailed RFP.
`
    : ""
}

💡 **Remember:**
- Ask only ONE question at a time
- Focus on business needs, not technical solutions
- Recommend specific services when appropriate
- NEVER discuss pricing or timelines
- Call update_context after EVERY response
  `.trim();
}

// Generate known facts block
function generateKnownFactsBlock(context: SimplifiedAssistantContext): string {
  const facts: string[] = [];

  if (context.project_goal) {
    facts.push(`- **Business Goal**: ${context.project_goal}`);
  }
  if (context.target_audience) {
    facts.push(`- **Target Users**: ${context.target_audience}`);
  }
  if (context.project_type) {
    facts.push(`- **Solution Type**: ${context.project_type}`);
  }
  if (context.key_features?.length) {
    facts.push(`- **Key Features**: ${context.key_features.join(", ")}`);
  }
  if (context.industry) {
    facts.push(`- **Industry**: ${context.industry}`);
  }
  if (context.platform) {
    facts.push(`- **Platform**: ${context.platform}`);
  }
  if (context.integrations?.length) {
    facts.push(`- **Integrations**: ${context.integrations.join(", ")}`);
  }
  if (context.recommended_services?.length) {
    facts.push(
      `- **Recommended Services**: ${context.recommended_services.join(", ")}`
    );
  }
  if (context.contact_name) {
    facts.push(`- **Contact**: ${context.contact_name}`);
  }

  return facts.length ? facts.join("\n") : "- (No information collected yet)";
}

// Generate missing fields block
function buildFocusBlock(missingFields: string[]): string {
  const fieldDescriptions = {
    project_goal: "What business challenge are they trying to solve?",
    target_audience: "Who are the main users of this system?",
    project_type: "What type of solution do they need?",
    key_features: "What core functionality is required?",
    industry: "What business sector are they in?",
    platform: "What platforms should be supported?",
    integrations: "Any existing systems to integrate with?",
    contact_name: "Client's name for the RFP",
    contact_info: "Email or WhatsApp for sending the proposal",
  };

  return missingFields
    .map(
      (field) =>
        `- **${fieldDescriptions[field as keyof typeof fieldDescriptions] || field}**`
    )
    .join("\n");
}
