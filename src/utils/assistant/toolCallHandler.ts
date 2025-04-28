import { updateAssistantContextFromFunctionCall } from "@/utils/assistant/updateAssistantContextFromFunctionCall";
import { saveContextToDatabase } from "@/lib/db/saveContextToDatabase";
import { saveBriefToDatabase } from "@/lib/saveBriefToDatabase";
import { AssistantContext } from "./generateAdditionalInstructions";
import { validateUpdateContextArgs } from "./validateUpdateContextArgs";
import { sendContactEmail } from "@/lib/sendContactEmail";

interface ToolCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

interface ToolOutput {
  tool_call_id: string;
  output: string;
}

export async function handleToolCalls(
  toolCalls: ToolCall[],
  threadId: string,
  currentContext: AssistantContext
): Promise<{ outputs: ToolOutput[]; updatedContext: any }> {
  const outputs: ToolOutput[] = [];
  let updatedContext = currentContext;

  for (const toolCall of toolCalls) {
    try {
      const { name, arguments: argsString } = toolCall.function;
      const args = argsString ? JSON.parse(argsString) : {};
      //console.log("toolCall.function.name", name);
      if (name === "update_context") {
        if (validateUpdateContextArgs(args)) {
          updatedContext = updateAssistantContextFromFunctionCall(
            updatedContext,
            args
          );
          console.log("updatedContext", updatedContext);
          await saveContextToDatabase({ threadId, context: updatedContext });
          outputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify({ success: true }),
          });
        } else {
          console.warn(
            `⚠️ Invalid context update ignored for thread ${threadId}`
          );
          outputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify({ error: "Invalid context update args" }),
          });
        }
      } else if (name === "submitBrief") {
        console.log("submitBrief", args);
        await saveBriefToDatabase({
          threadId,
          name: args.name,
          contact: args.contact,
          brief: args.brief,
        });

        await sendContactEmail({
          name: args.name,
          email: args.contact,
          message: args.brief,
        });

        outputs.push({
          tool_call_id: toolCall.id,
          output: JSON.stringify({
            success: true,
            message: `Thank you, ${args.name}! Here's a summary of your project request:\n\n${args.brief}`,
          }),
        });
      } else {
        outputs.push({
          tool_call_id: toolCall.id,
          output: JSON.stringify({ error: `Unknown function: ${name}` }),
        });
      }
    } catch (err) {
      console.error("❌ Tool call error:", err);
    }
  }

  return { outputs, updatedContext };
}
