"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import { InputArea } from "./InputArea";
import { sendMessage } from "@/utils/sendMessage";
import { send } from "process";
import { getMessagesFromServer } from "@/services/threads";

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  error?: boolean;
}

export const THREAD_KEY = "assistant_thread_id";

const ChatWindowStream: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [threadId, setThreadId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const getMessages = async (threadId: string) => {
      const res = await getMessagesFromServer(threadId);
      setMessages(res);
    };

    const savedThreadId = localStorage.getItem(THREAD_KEY);
    if (savedThreadId) {
      setThreadId(savedThreadId);
      getMessages(savedThreadId);
    }

    const handleSelectThreadHandler = (event: CustomEvent) => {
      const { detail } = event;
      if (detail) {
        setThreadId(detail);
        getMessages(detail);
      } else {
        setThreadId(undefined);
        setMessages([]);
      }
    };

    window.addEventListener(
      "selectThread",
      handleSelectThreadHandler as EventListener
    );

    return () => {
      window.removeEventListener(
        "selectThread",
        handleSelectThreadHandler as EventListener
      );
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Auto-scroll to chat if user comes from platform page with #chat hash
    if (window.location.hash === "#chat") {
      setTimeout(() => {
        const chatElement = document.getElementById("chat");
        if (chatElement) {
          chatElement.scrollIntoView({ behavior: "smooth", block: "start" });
          // Focus input after scroll
          setTimeout(() => {
            sendMessage("focusInputArea");
          }, 500);
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "ru-RU";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || input.trim();
    if (!text || loading) return;

    const id = Date.now();
    const newMessages: Message[] = [...messages, { id, text, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, threadId }),
      });
      //console.log(res);
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
      setMessages((prev) => [...prev, { id: botId, text: "", sender: "bot" }]);

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
        { id: Date.now(), text: "Ошибка получения ответа", sender: "bot" },
      ]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        console.log("focusInputArea");
        sendMessage("focusInputArea");
      }, 100);
    }
  };

  const resetThread = () => {
    localStorage.removeItem(THREAD_KEY);
    setThreadId(undefined);
    setMessages([]);
  };

  const focusInputArea = () => {
    sendMessage("focusInputArea");
  };

  return (
    <div
      id="chat"
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "48rem",
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "auto",
        flex: 1,
        position: "relative",
        width: "100%",
        alignSelf: "stretch",
      }}
      className="px-4 bg-wite"
    >
      <div
        className="flex-1 flex flex-col overflow-y-auto pt-3 space-y-6 bg-white scrollbar-hide"
        id="chat"
      >
        {messages.length === 0 ? (
          <>
            <div
              style={{
                maxWidth: "64rem",
                width: "100%",
                textAlign: "center",
                paddingTop: "1.25rem",
                paddingBottom: "0.25rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 className="text-4xl font-bold text-gray-900">
                We are a digital agency — your partner in building smart digital
                solutions. Our AI assistant helps you create a detailed request
                so our team can prepare the perfect proposal for your project.
              </h1>
            </div>
            <div
              className="flex items-center justify-center  text-gray-400 text-center px-8"
              style={{ flexDirection: "column", flex: 1, alignSelf: "stretch" }}
            >
              <div>
                <Bot className="h-12 w-12 mx-auto mb-4 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 bg-[length:200%_auto] bg-clip-text animate-gradient-text" />
                <p
                  onClick={focusInputArea}
                  className="cursor-pointer hover:underline text-lg font-medium mb-2 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-text"
                >
                  Start a new conversation
                </p>
                <p className="text-lg" style={{ color: "#4B5563" }}>
                  Simply describe your vision and requirements. The assistant
                  will guide you through gathering all the details our team
                  needs to create a tailored proposal for your project.
                </p>
              </div>
            </div>
          </>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* <div
                className={`max-w-[80%] py-3 ${
                  msg.sender === "user" ? "rounded-2xl shadow-sm px-4" : ""
                } whitespace-pre-wrap text-base leading-loose text-black ${
                  msg.sender === "bot"
                    ? "rounded-tr-none"
                    : "bg-gray-100 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div> */}
              <div
                className={`max-w-[80%] py-3 px-4 whitespace-pre-wrap text-base leading-loose rounded-2xl shadow-sm ${
                  msg.sender === "user"
                    ? "bg-gray-100 text-black rounded-tl-none"
                    : msg.error
                      ? "bg-red-100 text-red-700 border border-red-400"
                      : "bg-white text-black rounded-tr-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <InputArea
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        resetThread={resetThread}
        loading={loading}
        isListening={isListening}
        setIsListening={setIsListening}
        messagesLength={messages.length}
      />
    </div>
  );
};

export default ChatWindowStream;
