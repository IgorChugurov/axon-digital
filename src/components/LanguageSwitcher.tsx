"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/i18n/config";
import { setLocale } from "@/i18n/set-locale";

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "uk", label: "УКР" },
];

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onSelect(locale: Locale) {
    if (locale === current) {
      return;
    }

    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  }

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium"
      aria-label="Language"
    >
      {options.map((option, index) => (
        <span key={option.value} className="flex items-center gap-1">
          {index > 0 ? (
            <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
              /
            </span>
          ) : null}
          <button
            type="button"
            disabled={isPending}
            onClick={() => onSelect(option.value)}
            className={
              option.value === current
                ? "rounded px-1.5 py-0.5 text-zinc-950 dark:text-zinc-50"
                : "rounded px-1.5 py-0.5 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
            }
            aria-pressed={option.value === current}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
