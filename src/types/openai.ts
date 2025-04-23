// src/types/openai.ts

export interface ThreadMessageDeltaEvent {
  event: "thread.message.delta";
  data: {
    delta: {
      content?: { text: { value: string } }[];
    };
  };
}

export interface ToolCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

export interface ThreadRunStepDeltaEvent {
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

export interface ThreadRunRequiresActionEvent {
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
