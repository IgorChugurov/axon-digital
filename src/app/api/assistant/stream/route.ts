import { NextRequest } from "next/server";
import OpenAI from "openai";

interface ThreadMessageDeltaEvent {
  event: "thread.message.delta";
  data: {
    delta: {
      content?: { text: { value: string } }[];
    };
  };
}

interface ToolCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

interface ThreadRunStepDeltaEvent {
  event: "thread.run.step.delta";
  data: {
    delta: {
      step_details?: {
        type: string;
        tool_calls?: ToolCall[];
      };
    };
  };
}

interface ThreadRunRequiresActionEvent {
  event: "thread.run.requires_action";
  data: {
    id: string;
    required_action?: {
      submit_tool_outputs?: {
        tool_calls: ToolCall[];
      };
    };
  };
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const assistantId = process.env.ASSISTANT_ID;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { threadId, message, context } = body;

  if (!assistantId || !message) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    const thread = threadId
      ? { id: threadId }
      : await openai.beta.threads.create();
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
    } else if (lastRun && lastRun.status === "requires_action") {
      const toolCall =
        lastRun?.required_action?.submit_tool_outputs?.tool_calls?.[0];
      const toolCallId = toolCall?.id;
      if (toolCall) {
        const args = JSON.parse(toolCall.function.arguments);
        console.log(args);
      }
      await openai.beta.threads.runs.submitToolOutputs(thread.id, lastRun.id, {
        tool_outputs: [
          {
            tool_call_id: toolCallId!,
            output: JSON.stringify({
              success: true,
              message: "Brief accepted",
            }),
          },
        ],
      });
    }

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    const runStream = await openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistantId,
      additional_instructions: context
        ? `Current context: ${JSON.stringify(context)}`
        : undefined,
    });

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

            if (event.event === "thread.message.delta") {
              const delta = (event as ThreadMessageDeltaEvent).data.delta;
              const chunk = delta?.content?.[0]?.text?.value;
              if (chunk) controller.enqueue(encoder.encode(chunk));
            }

            if (event.event === "thread.run.step.delta") {
              const delta = (event as ThreadRunStepDeltaEvent).data.delta;
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

            if (event.event === "thread.run.requires_action") {
              const run = (event as ThreadRunRequiresActionEvent).data;
              const toolCalls =
                run.required_action?.submit_tool_outputs?.tool_calls;

              if (toolCalls) {
                const toolOutputs = [];

                for (const toolCall of toolCalls) {
                  try {
                    const funcName = toolCall.function?.name;
                    const args = toolCall.function?.arguments
                      ? JSON.parse(toolCall.function.arguments)
                      : {};

                    let result;
                    if (funcName === "submitBrief") {
                      console.log("📨 Handling submitBrief with args:", args);
                      result = {
                        success: true,
                        message: "Brief accepted",
                      };
                    } else {
                      result = { error: "Unknown function" };
                    }

                    toolOutputs.push({
                      tool_call_id: toolCall.id,
                      output: JSON.stringify(result),
                    });
                  } catch (err) {
                    console.error("❌ Error handling toolCall", toolCall, err);
                  }
                }

                await openai.beta.threads.runs.submitToolOutputs(
                  thread.id,
                  run.id,
                  {
                    tool_outputs: toolOutputs,
                  }
                );
              }
            }
          }
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
