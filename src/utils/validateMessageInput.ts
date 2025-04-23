// src/utils/validateMessage.ts

import { MAX_CHAR_LENGTH, MIN_CHAR_LENGTH } from "@/config/rateLimitConfig";

export function validateMessageInput(
  message: string
): { valid: true } | { valid: false; reason: string } {
  const trimmed = message.trim();

  if (!trimmed.length) {
    return { valid: false, reason: "Message is empty." };
  }

  if (trimmed.length < MIN_CHAR_LENGTH) {
    return { valid: false, reason: "Message is too short." };
  }

  if (trimmed.length > MAX_CHAR_LENGTH) {
    return { valid: false, reason: "Message is too long." };
  }

  return { valid: true };
}
