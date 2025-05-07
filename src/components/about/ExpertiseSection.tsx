"use client";

import React from "react";
import {
  Stethoscope,
  ShoppingCart,
  Calculator,
  Building,
  Banknote,
  Activity,
  BrainCircuit,
  Bot,
} from "lucide-react";

interface ExpertiseSectionProps {
  content: {
    title: string;
    items: { icon: string; title: string; description: string }[];
  };
}

const iconsMap = {
  stethoscope: Stethoscope,
  shoppingCart: ShoppingCart,
  calculator: Calculator,
  building: Building,
  banknote: Banknote,
  activity: Activity,
  brainCircuit: BrainCircuit,
  bot: Bot,
};

export default function ExpertiseSection({ content }: ExpertiseSectionProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 bg-[#f0f4f9]">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-12 text-center">
        {content.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {content.items.map((item, index) => {
          const Icon = iconsMap[item.icon as keyof typeof iconsMap];
          return (
            <div key={index} className="flex items-start gap-4">
              {Icon && <Icon className="w-6 h-6 text-primary mt-1" />}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
