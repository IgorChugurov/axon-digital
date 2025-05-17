import OpenAI from "openai";
import { logMessageToDatabase } from "@/lib/db/logMessageToDatabase";
import { copilotHandleToolCalls } from "@/utils/assistant/toolCallHandlerCopilot";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface HandleUserMessageOptions {
  assistantId: string;
  threadId: string;
  message: string;
  ip: string;
}

/**
 * Handles full flow of user message → assistant response
 */

export async function handleUserMessageCopilot({
  assistantId,
  threadId,
  message,
  ip,
}: HandleUserMessageOptions) {
  await logMessageToDatabase({
    assistantId,
    threadId,
    role: "user",
    ip,
    timestamp: new Date(),
  });

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
  const additionalInstructions = "";

  const runStream = await openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
    additional_instructions: additionalInstructions,
  });

  const encoder = new TextEncoder();
  let assistantReply = "";

  const stream = new ReadableStream({
    async start(controller) {
      let requiresActionReceived = false;
      for await (const event of runStream as AsyncIterable<any>) {
        //
        if (event.event === "thread.message.delta") {
          const delta = event.data.delta;
          if (delta?.content?.[0]?.text?.value) {
            const chunk = delta.content[0].text.value;
            assistantReply += chunk;
            controller.enqueue(encoder.encode(chunk));
          }
        }

        if (event.event === "thread.run.requires_action") {
          requiresActionReceived = true;
          console.log("event.event", event.event);
          const run = event.data;
          const toolCalls =
            run.required_action?.submit_tool_outputs?.tool_calls;

          if (toolCalls) {
            const { outputs } = await copilotHandleToolCalls(
              toolCalls,
              threadId
            );

            await openai.beta.threads.runs.submitToolOutputs(threadId, run.id, {
              tool_outputs: outputs,
            });
          }
        }
        if (
          event.event === "thread.run.completed" &&
          requiresActionReceived === false
        ) {
        }
      }

      await logMessageToDatabase({
        assistantId,
        threadId,
        role: "assistant",
        ip,
        timestamp: new Date(),
      });

      controller.close();
    },
  });

  return { stream };
}
