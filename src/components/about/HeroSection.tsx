"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./heroSection.module.css";

interface HeroSectionProps {
  content: {
    title: string;
    description: string;
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        skewY: 10,
        rotateX: 30,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
      });

      // gsap.from(titleRef.current, {
      //   opacity: 0,
      //   y: 40,
      //   duration: 1,
      //   ease: "power3.out",
      // });

      gsap.from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center py-16 md:py-24"
    >
      <h1
        ref={titleRef}
        className={`text-4xl md:text-5xl font-bold tracking-tight text-gray-900 ${styles.mainTitle}`}
      >
        {content.title}
      </h1>
      <p
        ref={descRef}
        className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto"
      >
        {content.description}
      </p>
    </section>
  );
}
