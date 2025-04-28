import { NextRequest } from "next/server";

import { extractClientIp } from "@/utils/getClientIp";
import { validateMessageInput } from "@/utils/validateMessageInput";
import { moderateMessage } from "@/utils/moderateMessage";
import { checkRateLimit } from "@/utils/checkRateLimit";
import { createThreadRecord } from "@/lib/db/createThreadRecord";

import OpenAI from "openai";
import { handleUserMessage } from "@/services/assistant.service";
import { createEmptyAssistantContext } from "@/utils/assistant/createEmptyAssistantContext";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const assistantId = process.env.ASSISTANT_ID!;

/**
 * Handles POST requests for AI assistant chat.
 */
export async function POST(req: NextRequest) {
  // Extract client IP
  const ip = extractClientIp(req);

  // Rate limiting
  const rateLimitResult = await checkRateLimit(ip);
  if (!rateLimitResult.ok) {
    return new Response(rateLimitResult.body, {
      status: rateLimitResult.status,
      headers: rateLimitResult.headers,
    });
  }

  // Parse body
  const body = await req.json();
  const { threadId, message, context } = body;

  if (!assistantId || !message) {
    return new Response("Missing required fields", { status: 400 });
  }

  // Validate message
  const validationResult = validateMessageInput(message);
  if (!validationResult.valid) {
    return new Response(JSON.stringify({ error: validationResult.reason }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Moderate message
  const moderationResult = await moderateMessage(message);
  if (moderationResult.flagged) {
    return new Response(JSON.stringify({ error: moderationResult.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Use existing thread or create a new one
    const thread = threadId
      ? { id: threadId }
      : await openai.beta.threads.create();

    // Create thread record if new
    if (!threadId) {
      await createThreadRecord({
        threadId: thread.id,
        title:
          message.length > 26
            ? message.slice(0, 26).trim() + " ..."
            : message.trim(),
        ip,
      });
    }

    // Cancel previous unfinished run if needed
    const runs = await openai.beta.threads.runs.list(thread.id, { limit: 1 });
    const lastRun = runs.data[0];

    if (lastRun && ["in_progress", "queued"].includes(lastRun.status)) {
      console.log("Cancelling previous unfinished run:", lastRun.id);
      try {
        await openai.beta.threads.runs.cancel(thread.id, lastRun.id);
      } catch (err) {
        console.warn("Failed to cancel run:", err);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    const initialContext = context || createEmptyAssistantContext(thread.id);

    const { stream } = await handleUserMessage({
      threadId: thread.id,
      message,
      context: initialContext,
      ip,
    });
    // 🧠 Delegate all assistant work to assistantService

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "x-thread-id": thread.id,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("API error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
