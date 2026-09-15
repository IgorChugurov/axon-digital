"use client";

import { ArrowUpRight } from "lucide-react";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { buttonClassName } from "@/components/ui/Button";
import { chromeCopy } from "@/content/site";
import type { Locale } from "@/i18n/config";

export function ContactCta({
  locale,
  title,
  body,
}: {
  locale: Locale;
  title: string;
  body: string;
}) {
  const { open } = useContactModal();

  return (
    <section className="px-8 py-[60px] lg:py-[120px]">
      <div className="mx-auto flex max-w-[1376px] flex-col items-start gap-10 bg-green px-8 py-12 text-background lg:px-12 lg:py-16">
        <div className="flex max-w-[793px] flex-col gap-4">
          <h2 className="text-balance text-[32px] leading-[1.1] tracking-[-0.04em] lg:text-[64px]">
            {title}
          </h2>
          <p className="text-pretty text-[24px] leading-[1.2] tracking-[-0.04em] lg:text-[32px]">
            {body}
          </p>
        </div>
        <button
          type="button"
          onClick={open}
          className={buttonClassName("inverse")}
        >
          {chromeCopy[locale].letsTalk}
          <ArrowUpRight className="size-6" aria-hidden />
        </button>
      </div>
    </section>
  );
}
