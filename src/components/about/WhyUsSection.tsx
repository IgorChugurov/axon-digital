"use client";

import { CheckCircle } from "lucide-react";
import React from "react";
import { Brain, Users, ShieldCheck, Handshake } from "lucide-react";

const groupIcons = {
  Brain: Brain,
  Users: Users,
  ShieldCheck: ShieldCheck,
  Handshake: Handshake,
};

interface WhyUsItem {
  title: string;
  description: string;
}

interface WhyUsGroup {
  title: string;
  icon: string;
  items: WhyUsItem[];
}

interface WhyUsContent {
  title: string;
  groups: WhyUsGroup[];
}

interface WhyUsSectionProps {
  content: WhyUsContent;
}

export default function WhyUsSection({ content }: WhyUsSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
          {content.title}
        </h2>

        <div className="space-y-16">
          {content.groups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-2xl font-semibold text-gray-800 mb-8">
                {group.title}
              </h3>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((item, itemIndex) => {
                  const Icon =
                    groupIcons[group.icon as keyof typeof groupIcons];
                  return (
                    <div
                      key={itemIndex}
                      className="flex flex-col bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        {Icon && (
                          <Icon className="w-6 h-6 text-primary mr-2 shrink-0" />
                        )}

                        <h4 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
