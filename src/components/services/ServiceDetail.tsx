"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { buttonClassName } from "@/components/ui/Button";
import { chromeCopy } from "@/content/site";
import {
  services,
  servicesPageCopy,
  type Service,
} from "@/content/services";
import { localeHref, type Locale } from "@/i18n/config";

export function ServiceDetail({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  const { open } = useContactModal();
  const copy = service.copy[locale];
  const pageCopy = servicesPageCopy[locale];
  const related = service.related
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is Service => Boolean(item));

  return (
    <>
      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col gap-12">
          <Link
            href={localeHref(locale, "/services")}
            className="inline-flex w-fit items-center gap-2 text-[16px] text-green transition-colors hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            <ArrowLeft className="size-5" aria-hidden />
            {pageCopy.back}
          </Link>

          <div className="flex max-w-[960px] flex-col items-start gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
                {pageCopy.eyebrow} / {service.id}
              </p>
              <h1 className="text-balance text-[clamp(2rem,6vw,5rem)] leading-[1.05] tracking-[-0.04em] text-ink">
                {copy.title}
              </h1>
            </div>
            <p className="max-w-[793px] text-pretty text-[24px] leading-[1.15] tracking-[-0.72px] text-[#676767] lg:text-[32px] lg:tracking-[-1.28px]">
              {copy.hero}
            </p>
            <button
              type="button"
              onClick={open}
              className={buttonClassName("green")}
            >
              {chromeCopy[locale].letsTalk}
              <ArrowUpRight className="size-6" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto grid max-w-[1376px] gap-12 lg:grid-cols-[443px_minmax(0,676px)] lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
              {pageCopy.eyebrow}
            </p>
            <h2 className="text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
              {pageCopy.whenNeeded}
            </h2>
          </div>
          <ul className="border-b border-muted">
            {copy.whenNeeded.map((item) => (
              <li
                key={item}
                className="border-t border-muted py-6 text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-[#676767] lg:text-[24px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="px-8">
            <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
              {pageCopy.eyebrow}
            </p>
            <h2 className="mt-2 max-w-[18ch] text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
              {pageCopy.included}
            </h2>
          </div>
          <ul className="border-b border-muted">
            {copy.included.map((item, index) => (
              <li
                key={item.title}
                className="grid gap-4 border-t border-muted px-8 py-8 lg:grid-cols-[93px_443px_minmax(0,560px)] lg:gap-[48px]"
              >
                <span className="text-[32px] leading-[1.1] tracking-[-1.28px] text-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-balance text-[28px] leading-[1.1] tracking-[-1.12px] lg:text-[32px]">
                  {item.title}
                </h3>
                <p className="text-pretty text-[16px] leading-[1.3] tracking-[-0.32px] text-[#676767]">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-12 py-[60px] lg:py-[120px]">
        <div className="px-8 text-center">
          <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
            {pageCopy.eyebrow}
          </p>
          <h2 className="mt-2 text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {pageCopy.process}
          </h2>
        </div>
        <div className="overflow-x-auto px-8 pb-4">
          <ol className="mx-auto flex w-max max-w-none gap-4 min-[1440px]:w-full min-[1440px]:max-w-[1376px]">
            {copy.process.map((step, index) => (
              <li
                key={step.title}
                className="flex min-h-[360px] w-[min(82vw,360px)] shrink-0 flex-col justify-between bg-cream p-8 min-[1440px]:min-w-0 min-[1440px]:flex-1"
              >
                <span className="text-[72px] leading-none tracking-[-0.04em] text-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-4">
                  <h3 className="text-balance text-[28px] leading-[1.1] tracking-[-1.12px] min-[1440px]:text-[24px]">
                    {step.title}
                  </h3>
                  <p className="text-pretty text-[16px] leading-[1.3] tracking-[-0.32px] text-[#676767]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-8 pb-[60px] lg:pb-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col gap-6 border-t border-muted pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-[48px]">
          <p className="max-w-[793px] text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-[#676767] lg:text-[24px]">
            {pageCopy.deliveryNote}
          </p>
          <Link
            href={localeHref(locale, "/delivery")}
            className="inline-flex shrink-0 items-center gap-2 text-[20px] leading-none tracking-[-0.4px] text-green transition-colors hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            {pageCopy.deliveryLink}
            <ArrowUpRight className="size-6" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="px-8 py-[60px] text-center lg:py-[120px]">
        <div className="mx-auto flex max-w-[793px] flex-col items-center gap-6">
          <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
            {pageCopy.eyebrow}
          </p>
          <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {pageCopy.result}
          </h2>
          <p className="text-pretty text-[24px] leading-[1.15] tracking-[-0.72px] text-[#676767] lg:text-[32px] lg:tracking-[-1.28px]">
            {copy.result}
          </p>
        </div>
      </section>

      <section className="py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <h2 className="px-8 text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {pageCopy.related}
          </h2>
          <ul className="border-b border-muted">
            {related.map((item) => (
              <li key={item.slug} className="border-t border-muted">
                <Link
                  href={localeHref(locale, `/services/${item.slug}`)}
                  className="group flex items-center justify-between gap-6 px-8 py-8 transition-colors hover:bg-orange hover:text-background focus-visible:bg-orange focus-visible:text-background focus-visible:outline-none"
                >
                  <span className="flex min-w-0 items-center gap-6 lg:gap-[140px]">
                    <span className="text-[32px] leading-[1.1] tracking-[-1.28px]">
                      {item.id}
                    </span>
                    <span className="text-balance text-[24px] leading-[1.1] tracking-[-0.04em] lg:text-[32px]">
                      {item.copy[locale].title}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-8 shrink-0 text-green group-hover:text-background group-focus-visible:text-background"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col items-start gap-10 bg-green px-8 py-12 text-background lg:px-12 lg:py-16">
          <div className="flex max-w-[793px] flex-col gap-4">
            <h2 className="text-balance text-[32px] leading-[1.1] tracking-[-0.04em] lg:text-[64px]">
              {copy.ctaTitle}
            </h2>
            <p className="text-pretty text-[24px] leading-[1.2] tracking-[-0.04em] lg:text-[32px]">
              {copy.ctaBody}
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
    </>
  );
}
