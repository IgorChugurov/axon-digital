import OpenAI from "openai";

import {
  AssistantContext,
  generateAdditionalInstructions,
} from "@/utils/assistant/generateAdditionalInstructions";
import { updateAssistantContextFromFunctionCall } from "@/utils/assistant/updateAssistantContextFromFunctionCall";
import { shouldTriggerSubmitBrief } from "@/utils/assistant/shouldTriggerSubmitBrief";
import { buildSubmitBriefPayload } from "@/utils/assistant/buildSubmitBriefPayload";
import { handleToolCalls } from "@/utils/assistant/toolCallHandler";
import { logMessageToDatabase } from "@/lib/db/logMessageToDatabase";
import { loadContextFromDatabase } from "@/lib/db/loadContextFromDatabase";
import { createEmptyAssistantContext } from "@/utils/assistant/createEmptyAssistantContext";
import { ensureUpdateContextAfterMessage } from "@/utils/assistant/ensureUpdateContextAfterMessage";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const assistantId = process.env.ASSISTANT_ID!;

interface HandleUserMessageOptions {
  threadId: string;
  message: string;
  context: AssistantContext;
  ip: string;
}

/**
 * Handles full flow of user message → assistant response → context update
 */

export async function handleUserMessage({
  threadId,
  message,
  context,
  ip,
}: HandleUserMessageOptions) {
  const loadedContext = await loadContextFromDatabase(threadId);
  const latestContext =
    loadedContext || context || createEmptyAssistantContext(threadId);
  //console.log("context", context);
  //console.log("latestContext", latestContext);
  const additionalInstructions = generateAdditionalInstructions(latestContext);
  //console.log("additionalInstructions", additionalInstructions);

  await logMessageToDatabase({
    threadId,
    role: "user",
    content: message,
    ip,
    timestamp: new Date(),
  });

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });

  const runStream = await openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
    additional_instructions: additionalInstructions,
  });

  const encoder = new TextEncoder();
  let assistantReply = "";
  let updatedContext = latestContext;

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
            const { outputs, updatedContext: newContext } =
              await handleToolCalls(toolCalls, threadId, updatedContext);
            console.log("newContext", newContext);
            updatedContext = newContext;

            await openai.beta.threads.runs.submitToolOutputs(threadId, run.id, {
              tool_outputs: outputs,
            });
          }
        }
        if (
          event.event === "thread.run.completed" &&
          requiresActionReceived === false
        ) {
          // console.log("event.event", event.event);
          // const res = await ensureUpdateContextAfterMessage(
          //   openai,
          //   threadId,
          //   assistantId,
          //   updatedContext
          // );
          // console.log("res", res);
        }
      }

      await logMessageToDatabase({
        threadId,
        role: "assistant",
        content: assistantReply,
        ip,
        timestamp: new Date(),
      });

      controller.close();
    },
  });

  return { stream, updatedContext };
}
