// dispatchCopilotAction.ts

export function dispatchCopilotAction(action: string, args: any) {
    switch (action) {
      case "insert_block": {
        const blockName = args?.blockName;
        const el = document.querySelector(`[data-block-name='${blockName}']`);
        (el?.querySelector("button.insert-button") as HTMLElement)?.click();
        break;
      }
  
      case "navigate_to": {
        if (typeof args?.url === "string") {
          window.location.href = args.url;
        }
        break;
      }
  
      case "highlight": {
        const sel = args?.selector;
        const el = sel ? document.querySelector(sel) : null;
        if (el) el.classList.add("ring-2", "ring-blue-500");
        break;
      }
  
      default:
        console.warn("Unknown copilot action:", action, args);
        break;
    }
  }
  