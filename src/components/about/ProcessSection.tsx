"use client";

import React from "react";
import Arrow from "../Arrow";

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessSectionProps {
  content: {
    title: string;
    steps: ProcessStep[];
  };
}

export default function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
        {content.title}
      </h2>

      {/* Обрезаем стрелки по ширине карточек */}
      <div className="relative w-fit mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {content.steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm"
              style={{
                transform: index % 2 !== 0 ? "translateY(20px)" : undefined,
              }}
            >
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-primary/10 text-primary font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        {/* Adjusted arrows with smoother S-shaped curves */}
        {/* 1 -> 2: Right curve */}
        <Arrow
          fromX={80}
          fromY={100}
          toX={270}
          toY={120}
          controlX={180}
          controlY={50}
        />
        {/* 2 -> 3: Right curve */}
        <Arrow
          fromX={300}
          fromY={120}
          toX={490}
          toY={100}
          controlX={400}
          controlY={190}
        />
        {/* 3 -> 4: Down-left curve */}
        <Arrow
          fromX={490}
          fromY={130}
          toX={80}
          toY={340}
          controlX={570}
          controlY={200}
          controlX2={150}
          controlY2={290}
        />
        {/* 4 -> 5: Right curve */}
        <Arrow
          fromX={80}
          fromY={370}
          toX={270}
          toY={340}
          controlX={180}
          controlY={410}
        />
        {/* 5 -> 6: Right curve */}
        <Arrow
          fromX={300}
          fromY={340}
          toX={490}
          toY={370}
          controlX={400}
          controlY={290}
        />
        {/* 6 -> 7: Down-left curve */}
        <Arrow
          fromX={490}
          fromY={340}
          toX={270}
          toY={560}
          controlX={570}
          controlY={420}
          controlX2={340}
          controlY2={510}
        />
      </div>

      {/* Мобильная версия */}
      <div className="flex flex-col md:hidden space-y-10 mt-12">
        {content.steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-800 font-semibold mb-2">
              {index + 1}
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-700 text-sm">{step.description}</p>

            {index !== content.steps.length - 1 && (
              <svg
                className="w-6 h-6 text-gray-300 mt-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m0 0l-3-3m3 3l3-3"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
