"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n/config";
import { chromeCopy } from "@/content/site";
import { HeroGlobe } from "@/components/home/HeroGlobe";
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
      {isOpen ? <ContactModal locale={locale} onClose={close} /> : null}
    </ContactModalContext.Provider>
  );
}

function ContactModal({
  locale,
  onClose,
}: {
  locale: Locale;
  onClose: () => void;
}) {
  const copy = chromeCopy[locale];
  const titleId = useId();
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const isSubmitting = submissionState === "submitting";

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
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
  }, [isSubmitting, onClose]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmissionState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed.");
      }

      form.reset();
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
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
            {submissionState === "success"
              ? copy.modalSuccessTitle
              : copy.modalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-muted hover:text-ink"
            aria-label={copy.closeModal}
          >
            <X className="size-8" aria-hidden />
          </button>
        </div>

        {submissionState === "success" ? (
          <div role="status" className="text-ink">
            <p className="text-pretty text-muted">{copy.modalSuccessMessage}</p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            aria-busy={isSubmitting}
            onSubmit={onSubmit}
          >
            <fieldset
              disabled={isSubmitting}
              className="flex flex-col gap-4"
            >
              <Field
                label={copy.modalName}
                name="name"
                autoComplete="name"
                minLength={2}
                maxLength={120}
                required
              />
              <Field
                label={copy.modalEmail}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
              <Field
                label={copy.modalPhone}
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={50}
              />
              <Field
                label={copy.modalMessage}
                name="message"
                minLength={10}
                maxLength={5000}
                required
                multiline
              />
              {submissionState === "error" ? (
                <p role="alert" className="text-pretty text-sm text-orange">
                  {copy.modalError}
                </p>
              ) : null}
              <button
                type="submit"
                className={`${buttonClassName("orange")} mt-2`}
              >
                {copy.modalSubmit}
                <ArrowUpRight className="size-6" aria-hidden />
              </button>
            </fieldset>
          </form>
        )}
      </div>

      {isSubmitting ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/75 backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">{copy.modalSending}</span>
          <div className="origin-center scale-50">
            <HeroGlobe />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  minLength,
  maxLength,
  required = false,
  multiline = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  multiline?: boolean;
}) {
  const id = useId();
  const fieldClass =
    "w-full border border-muted/50 bg-cream px-3 py-3 text-ink outline-none focus:border-green";

  return (
    <label className="flex flex-col gap-1.5 text-sm text-muted" htmlFor={id}>
      {label}
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          className={fieldClass}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          className={fieldClass}
        />
      )}
    </label>
  );
}
