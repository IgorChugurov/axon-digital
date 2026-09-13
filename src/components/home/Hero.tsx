"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { chromeCopy } from "@/content/site";
import type { HomeCopy } from "@/content/home";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { buttonClassName } from "@/components/ui/Button";
import { HeroGlobe } from "@/components/home/HeroGlobe";
import { ArrowUpRight } from "lucide-react";

export function Hero({ locale, copy }: { locale: Locale; copy: HomeCopy }) {
  const { open } = useContactModal();
  const chrome = chromeCopy[locale];

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1440px] flex-col items-center justify-center px-4 py-8 text-center md:px-8 lg:py-16">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <HeroGlobe />
        </div>
        <div className="relative z-10 flex max-w-5xl flex-col items-center">
          <p className="text-sm font-medium text-green">{copy.heroEyebrow}</p>
          <h1 className="mt-4 max-w-[18ch] text-balance text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] font-bold tracking-tight text-ink">
            {copy.heroTitle}
          </h1>
          <p className="mt-5 text-pretty text-lg text-muted md:text-xl">
            {copy.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={open}
              className={buttonClassName("orange")}
            >
              {chrome.letsTalk}
              <ArrowUpRight className="size-6" aria-hidden />
            </button>
            <Link href="#services" className={buttonClassName("outline")}>
              {chrome.ourServices}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
