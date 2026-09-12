"use client";

import { useEffect, useRef } from "react";
import {
  GLOBE_DURATION_MS,
  GLOBE_FILL_EASING,
  GLOBE_PATH_IDS,
  globeFillTracks,
} from "./hero-globe-tracks";

export function HeroGlobe() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    const animations: Animation[] = [];

    fetch("/globus/Layer_1.svg")
      .then((response) => response.text())
      .then((markup) => {
        if (cancelled || !root) return;
        root.innerHTML = markup;
        root.querySelector("svg > g")?.classList.add("hero-globe-spin");
        root.querySelectorAll("svg path").forEach((path, index) => {
          const id = GLOBE_PATH_IDS[index];
          if (id) path.id = id;
        });
        for (const [id, times, fills] of globeFillTracks) {
          const el = root.querySelector(`#${id}`);
          if (!(el instanceof SVGElement)) continue;
          animations.push(
            el.animate(
              times.map((offset, index) => ({
                fill: fills[index],
                offset,
                easing: GLOBE_FILL_EASING[index] ?? "linear",
              })),
              { duration: GLOBE_DURATION_MS, iterations: Infinity },
            ),
          );
        }
      });

    return () => {
      cancelled = true;
      for (const animation of animations) animation.cancel();
    };
  }, []);

  return <div ref={rootRef} className="hero-globe" aria-hidden />;
}
