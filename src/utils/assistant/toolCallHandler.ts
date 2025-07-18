import { updateAssistantContextFromFunctionCall } from "@/utils/assistant/updateAssistantContextFromFunctionCall";
import { saveContextToDatabase } from "@/lib/db/saveContextToDatabase";
import { saveBriefToDatabase } from "@/lib/saveBriefToDatabase";
import { SimplifiedAssistantContext } from "./createEmptyAssistantContext";
import { validateUpdateContextArgs } from "./validateUpdateContextArgs";
import { sendContactEmail } from "@/lib/sendContactEmail";
import { sendWhatsAppMessage } from "@/lib/sendWhatsAppMessage";

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
  currentContext: SimplifiedAssistantContext
): Promise<{
  outputs: ToolOutput[];
  updatedContext: SimplifiedAssistantContext;
}> {
  const outputs: ToolOutput[] = [];
  let updatedContext = currentContext;

  console.log("🔧 Processing tool calls:", {
    count: toolCalls.length,
    threadId,
    functions: toolCalls.map((tc) => tc.function.name),
  });

  for (const toolCall of toolCalls) {
    try {
      const { name, arguments: argsString } = toolCall.function;
      const args = argsString ? JSON.parse(argsString) : {};

      console.log(`🎯 Processing function: ${name}`, {
        args: Object.keys(args),
        hasContent: Object.values(args).some((v) => v && v !== ""),
      });

      if (name === "update_context") {
        // Log incoming arguments
        console.log("📝 Update context args:", args);

        if (validateUpdateContextArgs(args)) {
          updatedContext = updateAssistantContextFromFunctionCall(
            updatedContext,
            args
          );

          console.log("💾 Saving context to database...");
          await saveContextToDatabase({ threadId, context: updatedContext });

          outputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify({
              success: true,
              message: "Context updated successfully",
              fields_updated: Object.keys(args).filter(
                (key) => (args as any)[key]
              ),
            }),
          });

          console.log("✅ Context update successful");
        } else {
          console.warn("⚠️ Invalid context update args:", args);
          outputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify({
              error: "Invalid context update args",
              received: args,
            }),
          });
        }
      } else if (name === "submitBrief") {
        console.log("📨 Submitting brief:", {
          hasName: !!args.name,
          hasContact: !!args.contact,
          hasBrief: !!args.brief,
        });

        console.log("📄 Detailed submitBrief args:", {
          name: args.name,
          contact: args.contact,
          brief: args.brief?.substring(0, 100) + "...", // First 100 chars
        });

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

        await sendWhatsAppMessage(
          args.contact,
          `New request from ${args.name}\n\n${args.brief}`
        );

        outputs.push({
          tool_call_id: toolCall.id,
          output: JSON.stringify({
            success: true,
            message: `Thank you, ${args.name}! Your project brief has been received and our team will contact you shortly.`,
            should_respond: true,
            response_text: `Спасибо, ${args.name}! Ваш запрос получен и наша команда свяжется с вами в ближайшее время для обсуждения проекта. Мы подготовим детальное предложение на основе собранной информации.`,
          }),
        });

        console.log("✅ Brief submitted successfully");
      } else {
        console.warn(`❌ Unknown function: ${name}`);
        outputs.push({
          tool_call_id: toolCall.id,
          output: JSON.stringify({ error: `Unknown function: ${name}` }),
        });
      }
    } catch (err) {
      console.error("❌ Tool call error:", err);
      outputs.push({
        tool_call_id: toolCall.id,
        output: JSON.stringify({
          error: `Tool call failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        }),
      });
    }
  }

  console.log("🎉 Tool calls processing complete:", {
    totalCalls: toolCalls.length,
    successfulCalls: outputs.filter((o) => !JSON.parse(o.output).error).length,
    contextUpdated: updatedContext.updatedAt,
  });

  return { outputs, updatedContext };
}
