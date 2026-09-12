"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { chromeCopy } from "@/content/site";
import type { HomeCopy } from "@/content/home";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { buttonClassName } from "@/components/ui/Button";
import { ArrowUpRight, Plus, X } from "lucide-react";

export function Services({ locale, copy }: { locale: Locale; copy: HomeCopy }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const { open } = useContactModal();
  const letsTalk = chromeCopy[locale].letsTalk;

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
        <h2 className="max-w-[750px] text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.2] tracking-[-0.04em] text-ink">
          {copy.servicesTitle}
        </h2>
      </div>

      <ul className="mx-auto w-full max-w-[1440px]">
        {copy.services.map((item, index) => {
          const isOpen = openId === item.id;
          const prevOpen =
            index > 0 && openId === copy.services[index - 1].id;
          const showDivider = !isOpen && index > 0 && !prevOpen;

          return (
            <li
              key={item.id}
              className={`relative overflow-hidden ${
                isOpen ? "bg-orange text-background" : "bg-background text-ink"
              } ${showDivider ? "border-t border-muted" : ""}`}
            >
              {isOpen ? (
                <img
                  src="/icons/process-orbit.svg"
                  alt=""
                  width={311}
                  height={311}
                  className="pointer-events-none absolute top-[85px] right-0 size-[311px]"
                  aria-hidden
                />
              ) : null}

              <div className="relative z-10 flex flex-col gap-6 p-8">
                <button
                  type="button"
                  className={`flex w-full gap-4 text-left ${
                    isOpen ? "items-start" : "items-center"
                  } justify-between`}
                  aria-expanded={isOpen}
                  onClick={() => toggle(item.id)}
                >
                  <span
                    className={`flex min-w-0 flex-1 ${
                      isOpen
                        ? "flex-col gap-6 lg:flex-row lg:items-start lg:gap-6"
                        : "items-center gap-4 lg:gap-[140px]"
                    }`}
                  >
                    <span
                      className={`flex min-w-0 ${
                        isOpen
                          ? "items-center gap-4 lg:w-[676px] lg:shrink-0 lg:gap-[140px]"
                          : "items-center gap-4 lg:gap-[140px]"
                      }`}
                    >
                      <span className="shrink-0 text-[32px] leading-[1.1] tracking-[-1.28px] lg:w-[93px]">
                        {item.id}
                      </span>
                      <span className="min-w-0 text-[24px] leading-[1.1] tracking-[-1.28px] lg:text-[32px]">
                        {item.title}
                      </span>
                    </span>
                    {isOpen ? (
                      <span className="max-w-[443px] text-[16px] leading-[1.1] tracking-[-0.32px] lg:pt-2">
                        {item.body}
                      </span>
                    ) : null}
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

                {isOpen ? (
                  <div className="lg:pl-[233px]">
                    <button
                      type="button"
                      onClick={open}
                      className={buttonClassName("inverse")}
                    >
                      {letsTalk}
                      <ArrowUpRight className="size-6" aria-hidden />
                    </button>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
