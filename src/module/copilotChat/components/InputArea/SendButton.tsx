// SendButton.tsx
import { Loader2, SendHorizontal } from "lucide-react";
import styles from "./InputArea.module.css";

interface SendButtonProps {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}

export function SendButton({ disabled, loading, onClick }: SendButtonProps) {
  const className = `${styles.iconButton} ${
    disabled || loading ? styles.sendButtonInactive : styles.sendButtonActive
  }`;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? (
        <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
      ) : (
        <SendHorizontal size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}
