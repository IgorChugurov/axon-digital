import OpenAI from "openai";
import { handleToolCalls } from "./toolCallHandler";
import { AssistantContext } from "./generateAdditionalInstructions";

export async function ensureUpdateContextAfterMessage(
  openai: OpenAI,
  threadId: string,
  assistantId: string,
  updatedContext: AssistantContext
) {
  console.log("🔧 Forcing assistant to call update_context via new run...");

  const runStream = await openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
    instructions:
      "Please call the `update_context` function now with the current known state of the project. This is mandatory even if no new information was obtained.",
  });
  let assistantReply = "";
  for await (const event of runStream as AsyncIterable<any>) {
    console.log("event in ensureUpdateContextAfterMessage", event.event);

    if (event.event === "thread.message.delta") {
      const delta = event.data.delta;
      if (delta?.content?.[0]?.text?.value) {
        const chunk = delta.content[0].text.value;
        assistantReply += chunk;
      }
    }

    if (event.event === "thread.run.requires_action") {
      const run = event.data;
      const toolCalls = run.required_action?.submit_tool_outputs?.tool_calls;

      if (toolCalls) {
        const { outputs } = await handleToolCalls(
          toolCalls,
          threadId,
          updatedContext
        ); // без обновления assistantReply
        await openai.beta.threads.runs.submitToolOutputs(threadId, run.id, {
          tool_outputs: outputs,
        });
      }
    }

    if (event.event === "thread.run.completed") {
      console.log("✅ Assistant has completed forced update_context.");
      console.log(assistantReply);
      break;
    }
  }
}
