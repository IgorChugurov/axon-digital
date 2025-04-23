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
  toolCalls: ToolCall[]
): Promise<ToolOutput[]> {
  const outputs: ToolOutput[] = [];

  for (const toolCall of toolCalls) {
    try {
      const funcName = toolCall.function?.name;
      const args = toolCall.function?.arguments
        ? JSON.parse(toolCall.function.arguments)
        : {};

      let result;

      switch (funcName) {
        case "submitBrief":
          console.log("📨 Handling submitBrief with args:", args);
          result = { success: true, message: "Brief accepted" };
          break;

        default:
          result = { error: `Unknown function "${funcName}"` };
      }

      outputs.push({
        tool_call_id: toolCall.id,
        output: JSON.stringify(result),
      });
    } catch (err) {
      console.error("❌ Error handling toolCall", toolCall, err);
    }
  }

  return outputs;
}
