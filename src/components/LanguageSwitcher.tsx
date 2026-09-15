"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeHref, stripLocale, type Locale } from "@/i18n/config";
import { site } from "@/content/site";
import { Globe } from "lucide-react";

export function LanguageSwitcher({
  current,
  className = "",
}: {
  current: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const next: Locale = current === "en" ? "uk" : "en";

  return (
    <Link
      href={localeHref(next, stripLocale(pathname))}
      hrefLang={next}
      className={`inline-flex items-center gap-1 text-base tracking-[-0.32px] text-ink ${className}`}
      aria-label={`Language: ${site.localeLabel[next]}`}
    >
      <Globe className="size-5" aria-hidden />
      {site.localeLabel[next]}
    </Link>
  );
}
