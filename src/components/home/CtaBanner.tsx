"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { chromeCopy } from "@/content/site";
import type { HomeCopy } from "@/content/home";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { buttonClassName } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

export function CtaBanner({ locale, copy }: { locale: Locale; copy: HomeCopy }) {
  const { open } = useContactModal();

  return (
    <section className="px-4 py-10 md:px-8">
      <div className="relative mx-auto flex max-w-[1376px] flex-col overflow-hidden bg-green px-8 py-16 text-background md:flex-row md:items-center md:justify-between md:px-12 md:py-24">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-tight font-bold tracking-tight">
            {copy.ctaTitle}
          </h2>
          <p className="mt-4 text-lg">{copy.ctaSubtitle}</p>
          <button
            type="button"
            onClick={open}
            className={`${buttonClassName("inverse")} mt-8`}
          >
            {chromeCopy[locale].letsTalk}
            <ArrowUpRight className="size-6" aria-hidden />
          </button>
        </div>
        <Image
          src="/brand/cta-star.svg"
          alt=""
          width={448}
          height={436}
          className="pointer-events-none absolute right-[-40px] bottom-[-80px] w-[min(90%,420px)] md:static md:w-[380px]"
        />
      </div>
    </section>
  );
}
