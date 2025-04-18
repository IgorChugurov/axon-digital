"use client";

import React, { useEffect, useRef } from "react";
import { Loader2, Mic, SendHorizontal, RefreshCw } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  input: string;
  setInput: (input: string) => void;
  loading: boolean;
  handleSendMessage: (textOverride?: string) => void;
  resetThread: () => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  messagesLength: number;
}

export const InputArea = ({
  input,
  setInput,
  loading,
  handleSendMessage,
  resetThread,
  isListening,
  setIsListening,
  messagesLength,
}: Props) => {
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = navigator.language.startsWith("ru")
      ? "ru-RU"
      : navigator.language.startsWith("de")
      ? "de-DE"
      : "en-US";

    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSendMessage(transcript);
    };

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, [handleSendMessage, setIsListening]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <>
      <div className="relative pb-8 flex flex-col rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
        <TextareaAutosize
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          maxRows={10}
          className="w-full py-3 pl-3 pr-12 pb-6 text-sm resize-none outline-none min-h-[50px] max-h-[300px] overflow-auto text-gray-900 placeholder-gray-400"
          placeholder={
            !messagesLength
              ? "Tell me about your project, and I’ll help you create a detailed brief for its implementation."
              : "Message assistant"
          }
          disabled={loading}
        />

        {/* Микрофон */}
        <button
          type="button"
          onClick={toggleListening}
          className={`absolute right-13 bottom-2 p-2 rounded-full transition-colors ${
            isListening ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600"
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Кнопка отправки */}
        <button
          onClick={() => handleSendMessage()}
          disabled={loading || !input.trim()}
          className={`absolute right-2 bottom-2 p-2 rounded-full transition-colors ${
            loading || !input.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-900"
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            <SendHorizontal className="w-5 h-5" />
          )}
        </button>

        {/* Индикатор записи */}
        {isListening && (
          <div className="absolute left-14 bottom-3 text-xs text-red-500 animate-pulse">
            Listening...
          </div>
        )}
      </div>

      <div className="flex justify-end mt-2 text-xs text-gray-400">
        <button
          onClick={resetThread}
          className="flex items-center gap-1 hover:text-gray-600 transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Clean history</span>
        </button>
      </div>
    </>
  );
};
