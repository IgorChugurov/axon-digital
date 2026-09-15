"use client";

import Link from "next/link";
import { useState } from "react";
import { localeHref, type Locale } from "@/i18n/config";
import { chromeCopy } from "@/content/site";
import type { HomeCopy } from "@/content/home";
import { services, servicesPageCopy } from "@/content/services";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { buttonClassName } from "@/components/ui/Button";
import { ArrowUpRight, Plus, X } from "lucide-react";

export function Services({ locale, copy }: { locale: Locale; copy: HomeCopy }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const { open } = useContactModal();
  const letsTalk = chromeCopy[locale].letsTalk;
  const serviceUi = servicesPageCopy[locale];
  const items = services.map((service) => ({
    id: service.id,
    slug: service.slug,
    ...service.copy[locale],
  }));

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section
      id="services"
      className="scroll-mt-24 flex flex-col items-center gap-16 py-[60px] lg:py-[120px]"
    >
      <div className="flex w-full max-w-[1440px] flex-col items-center gap-2 px-8 text-center">
        <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
          {copy.servicesEyebrow}
        </p>
        <h2 className="max-w-[750px] text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.2] tracking-[-0.04em] text-ink">
          {copy.servicesTitle}
        </h2>
      </div>

      <ul className="mx-auto w-full max-w-[1440px]">
        {items.map((item, index) => {
          const isOpen = openId === item.id;
          const prevOpen = index > 0 && openId === items[index - 1].id;
          const showDivider = !isOpen && index > 0 && !prevOpen;

          return (
            <li
              key={item.id}
              className={`relative overflow-hidden transition-colors duration-200 ease-out ${
                isOpen ? "bg-orange text-background" : "bg-background text-ink"
              } ${showDivider ? "border-t border-muted" : ""}`}
            >
              <img
                src="/icons/process-orbit.svg"
                alt=""
                width={311}
                height={311}
                className={`pointer-events-none absolute top-[85px] right-0 size-[311px] transition-opacity duration-200 ease-out ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              />

              <div className="relative z-10 flex flex-col p-8">
                <button
                  type="button"
                  className={`flex w-full gap-4 text-left ${
                    isOpen ? "items-start" : "items-center"
                  } justify-between`}
                  aria-expanded={isOpen}
                  onClick={() => toggle(item.id)}
                >
                  <span
                    className="flex min-w-0 flex-1 flex-col lg:flex-row lg:items-start lg:gap-6"
                  >
                    <span className="flex min-w-0 items-center gap-4 lg:w-[676px] lg:shrink-0 lg:gap-[140px]">
                      <span className="shrink-0 text-[32px] leading-[1.1] tracking-[-1.28px] lg:w-[93px]">
                        {item.id}
                      </span>
                      <span className="min-w-0 text-balance text-[24px] leading-[1.1] tracking-[-1.28px] lg:text-[32px]">
                        {item.title}
                      </span>
                    </span>
                    <span
                      aria-hidden={!isOpen}
                      className={`grid w-full max-w-[443px] transition-[grid-template-rows,opacity] duration-200 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="min-h-0 overflow-hidden pt-6 text-pretty text-[16px] leading-[1.1] tracking-[-0.32px] lg:pt-2">
                        {item.summary}
                      </span>
                    </span>
                  </span>
                  {isOpen ? (
                    <X className="size-8 shrink-0" aria-hidden />
                  ) : (
                    <Plus
                      className="size-8 shrink-0 text-green"
                      aria-hidden
                    />
                  )}
                </button>

                <div
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="flex flex-wrap gap-3 pt-6 lg:pl-[233px]">
                      <Link
                        href={localeHref(locale, `/services/${item.slug}`)}
                        tabIndex={isOpen ? 0 : -1}
                        className={buttonClassName("inverse")}
                      >
                        {serviceUi.openService}
                        <ArrowUpRight className="size-6" aria-hidden />
                      </Link>
                      <button
                        type="button"
                        onClick={open}
                        tabIndex={isOpen ? 0 : -1}
                        className={buttonClassName("inverse")}
                      >
                        {letsTalk}
                        <ArrowUpRight className="size-6" aria-hidden />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
