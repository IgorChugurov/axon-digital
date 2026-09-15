"use client";

import { ArrowUpRight } from "lucide-react";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { buttonClassName } from "@/components/ui/Button";
import { deliveryCopy } from "@/content/delivery";
import { chromeCopy } from "@/content/site";
import type { Locale } from "@/i18n/config";

export function DeliveryPage({ locale }: { locale: Locale }) {
  const { open } = useContactModal();
  const copy = deliveryCopy[locale];

  return (
    <>
      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col items-start gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
              {copy.eyebrow}
            </p>
            <h1 className="max-w-[20ch] text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.04em] text-ink">
              {copy.title}
            </h1>
          </div>
          <p className="max-w-[793px] text-pretty text-[24px] leading-[1.15] tracking-[-0.72px] text-[#676767] lg:text-[32px] lg:tracking-[-1.28px]">
            {copy.lead}
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
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto grid max-w-[1376px] gap-12 lg:grid-cols-[443px_minmax(0,676px)] lg:justify-between">
          <h2 className="text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {copy.problemTitle}
          </h2>
          <ul className="border-b border-muted">
            {copy.problems.map((item) => (
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
          <h2 className="px-8 max-w-[18ch] text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {copy.chainTitle}
          </h2>
          <ol className="border-b border-muted">
            {copy.chain.map((link, index) => (
              <li
                key={link.title}
                className="grid gap-4 border-t border-muted px-8 py-8 lg:grid-cols-[93px_443px_minmax(0,560px)] lg:gap-[48px]"
              >
                <span className="text-[32px] leading-[1.1] tracking-[-1.28px] text-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-balance text-[28px] leading-[1.1] tracking-[-1.12px] lg:text-[32px]">
                  {link.title}
                </h3>
                <p className="text-pretty text-[16px] leading-[1.3] tracking-[-0.32px] text-[#676767]">
                  {link.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col gap-12">
          <h2 className="max-w-[18ch] text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {copy.checksTitle}
          </h2>
          <ul className="grid gap-4 lg:grid-cols-2">
            {copy.checks.map((check) => (
              <li
                key={check.title}
                className="flex flex-col gap-4 bg-cream p-8"
              >
                <h3 className="text-balance text-[28px] leading-[1.1] tracking-[-1.12px] lg:text-[32px]">
                  {check.title}
                </h3>
                <p className="text-pretty text-[16px] leading-[1.3] tracking-[-0.32px] text-[#676767]">
                  {check.description}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 border-t border-muted pt-8 lg:flex-row lg:gap-[48px]">
            <h3 className="lg:w-[443px] lg:shrink-0 text-balance text-[28px] leading-[1.1] tracking-[-1.12px] lg:text-[32px]">
              {copy.fixTitle}
            </h3>
            <p className="max-w-[676px] text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-[#676767] lg:text-[24px]">
              {copy.fixBody}
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col gap-8 bg-cream px-8 py-12 lg:px-12 lg:py-16">
          <h2 className="max-w-[24ch] text-balance text-[28px] leading-[1.1] tracking-[-1.12px] lg:text-[40px]">
            {copy.exampleTitle}
          </h2>
          <dl className="grid gap-8 lg:grid-cols-2 lg:gap-x-[48px]">
            <div className="flex flex-col gap-2">
              <dt className="text-[16px] leading-[1.2] tracking-[-0.32px] text-green">
                {copy.exampleLabels.goal}
              </dt>
              <dd className="text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-ink">
                {copy.example.goal}
              </dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-[16px] leading-[1.2] tracking-[-0.32px] text-green">
                {copy.exampleLabels.why}
              </dt>
              <dd className="text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-ink">
                {copy.example.why}
              </dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-[16px] leading-[1.2] tracking-[-0.32px] text-green">
                {copy.exampleLabels.steps}
              </dt>
              <dd>
                <ol className="flex flex-col gap-2">
                  {copy.example.steps.map((step, index) => (
                    <li
                      key={step}
                      className="flex gap-3 text-pretty text-[16px] leading-[1.3] tracking-[-0.32px] text-[#676767]"
                    >
                      <span className="shrink-0 text-orange">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-[16px] leading-[1.2] tracking-[-0.32px] text-green">
                {copy.exampleLabels.rules}
              </dt>
              <dd>
                <ul className="flex flex-col gap-2">
                  {copy.example.rules.map((rule) => (
                    <li
                      key={rule}
                      className="flex gap-3 text-pretty text-[16px] leading-[1.3] tracking-[-0.32px] text-[#676767]"
                    >
                      <span className="shrink-0 text-orange" aria-hidden>
                        —
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto grid max-w-[1376px] gap-12 lg:grid-cols-[443px_minmax(0,676px)] lg:justify-between">
          <h2 className="text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {copy.toolsTitle}
          </h2>
          <p className="text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-[#676767] lg:text-[24px]">
            {copy.toolsBody}
          </p>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto grid max-w-[1376px] gap-12 lg:grid-cols-[443px_minmax(0,676px)] lg:justify-between">
          <h2 className="text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {copy.boundariesTitle}
          </h2>
          <div className="flex flex-col gap-6">
            {copy.boundaries.map((item) => (
              <p
                key={item}
                className="text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-[#676767] lg:text-[24px]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto grid max-w-[1376px] gap-12 lg:grid-cols-[443px_minmax(0,676px)] lg:justify-between">
          <h2 className="text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {copy.circuitTitle}
          </h2>
          <p className="text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-[#676767] lg:text-[24px]">
            {copy.circuitBody}
          </p>
        </div>
      </section>

      <section className="py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <h2 className="px-8 max-w-[18ch] text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {copy.outcomesTitle}
          </h2>
          <ul className="border-b border-muted">
            {copy.outcomes.map((item, index) => (
              <li
                key={item}
                className="grid gap-4 border-t border-muted px-8 py-8 lg:grid-cols-[93px_minmax(0,1003px)] lg:gap-[48px]"
              >
                <span className="text-[32px] leading-[1.1] tracking-[-1.28px] text-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-pretty text-[24px] leading-[1.15] tracking-[-0.72px] text-ink lg:text-[32px] lg:tracking-[-1.28px]">
                  {item}
                </p>
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
