"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, Mic, SendHorizontal, RefreshCw } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleSendMessage: (textOverride?: string) => void;
  resetThread: () => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  messagesLength: number;
}

const supportedLanguages = [
  { code: "en-US", label: "English", flag: "🇬🇧" },
  { code: "ru-RU", label: "Русский", flag: "🇷🇺" },
  { code: "uk-UA", label: "Українська", flag: "🇺🇦" },
  { code: "de-DE", label: "Deutsch", flag: "🇩🇪" },
  { code: "sq-AL", label: "Shqip", flag: "🇦🇱" },
  { code: "es-ES", label: "Español", flag: "🇪🇸" },
  { code: "fr-FR", label: "Français", flag: "🇫🇷" },
  { code: "it-IT", label: "Italiano", flag: "🇮🇹" },
];

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
  const [language, setLanguage] = useState<string | null>(null);
  const [languagePickerOpen, setLanguagePickerOpen] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLang");
    if (storedLang) setLanguage(storedLang);
  }, []);

  useEffect(() => {
    if (!language) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = language || "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log("transcript", transcript);
      setInput((prev) => prev + " " + transcript);
      //handleSendMessage(transcript);
    };

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, [language, handleSendMessage, setIsListening]);

  const toggleListening = () => {
    if (!language) {
      setLanguagePickerOpen(true);
      return;
    }
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };
  //console.log(language);

  const handleSelectLanguage = (code: string) => {
    //localStorage.setItem("preferredLang", code);
    setLanguage(code);
    setLanguagePickerOpen(false);
  };
  useEffect(() => {
    const focusInputAreaHandler = (event: CustomEvent) => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    window.addEventListener(
      "focusInputArea",
      focusInputAreaHandler as EventListener
    );
    return () => {
      window.removeEventListener(
        "focusInputArea",
        focusInputAreaHandler as EventListener
      );
    };
  }, [textareaRef]);

  return (
    <>
      <div className="relative pb-8 flex flex-col rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
        {languagePickerOpen && (
          <div className="absolute bottom-16 left-3 z-10 flex flex-wrap gap-2 bg-white p-3 rounded-lg shadow-md">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                className="text-sm px-2 py-1 rounded hover:bg-gray-200"
                onClick={() => handleSelectLanguage(lang.code)}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>
        )}

        <TextareaAutosize
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          onFocus={() => {
            setTimeout(() => {
              textareaRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
            }, 300);
          }}
          maxRows={10}
          className="w-full py-3 pl-3 pr-12 pb-6 text-base resize-none outline-none min-h-[50px] max-h-[300px] overflow-auto text-gray-900 placeholder-gray-400"
          placeholder={
            !messagesLength
              ? "Tell me about your project, and I’ll help you create a detailed brief for its implementation."
              : "Message assistant"
          }
          // placeholder={
          //   isListening
          //     ? `🎙 Listening...${
          //         language
          //           ? `   🌐 Language: ${
          //               supportedLanguages.find((l) => l.code === language)
          //                 ?.label
          //             }`
          //           : ""
          //       }`
          //     : !messagesLength
          //     ? "Tell me about your project, and I’ll help you create a detailed brief for its implementation."
          //     : "Message assistant"
          // }
          disabled={loading || isListening}
        />

        <button
          type="button"
          disabled={loading}
          onClick={toggleListening}
          className={`absolute right-13 bottom-2 p-2 rounded-full transition-colors ${
            isListening ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600"
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>

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
          <span>New conversation</span>
        </button>
      </div>
    </>
  );
};
