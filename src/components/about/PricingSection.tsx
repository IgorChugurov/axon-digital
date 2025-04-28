"use client";

import React from "react";

interface PricingContent {
  title: string;
  items: {
    title: string;
    description: string;
  }[];
}

interface PricingSectionProps {
  content: PricingContent;
}

export default function PricingSection({ content }: PricingSectionProps) {
  return (
    <section className="py-20 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
          {content.title}
        </h2>

        <div className="space-y-12">
          {content.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-start md:gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold mb-4 md:mb-0">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
