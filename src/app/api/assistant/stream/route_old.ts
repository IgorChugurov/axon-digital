// src/app/api/chat/route.ts

import { NextRequest } from "next/server";
import OpenAI from "openai";

import { extractClientIp } from "@/utils/getClientIp";
import { validateMessageInput } from "@/utils/validateMessageInput";
import { moderateMessage } from "@/utils/moderateMessage";
import { logMessageToDatabase } from "@/lib/db/logMessageToDatabase";
import { checkRateLimit } from "@/utils/checkRateLimit";
import { handleToolCalls } from "@/utils/assistant/toolCallHandler";

import {
  ThreadMessageDeltaEvent,
  ThreadRunStepDeltaEvent,
  ThreadRunRequiresActionEvent,
} from "@/types/openai";
import { createThreadRecord } from "@/lib/db/createThreadRecord";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const assistantId = process.env.ASSISTANT_ID;

/**
 * Handles POST requests for AI assistant chat.
 *
 * Accepts user messages, performs validation and moderation,
 * initiates or continues a thread with OpenAI Assistant,
 * handles streaming response, tool calls, and logging.
 *
 * @param req - Incoming HTTP request (Next.js)
 * @returns Streaming AI response (text/plain)
 */
export async function POST(req: NextRequest) {
  // Extract client IP and apply rate limiting
  const ip = extractClientIp(req);
  const rateLimitResult = await checkRateLimit(ip);
  if (!rateLimitResult.ok) {
    return new Response(rateLimitResult.body, {
      status: rateLimitResult.status,
      headers: rateLimitResult.headers,
    });
  }

  // Parse request body
  const body = await req.json();
  const { threadId, message, context } = body;

  // Ensure required fields are present
  if (!assistantId || !message) {
    return new Response("Missing required fields", { status: 400 });
  }

  // Validate message input
  const validationResult = validateMessageInput(message);
  if (!validationResult.valid) {
    return new Response(JSON.stringify({ error: validationResult.reason }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Moderate the message via OpenAI API
  const moderationResult = await moderateMessage(message);
  if (moderationResult.flagged) {
    return new Response(JSON.stringify({ error: moderationResult.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  console.log("Moderation result:", moderationResult);

  try {
    // Use existing thread or create a new one
    const thread = threadId
      ? { id: threadId }
      : await openai.beta.threads.create();

    // Check if threadId is provided
    // If not, create a new thread record in the database
    // This is useful for tracking and managing threads
    // in the database for future reference
    // and analysis
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

    // Log user message to database
    await logMessageToDatabase({
      threadId: thread.id,
      role: "user",
      content: message,
      ip,
      timestamp: new Date(),
    });

    // Append the message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    // Start a run and stream the assistant's response
    const runStream = await openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistantId,
      // additional_instructions: context
      //   ? `Current context: ${JSON.stringify(context)}`
      //   : undefined,
    });

    let assistantReply = "";
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        console.log("Starting stream processing...");

        try {
          for await (const event of runStream as AsyncIterable<
            | ThreadMessageDeltaEvent
            | ThreadRunStepDeltaEvent
            | ThreadRunRequiresActionEvent
          >) {
            console.log("Event received:", event.event);

            // Handle text deltas from the assistant
            if (event.event === "thread.message.delta") {
              const delta = event.data.delta;
              if (delta?.content?.[0]?.text?.value) {
                const chunk = delta.content[0].text.value;
                assistantReply += chunk;
                controller.enqueue(encoder.encode(chunk));
              }
            }

            // Optional: handle tool_call step delta (log only)
            if (event.event === "thread.run.step.delta") {
              const delta = event.data.delta;
              if (delta?.step_details?.type === "tool_calls") {
                delta.step_details.tool_calls?.forEach((toolCall) => {
                  if (toolCall.function.arguments) {
                    const args = toolCall.function.arguments;
                    console.log("args", args);
                    controller.enqueue(encoder.encode(args));
                  }
                });
              }
            }

            // Handle required tool call execution
            if (event.event === "thread.run.requires_action") {
              const run = event.data;
              const toolCalls =
                run.required_action?.submit_tool_outputs?.tool_calls;

              //   if (toolCalls) {
              //     const toolOutputs = await handleToolCalls(toolCalls);
              //     await openai.beta.threads.runs.submitToolOutputs(
              //       thread.id,
              //       run.id,
              //       {
              //         tool_outputs: toolOutputs,
              //       }
              //     );
              //   }
            }
          }

          // Log assistant reply after full stream
          await logMessageToDatabase({
            threadId: thread.id,
            role: "assistant",
            content: assistantReply,
            ip,
            timestamp: new Date(),
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : String(error);
          console.error("Stream processing error:", message);
          controller.enqueue(encoder.encode(`\n[ERROR] ${message}`));
        }

        console.log("Stream processing complete");
        controller.close();
      },
    });

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
