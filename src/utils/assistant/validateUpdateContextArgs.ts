import { AssistantContext } from "./generateAdditionalInstructions";

/**
 * Проверка, что args безопасны для обновления AssistantContext.
 */
export function validateUpdateContextArgs(
  args: unknown
): args is Partial<AssistantContext> {
  if (typeof args !== "object" || args === null) return false;

  const allowedKeys: (keyof AssistantContext)[] = [
    "threadId",
    "project",
    "technical",
    "seoAndPerformance",
    "delivery",
    "contact",
    "updatedAt",
  ];

  for (const key of Object.keys(args)) {
    if (!allowedKeys.includes(key as keyof AssistantContext)) {
      return false;
    }
  }

  return true;
}
