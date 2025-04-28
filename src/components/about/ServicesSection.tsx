"use client";

import React from "react";

interface ServicesSectionProps {
  content: {
    title: string;
    items: { title: string; description: string }[];
  };
}

export default function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Заголовок секции */}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-12 text-center">
        {content.title}
      </h2>

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {content.items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:shadow-md transition duration-300 ease-in-out flex flex-col"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
