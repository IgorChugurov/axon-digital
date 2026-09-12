"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { HomeCopy } from "@/content/home";

export function HowWeWork({ copy }: { copy: HomeCopy }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const [progress, setProgress] = useState({ ratio: 0, thumb: 0.24 });

  const updateProgress = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    const thumb = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
    setProgress({ ratio, thumb: Math.min(1, Math.max(0.2, thumb)) });
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section className="flex flex-col gap-16 py-[60px] lg:py-[120px]">
      <div className="flex flex-col items-center gap-2 px-8">
        <p className="text-center text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
          {copy.processEyebrow}
        </p>
        <h2 className="text-center text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.2] tracking-[-0.04em] text-ink">
          {copy.processTitle}
        </h2>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div
          ref={scrollerRef}
          className="w-full cursor-grab overflow-x-auto px-8 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          onScroll={updateProgress}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="flex w-max items-center p-2">
            {copy.processSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`relative h-[502px] w-[442px] shrink-0 ${
                  index === copy.processSlides.length - 1 ? "" : "-mr-2"
                }`}
                style={{ zIndex: index + 1 }}
              >
                <article
                  className={`absolute top-1/2 left-1/2 h-[470px] w-[410px] -translate-x-1/2 -translate-y-1/2 overflow-hidden text-background select-none ${
                    slide.tone === "orange" ? "bg-orange" : "bg-green rotate-3"
                  }`}
                >
                  {slide.tone === "orange" ? (
                    <img
                      src="/icons/process-orbit.svg"
                      alt=""
                      width={311}
                      height={311}
                      className="pointer-events-none absolute top-[231px] left-[171px] size-[311px]"
                      aria-hidden
                    />
                  ) : null}
                  <p className="absolute top-8 right-8 text-[216px] leading-[0.7] tracking-[-8.64px]">
                    {slide.id}
                  </p>
                  <p className="absolute bottom-8 left-8 text-[32px] leading-[48px] tracking-[-0.96px]">
                    {slide.title}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-1.5 w-[min(100%-4rem,442px)] overflow-hidden rounded-lg bg-[#ece8df]">
          <div
            className="absolute inset-y-0 rounded-lg bg-orange"
            style={{
              width: `${progress.thumb * 100}%`,
              left: `${progress.ratio * (1 - progress.thumb) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
