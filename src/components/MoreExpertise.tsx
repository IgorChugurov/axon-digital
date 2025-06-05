"use client";

import Link from "next/link";

const expertiseCards = [
  {
    slug: "llm-workflows",
    icon: "🧠",
    title: "LLM-Powered Workflows",
    short: "AI copilots, automation, and semantic tools.",
  },
  {
    slug: "ai-assistants",
    icon: "🤖",
    title: "AI Assistants for Web & CRM",
    short: "Smart bots and in-app guidance tools.",
  },
  {
    slug: "healthcare-digitalization",
    icon: "🩺",
    title: "Healthcare Digitalization",
    short: "EHR, clinic dashboards, secure portals.",
  },
  {
    slug: "ecommerce-platforms",
    icon: "🛒",
    title: "E-commerce Platforms",
    short: "Custom shops, payments, logistics flows.",
  },
  {
    slug: "accounting-automation",
    icon: "🧮",
    title: "Accounting Automation",
    short: "Tax, payroll, ledger tools with full traceability.",
  },
  {
    slug: "property-management",
    icon: "🏢",
    title: "Property & Tenant Management",
    short: "CRMs for leases, tenants, smart buildings.",
  },
  {
    slug: "finance-platforms",
    icon: "💸",
    title: "Finance & Payment Systems",
    short: "Transactions, budgets, multi-bank dashboards.",
  },
  {
    slug: "process-automation",
    icon: "📊",
    title: "Business Process Automation",
    short: "Workflows, approval flows, analytics.",
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
