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

export async function copilotHandleToolCalls(
  toolCalls: ToolCall[],
  threadId: string
): Promise<{ outputs: ToolOutput[] }> {
  const outputs: ToolOutput[] = [];

  for (const toolCall of toolCalls) {
    try {
      const { name, arguments: argsString } = toolCall.function;
      const args = argsString ? JSON.parse(argsString) : {};
      //console.log("toolCall.function.name", name);
      if (name === "insertBlock") {
        outputs.push({
          tool_call_id: toolCall.id,
          output: JSON.stringify({
            success: true,
            message: `${args.name}`,
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

  return { outputs };
}
