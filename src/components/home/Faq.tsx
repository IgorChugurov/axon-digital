"use client";

import { useState } from "react";
import type { HomeCopy } from "@/content/home";
import { Plus, X } from "lucide-react";

export function Faq({ copy }: { copy: HomeCopy }) {
  const [openId, setOpenId] = useState("architecture");

  return (
    <section className="px-4 py-20 md:px-8">
      <p className="text-center text-sm font-medium text-green">
        {copy.faqEyebrow}
      </p>
      <h2 className="mt-2 text-center text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight">
        {copy.faqTitle}
      </h2>
      <ul className="mx-auto mt-14 max-w-[1376px] divide-y divide-muted/40 border-y border-muted/40">
        {copy.faq.map((item) => {
          const isOpen = openId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                className="flex w-full items-start gap-4 py-6 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpenId(item.id)}
              >
                <StarIcon />
                <span className="flex-1">
                  <span className="block text-xl font-medium md:text-2xl">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <span className="mt-4 block max-w-2xl text-base leading-6 text-muted">
                      {item.answer}
                    </span>
                  ) : null}
                </span>
                <span className="text-ink">
                  {isOpen ? (
                    <X className="size-8" aria-hidden />
                  ) : (
                    <Plus className="size-8" aria-hidden />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 32 32" className="mt-1 size-8 shrink-0" aria-hidden>
      <path
        d="M20.528 14.1088L32 16L20.528 17.8912C19.1744 18.1152 18.112 19.1744 17.8912 20.528L16 32L14.1088 20.528C13.8848 19.1744 12.8256 18.112 11.472 17.8912L0 16L11.472 14.1088C12.8256 13.8848 13.888 12.8256 14.1088 11.472L16 0L17.8912 11.472C18.1152 12.8256 19.1744 13.888 20.528 14.1088Z"
        fill="#EC6206"
      />
    </svg>
  );
}
