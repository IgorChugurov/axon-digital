// useSpeechRecognition.ts
import { useEffect, useRef, useState } from "react";

export interface UseSpeechRecognitionOptions {
  language?: string;
  onTranscript?: (text: string) => void;
}

export function useSpeechRecognition({
  language = "en-US",
  onTranscript,
}: UseSpeechRecognitionOptions) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      if (onTranscript) onTranscript(transcript);
    };

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, [language, onTranscript]);

  const start = () => recognitionRef.current?.start();
  const stop = () => recognitionRef.current?.stop();
  const toggle = () => {
    if (isListening) stop();
    else start();
  };

  return {
    isListening,
    start,
    stop,
    toggle,
  };
}
