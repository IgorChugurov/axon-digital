"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/i18n/config";
import { site } from "@/content/site";
import { setLocale } from "@/i18n/set-locale";
import { Globe } from "lucide-react";

export function LanguageSwitcher({
  current,
  className = "",
}: {
  current: Locale;
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const next: Locale = current === "en" ? "uk" : "en";

  function onToggle() {
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={onToggle}
      className={`inline-flex items-center gap-1 text-base tracking-[-0.32px] text-ink ${className}`}
      aria-label={`Language: ${site.localeLabel[current]}`}
    >
      <Globe className="size-5" aria-hidden />
      {site.localeLabel[current]}
    </button>
  );
}
