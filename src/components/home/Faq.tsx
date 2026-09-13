"use client";

import { useState } from "react";
import type { HomeCopy } from "@/content/home";
import { Plus, X } from "lucide-react";

export function Faq({ copy }: { copy: HomeCopy }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="flex flex-col gap-16 px-8 py-[60px] lg:py-[120px]">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
          {copy.faqEyebrow}
        </p>
        <h2 className="max-w-[18ch] text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.2] tracking-[-0.04em] text-ink">
          {copy.faqTitle}
        </h2>
      </div>

      <ul className="mx-auto w-full max-w-[1376px]">
        {copy.faq.map((item) => {
          const isOpen = openId === item.id;
          return (
            <li key={item.id} className="border-b border-[#676767]">
              <button
                type="button"
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenId((current) => (current === item.id ? null : item.id))
                }
              >
                <span className="flex min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <span className="flex items-center gap-6 lg:w-[561px] lg:shrink-0">
                    <StarIcon active={isOpen} />
                    <span className="text-balance text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.1] tracking-[-0.04em] text-ink">
                      {item.question}
                    </span>
                  </span>
                  {isOpen ? (
                    <span className="text-pretty text-[16px] leading-6 tracking-[-0.64px] text-[#676767] lg:w-[560px] lg:pt-1">
                      {item.answer}
                    </span>
                  ) : null}
                </span>
                {isOpen ? (
                  <X className="size-8 shrink-0 text-green" aria-hidden />
                ) : (
                  <Plus className="size-8 shrink-0 text-green" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function StarIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-8 shrink-0"
      aria-hidden
    >
      <path
        d="M20.528 14.1088L32 16L20.528 17.8912C19.1744 18.1152 18.112 19.1744 17.8912 20.528L16 32L14.1088 20.528C13.8848 19.1744 12.8256 18.112 11.472 17.8912L0 16L11.472 14.1088C12.8256 13.8848 13.888 12.8256 14.1088 11.472L16 0L17.8912 11.472C18.1152 12.8256 19.1744 13.888 20.528 14.1088Z"
        fill={active ? "#EC6206" : "#101010"}
      />
    </svg>
  );
}
