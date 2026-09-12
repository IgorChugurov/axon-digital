"use client";

import { motion } from "motion/react";
import type { HomeCopy } from "@/content/home";

const FILL_FROM = "#C3C3C3";
const FILL_TO = "#101010";

type WordToken = { type: "word"; text: string; index: number };
type StampToken = { type: "stamp"; src: string };
type ApproachToken = WordToken | StampToken;

function splitWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function approachTokens(copy: HomeCopy): ApproachToken[] {
  const tokens: ApproachToken[] = [];
  let index = 0;

  for (const text of splitWords(copy.approachLead)) {
    tokens.push({ type: "word", text, index: index++ });
  }
  tokens.push({ type: "stamp", src: "/icons/approach-rocket.svg" });
  for (const text of splitWords(copy.approachBodyBefore)) {
    tokens.push({ type: "word", text, index: index++ });
  }
  tokens.push({ type: "stamp", src: "/icons/approach-eye.svg" });
  for (const text of splitWords(copy.approachBodyAfter)) {
    tokens.push({ type: "word", text, index: index++ });
  }

  return tokens;
}

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const wordVariants = {
  hidden: { color: FILL_FROM },
  visible: {
    color: FILL_TO,
    transition: {
      duration: 0.22,
      ease: [0.3, 0, 0.5, 1] as const,
    },
  },
};

function AnimatedWord({ text }: { text: string }) {
  return (
    <motion.span className="whitespace-nowrap" variants={wordVariants}>
      {text}
    </motion.span>
  );
}

export function Approach({ copy }: { copy: HomeCopy }) {
  const tokens = approachTokens(copy);

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-8 py-[92px] lg:py-[184px]">
      <p className="text-center text-[16px] leading-[1.1] tracking-[-0.64px] text-green">
        {copy.approachEyebrow}
      </p>
      <motion.div
        className="flex max-w-[1376px] flex-wrap items-center justify-center gap-x-4 text-[clamp(2rem,4.45vw,4rem)] leading-[1.1] tracking-[-0.03em]"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {tokens.map((token, i) =>
          token.type === "word" ? (
            <AnimatedWord key={`${token.text}-${token.index}`} text={token.text} />
          ) : (
            <img
              key={`${token.src}-${i}`}
              src={token.src}
              alt=""
              width={56}
              height={56}
              className="size-10 shrink-0 md:size-14"
              aria-hidden
            />
          ),
        )}
      </motion.div>
    </section>
  );
}
