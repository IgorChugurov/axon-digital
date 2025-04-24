"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import { InputArea } from "./InputArea";
import { sendMessage } from "@/utils/sendMessage";
import { send } from "process";

interface Message {
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
      fetch(`/api/conversations/${threadId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const messages: Message[] = data.map((msg) => {
              return {
                id: new Date(msg.timestamp).getTime(),
                text: msg.content,
                sender: msg.role === "assistant" ? "bot" : "user",
              };
            });
            setMessages(messages);
          } else {
            setMessages([]);
          }
        })
        .catch(() => {
          setMessages([]);
        });
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

  return (
    <div
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
        className="flex-1 overflow-y-auto pt-3 space-y-6 bg-white scrollbar-hide"
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
              <p className="text-lg" style={{ color: "#4B5563" }}>
                We are a digital agency — your partner in building smart digital
                solutions. Our AI assistant makes it quick and easy to submit a
                project request.
              </p>
            </div>
            <div className="flex items-center justify-center h-full text-gray-400 text-center px-8">
              <div>
                <Bot className="h-12 w-12 mx-auto mb-4 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 bg-[length:200%_auto] bg-clip-text animate-gradient-text" />
                <p className="text-lg font-medium mb-2 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-text">
                  Start a new conversation
                </p>
                <p className="text-lg" style={{ color: "#4B5563" }}>
                  Just describe your needs, and the assistant will gather
                  everything required to create a high-quality project brief.
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
