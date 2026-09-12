"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n/config";
import { chromeCopy } from "@/content/site";
import { buttonClassName } from "@/components/ui/Button";
import { ArrowUpRight, X } from "lucide-react";

type ContactModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(
  null,
);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return ctx;
}

export function ContactModalProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactModal locale={locale} isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}

function ContactModal({
  locale,
  isOpen,
  onClose,
}: {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
}) {
  const copy = chromeCopy[locale];
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/50"
        aria-label={copy.closeModal}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg border border-muted/40 bg-background p-8 shadow-xl"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-bold text-ink">
            {copy.modalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-ink"
            aria-label={copy.closeModal}
          >
            <X className="size-8" aria-hidden />
          </button>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <Field label={copy.modalName} name="name" />
          <Field label={copy.modalEmail} name="email" type="email" />
          <Field label={copy.modalPhone} name="phone" type="tel" />
          <Field label={copy.modalMessage} name="message" multiline />
          <button type="submit" className={`${buttonClassName("orange")} mt-2`}>
            {copy.modalSubmit}
            <ArrowUpRight className="size-6" aria-hidden />
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  multiline = false,
}: {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
}) {
  const id = useId();
  const fieldClass =
    "w-full border border-muted/50 bg-cream px-3 py-3 text-ink outline-none focus:border-green";

  return (
    <label className="flex flex-col gap-1.5 text-sm text-muted" htmlFor={id}>
      {label}
      {multiline ? (
        <textarea id={id} name={name} rows={4} className={fieldClass} />
      ) : (
        <input id={id} name={name} type={type} className={fieldClass} />
      )}
    </label>
  );
}
