"use client";

import Link from "next/link";

const expertiseCards = [
  {
    slug: "fintech-financial",
    icon: "💰",
    title: "Fintech & Financial Services",
    short: "Payment systems, banking, compliance solutions.",
  },
  {
    slug: "healthcare-medtech",
    icon: "⚕",
    title: "Healthcare & Medical Technology",
    short: "EHR, telemedicine, clinical workflows.",
  },
  {
    slug: "ecommerce-retail",
    icon: "💼",
    title: "E-commerce & Retail Technology",
    short: "Online stores, marketplaces, inventory management.",
  },
  {
    slug: "education-edtech",
    icon: "📊",
    title: "Education & Learning Platforms",
    short: "LMS, student systems, corporate training.",
  },
  {
    slug: "proptech-realestate",
    icon: "🏢",
    title: "Real Estate & Property Technology",
    short: "Property management, smart buildings, tenant portals.",
  },
  {
    slug: "enterprise-corporate",
    icon: "📈",
    title: "Enterprise & Corporate Solutions",
    short: "ERP, CRM, large-scale business applications.",
  },
];

export function MoreExpertise({ current }: { current: string }) {
  const other = expertiseCards.filter((x) => x.slug !== current);

  return (
    <section className="bg-gray-50 border-t mt-24 py-10 px-4 sm:px-6 md:px-8">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        More Areas of Expertise
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {other.map(({ slug, icon, title }) => (
          <Link
            key={slug}
            href={`/expertise/${slug}`}
            className="flex items-center gap-2 px-4 py-3 bg-white rounded-md border border-gray-200 hover:shadow transition"
          >
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-medium text-gray-800">{title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
