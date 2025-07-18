import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { MoreExpertise } from "@/components/MoreExpertise";

const expertiseContent: Record<
  string,
  {
    title: string;
    intro: string;
    content: string[];
  }
> = {
  "llm-workflows": {
    title: "LLM-Powered Workflows",
    intro:
      "We integrate advanced large language models (LLMs) into business systems to automate complex tasks, enhance decision-making, and streamline operations. Our solutions leverage state-of-the-art AI models, ensuring secure, scalable, and privacy-compliant deployments tailored to your business needs.",
    content: [
      "We deploy OpenAI, Ollama, or custom fine-tuned models using Node.js APIs and WebSocket messaging to support document generation, semantic search, and AI-based assistants.",
      "Both cloud (OpenAI, Azure AI) and on-premise setups are supported, with secure isolated environments and Docker-based deployment for compliance with GDPR or HIPAA.",
      "We use Retrieval-Augmented Generation (RAG) to enable domain-specific copilots, providing context-aware and explainable answers in regulated domains.",
      "Integration is performed via REST APIs, WebSocket, or direct adapter layers to CRMs, knowledge bases, or internal tools.",
      "We provide feedback mechanisms and performance dashboards built with Next.js and Tailwind to monitor usage and continuously fine-tune model behavior.",
    ],
  },
  "ai-assistants": {
    title: "AI Assistants for Web & CRM",
    intro:
      "Our AI assistants enhance user experience through intelligent, context-aware interactions across websites, CRMs, and admin panels. We design natural conversational logic, integrate APIs, and support speech and memory features.",
    content: [
      "We build assistants using OpenAI Assistants API or custom GPT-like models hosted locally (e.g., via Ollama). We support multi-language prompts, speech-to-text with Whisper, and Assistant memory for contextual dialogs.",
      "Applications include customer-facing bots for website onboarding, internal support assistants, and AI-powered form guidance.",
      "All bots are fully integrated into Next.js 15 apps via React components, and optionally exposed as embeddable web widgets.",
      "Integrations with CRMs and analytics tools are done via REST and event-driven pub/sub logic over Redis or WebSocket.",
      "We implement structured error handling, token limits, abuse detection, and real-time metrics collection.",
    ],
  },
  "healthcare-digitalization": {
    title: "Healthcare Digitalization",
    intro:
      "We build secure medical platforms for managing EHR, patient flows, clinical dashboards, and operational workflows. Our systems are HIPAA/GDPR-compliant and tailored to each healthcare provider’s model.",
    content: [
      "We support FHIR-compatible EHR data structures and integrate with diagnostic and scheduling systems via secure API adapters.",
      "Dashboards are built using Next.js and Tailwind UI, with real-time data from PostgreSQL or Redis published over WebSocket.",
      "Patient-facing features include secure appointment booking, intake forms, teleconsultation modules, and consent document flows.",
      "All data is encrypted at rest using AES-256 and transmitted via TLS, with audit logging and access control managed via RBAC.",
      "Multi-location support is built in using multitenant architecture, centralized identity management, and unified reporting.",
    ],
  },
  "ecommerce-platforms": {
    title: "E-commerce Platforms",
    intro:
      "We develop high-performance e-commerce platforms for B2B and B2C use cases with real-time inventory, custom checkout flows, and deep analytics integration.",
    content: [
      "Built on Next.js (App Router) with API handlers and PostgreSQL for catalog, pricing, and user sessions.",
      "Supports dynamic pricing rules, multi-currency, regional tax handling, and promotions management.",
      "Integrations with Stripe, PayPal, and localized gateways via server-side adapters with secure tokenization.",
      "Logistics automation includes shipping label generation, real-time status tracking, and webhook integration with carriers.",
      "SEO and performance are optimized via SSR, image optimization, and PWA support.",
    ],
  },
  "accounting-automation": {
    title: "Accounting Automation",
    intro:
      "We automate core accounting workflows: invoicing, reconciliation, tax calculation, and financial reporting using scalable backend architecture and modern APIs.",
    content: [
      "We build backend systems with TypeScript, PostgreSQL, and Prisma ORM to store and process financial data.",
      "Integrate bank data via Open Banking APIs or direct upload of CSVs with auto-categorization logic.",
      "Support for country-specific tax rules (e.g. VAT, US GAAP) and scheduled generation of compliance reports.",
      "Interfaces include dashboards for accountants, PDF exports, XLSX download, and internal audit logs.",
      "We ensure encryption, access separation, and validation pipelines using Zod schemas.",
    ],
  },
  "property-management": {
    title: "Property & Tenant Management",
    intro:
      "We create tenant management and property CRM platforms that streamline lease workflows, billing, and facility requests.",
    content: [
      "Built with Next.js + Tailwind and PostgreSQL schema for tenants, payments, bookings, and building metadata.",
      "CRMs support role-specific access: landlords, tenants, managers — each with filtered views and notification settings.",
      "Integration with DocuSign and Stripe via server-side API adapters with status callbacks.",
      "Analytics dashboards use embedded charts via Chart.js or custom SVG rendering with real-time updates.",
      "Smart building logic can be integrated via WebSocket/REST to sensors or IoT layers.",
    ],
  },
  "finance-platforms": {
    title: "Finance & Payment Systems",
    intro:
      "We build financial platforms that unify payment tracking, budgeting, and financial analytics across multiple sources.",
    content: [
      "Data aggregation from APIs (Plaid, Stripe, internal banks) via secure OAuth 2.0 and Webhook feeds.",
      "Real-time views via WebSocket and Redis pub/sub event stream to track balances, settlements, and anomalies.",
      "Ledger logic built with normalized PostgreSQL schemas and version-controlled operations.",
      "Role-based dashboards and visualizations built with React, Tailwind, and custom charting layers.",
      "Full security layer with audit logs, RBAC, encryption at rest, and 2FA login flows.",
    ],
  },
  "process-automation": {
    title: "Business Process Automation",
    intro:
      "We digitalize business operations using custom CRMs, approval flows, reporting layers, and automation bots to reduce delays and human errors.",
    content: [
      "We build workflows using Next.js UI, Node.js backend logic, and PostgreSQL/Redis as data layers.",
      "Task pipelines include contract approvals, support tickets, inventory routing, and status alerts.",
      "Automation logic includes cron jobs, real-time triggers, WebSocket subscriptions, and conditional logic trees.",
      "We support integrations via REST or direct API bridges to CRMs, internal services, or OpenAI-based bots.",
      "All workflows include logging, monitoring, and user-level analytics through embedded dashboards.",
    ],
  },
};

// const expertiseCards = [
//   {
//     slug: "llm-workflows",
//     icon: "🧠",
//     title: "LLM-Powered Workflows",
//     short: "AI copilots, automation, and semantic tools.",
//   },
//   {
//     slug: "ai-assistants",
//     icon: "🤖",
//     title: "AI Assistants for Web & CRM",
//     short: "Smart bots and in-app guidance tools.",
//   },
//   {
//     slug: "healthcare-digitalization",
//     icon: "🩺",
//     title: "Healthcare Digitalization",
//     short: "EHR, clinic dashboards, secure portals.",
//   },
//   {
//     slug: "ecommerce-platforms",
//     icon: "🛒",
//     title: "E-commerce Platforms",
//     short: "Custom shops, payments, logistics flows.",
//   },
//   {
//     slug: "accounting-automation",
//     icon: "🧮",
//     title: "Accounting Automation",
//     short: "Tax, payroll, ledger tools with full traceability.",
//   },
//   {
//     slug: "property-management",
//     icon: "🏢",
//     title: "Property & Tenant Management",
//     short: "CRMs for leases, tenants, smart buildings.",
//   },
//   {
//     slug: "finance-platforms",
//     icon: "💸",
//     title: "Finance & Payment Systems",
//     short: "Transactions, budgets, multi-bank dashboards.",
//   },
//   {
//     slug: "process-automation",
//     icon: "📊",
//     title: "Business Process Automation",
//     short: "Workflows, approval flows, analytics.",
//   },
// ];

// export function MoreExpertise({ current }: { current: string }) {
//   const other = expertiseCards.filter((x) => x.slug !== current);

//   return (
//     <section className="bg-gray-50 border-t mt-24 py-10 px-4 sm:px-6 md:px-8">
//       <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
//         More Areas of Expertise
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
//         {other.map(({ slug, icon, title }) => (
//           <Link
//             key={slug}
//             href={`/expertise/${slug}`}
//             className="flex items-center gap-2 px-4 py-3 bg-white rounded-md border border-gray-200 hover:shadow transition"
//           >
//             <span className="text-xl">{icon}</span>
//             <span className="text-sm font-medium text-gray-800">{title}</span>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const expertise = expertiseContent[slug];

  if (!expertise) {
    return {
      title: "Expertise Not Found | AxonDigital",
      description: "The requested expertise area was not found.",
    };
  }

  return {
    title: `${expertise.title} | AxonDigital Expertise`,
    description: expertise.intro,
    keywords: [
      expertise.title.toLowerCase(),
      "AxonDigital expertise",
      "digital solutions",
      "technology consulting",
      "business automation",
    ],
    openGraph: {
      title: `${expertise.title} | AxonDigital Expertise`,
      description: expertise.intro,
      type: "article",
      url: `https://axondigital.xyz/expertise/${slug}`,
      siteName: "AxonDigital",
      images: [
        {
          url: "/banner.webp",
          width: 1200,
          height: 630,
          alt: `${expertise.title} - AxonDigital Expertise`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${expertise.title} | AxonDigital`,
      description: expertise.intro,
      images: ["/banner.webp"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://axondigital.xyz/expertise/${slug}`,
    },
  };
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const expertise = expertiseContent[slug];

  if (!expertise) {
    return (
      <main className="flex flex-1 flex-col bg-white overflow-auto min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center flex-1 text-gray-600">
          <h1 className="text-2xl font-semibold">Page Not Found</h1>
          <p className="text-gray-500 mt-2">
            No expertise page found for: {slug}
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-white overflow-auto min-h-screen">
      <Header />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 max-w-4xl mx-auto scrollbar-hide">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {expertise.title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{expertise.intro}</p>
          <div className="space-y-6 text-gray-700 text-base">
            {expertise.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          <MoreExpertise current={slug} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
