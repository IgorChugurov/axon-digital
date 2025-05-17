// MicButton.tsx (версия с контролем языка извне)
import { Mic } from "lucide-react";
import { useSpeechRecognition } from "./useSpeechRecognition";
import styles from "./InputArea.module.css";

interface MicButtonProps {
  lang: string | null;
  disabled?: boolean;
  onTranscript: (text: string) => void;
  onRequestLangSelect?: () => void;
}

export function MicButton({
  lang,
  disabled,
  onTranscript,
  onRequestLangSelect,
}: MicButtonProps) {
  const { isListening, toggle } = useSpeechRecognition({
    language: lang || "en-US",
    onTranscript,
  });

  const handleClick = () => {
    if (!lang && onRequestLangSelect) {
      onRequestLangSelect();
      return;
    }
    toggle();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`${styles.iconButton} ${
        isListening ? styles.listenButtonActive : styles.listenButtonInactive
      }`}
    >
      <Mic size={16} strokeWidth={1.5} />
    </button>
  );
}
