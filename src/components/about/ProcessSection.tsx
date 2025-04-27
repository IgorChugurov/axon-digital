"use client";

import React from "react";

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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
          {content.title}
        </h2>

        {/* Desktop layout */}
        <div className="hidden md:flex items-start justify-between relative">
          {content.steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center flex-1 px-2"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-800 font-semibold mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-700 text-base">{step.description}</p>

              {index !== content.steps.length - 1 && (
                <div className="absolute top-8 left-0 right-0 flex justify-between pointer-events-none">
                  <div
                    className="flex-1 border-t border-dashed border-gray-300 mx-2"
                    style={{ marginTop: "32px" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col md:hidden space-y-10">
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
      </div>
    </section>
  );
}
