"use client";

import React, { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./InputArea.module.css";
import { MicButton } from "./MicButton";
import { SendButton } from "./SendButton";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleSendMessage: (textOverride?: string) => void;
  resetThread: () => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  messagesLength: number;
  placeholder?: string;
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
  placeholder = "Message assistant",
}: Props) => {
  const [language, setLanguage] = useState<string | null>(null);
  const [languagePickerOpen, setLanguagePickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLang");
    if (storedLang) setLanguage(storedLang);
  }, []);

  const handleSelectLanguage = (code: string) => {
    setLanguage(code);
    setLanguagePickerOpen(false);
    localStorage.setItem("preferredLang", code);
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
    return () =>
      window.removeEventListener(
        "focusInputArea",
        focusInputAreaHandler as EventListener
      );
  }, [textareaRef]);

  return (
    <>
      <div className={styles.container}>
        {languagePickerOpen && (
          <div className={styles.languagePicker}>
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                className={styles.langButton}
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
          className={styles.textarea}
          placeholder={placeholder}
          disabled={loading || isListening}
        />

        <MicButton
          lang={language}
          disabled={loading}
          onTranscript={(text) => setInput((prev) => prev + " " + text)}
          onRequestLangSelect={() => setLanguagePickerOpen(true)}
        />

        <SendButton
          disabled={loading || !input.trim()}
          loading={loading}
          onClick={() => handleSendMessage()}
        />

        {isListening && (
          <div className={styles.listeningIndicator}>Listening...</div>
        )}
      </div>

      <div className={styles.footer}>
        <button onClick={resetThread} className={styles.footerButton}>
          <RefreshCw className="h-3 w-3" />
          <span>New conversation</span>
        </button>
      </div>
    </>
  );
};
