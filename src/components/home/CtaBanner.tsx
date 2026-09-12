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
    <section className="px-8">
      <div className="relative mx-auto h-auto w-full max-w-[1376px] overflow-hidden bg-green px-12 py-16 text-background min-[1440px]:h-[580px]">
        <div className="relative z-10 flex w-full min-w-0 max-w-[676px] flex-col items-start gap-12">
          <div className="flex w-full min-w-0 flex-col gap-4">
            <h2 className="w-full min-w-0 break-words text-[32px] leading-[1.2] tracking-[-0.04em] lg:text-[64px] lg:tracking-[-2.56px]">
              {copy.ctaTitle}
            </h2>
            <p className="w-full min-w-0 break-words text-[24px] leading-[1.2] tracking-[-0.04em] lg:text-[32px] lg:tracking-[-1.28px]">
              {copy.ctaSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={open}
            className={buttonClassName(
              "inverse",
              "px-6 text-[16px] tracking-[-0.32px]",
            )}
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
          className="pointer-events-none absolute top-[72px] left-[880px] hidden h-[436px] w-[448px] min-[1440px]:block"
        />
      </div>
    </section>
  );
}
