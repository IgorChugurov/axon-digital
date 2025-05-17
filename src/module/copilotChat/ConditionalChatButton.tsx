"use client";
import { usePathname } from "next/navigation";
import ChatButton from "@/module/copilotChat/components/ChatButton/ChatButton";

export default function ConditionalChatButton() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <ChatButton
      apiUrl="/api/assistant/copilot"
      labels={{
        title: "AI Assistant",
        placeholder: "Message assistnt",
      }}
    />
  );
}
