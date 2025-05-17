// useChatMessaging.ts
import { useCallback, useEffect, useState } from "react";
import { sendMessage } from "@/utils/sendMessage";
import { getMessagesFromServer } from "@/services/threads";

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  error?: boolean;
}

export const THREAD_KEY = "assistant_thread_id";

export function useChatMessaging(apiUrl: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | undefined>();

  useEffect(() => {
    const init = async () => {
      const savedThreadId = localStorage.getItem(THREAD_KEY);
      if (savedThreadId) {
        setThreadId(savedThreadId);
        const initialMessages = await getMessagesFromServer(savedThreadId);
        setMessages(initialMessages);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const handleSelectThreadHandler = (event: CustomEvent) => {
      const { detail } = event;
      if (detail) {
        setThreadId(detail);
        getMessagesFromServer(detail).then(setMessages);
      } else {
        setThreadId(undefined);
        setMessages([]);
      }
    };

    window.addEventListener(
      "selectThread",
      handleSelectThreadHandler as EventListener
    );
    return () =>
      window.removeEventListener(
        "selectThread",
        handleSelectThreadHandler as EventListener
      );
  }, []);

  const handleSendMessage = useCallback(
    async (textOverride?: string) => {
      const text = textOverride || input.trim();
      if (!text || loading) return;

      const id = Date.now();
      const newMessages: Message[] = [
        ...messages,
        { id, text, sender: "user" },
      ];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, threadId }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          const errMsg = errorData.error || "Unknown error";
          setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: errMsg, sender: "bot", error: true },
          ]);
          return;
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let reply = "";
        const botId = Date.now() + 1;
        setMessages((prev) => [
          ...prev,
          { id: botId, text: "", sender: "bot" },
        ]);

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          reply += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botId ? { ...msg, text: msg.text + chunk } : msg
            )
          );
        }

        const newThreadId = res.headers.get("x-thread-id");
        if (newThreadId && newThreadId !== threadId) {
          setThreadId(newThreadId);
          localStorage.setItem(THREAD_KEY, newThreadId);
          sendMessage("refreshThreads");
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), text: "Error getting answer", sender: "bot" },
        ]);
      } finally {
        setLoading(false);
        setTimeout(() => sendMessage("focusInputArea"), 100);
      }
    },
    [apiUrl, input, loading, messages, threadId]
  );

  const resetThread = () => {
    localStorage.removeItem(THREAD_KEY);
    setThreadId(undefined);
    setMessages([]);
  };

  return {
    input,
    setInput,
    loading,
    messages,
    handleSendMessage,
    resetThread,
  };
}
