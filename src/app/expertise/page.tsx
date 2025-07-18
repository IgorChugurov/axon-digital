import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css"; // Import your CSS module
const iconMap = {
  brainCircuit: "🧠",
  bot: "🤖",
  stethoscope: "🩺",
  shoppingCart: "🛒",
  calculator: "🧮",
  building: "🏢",
  banknote: "💸",
  activity: "📊",
};
type iconKeys = keyof typeof iconMap;
import Link from "next/link";

const ExpertiseItem = ({
  icon,
  title,
  description,
  slug,
}: {
  icon: iconKeys;
  title: string;
  description: string;
  slug: string;
}) => {
  return (
    <Link href={`/expertise/${slug}`}>
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="text-4xl mb-4">{iconMap[icon]}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </Link>
  );
};

const CaseStudy = ({
  title,
  description,
  impact,
}: {
  title: string;
  description: string;
  impact: string;
}) => (
  <div className="flex flex-col justify-between h-full p-6 bg-white rounded-lg shadow-md border border-gray-100">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
    <div className="mt-4 pt-4">
      <p className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-md shadow-inner">
        💡 <span className="font-semibold">Impact:</span> {impact}
      </p>
    </div>
  </div>
);

export default function Page() {
  const expertiseItems: {
    icon: iconKeys;
    title: string;
    description: string;
    slug: string;
  }[] = [
    {
      icon: "brainCircuit",
      title: "LLM-Powered Workflows",
      description:
        "We integrate large language models into business tools to automate routine tasks, generate content, and provide intelligent assistance to teams and customers.",
      slug: "llm-workflows",
    },
    {
      icon: "bot",
      title: "AI Assistants for Web & CRM",
      description:
        "Custom assistants that guide users, automate replies, and structure client requests — built into your website, CRM, or internal tools.",
      slug: "ai-assistants",
    },
    {
      icon: "stethoscope",
      title: "Healthcare Digitalization",
      description:
        "Electronic health records, clinic dashboards, document workflows, and analytics tailored for medical institutions.",
      slug: "healthcare-digitalization",
    },
    {
      icon: "shoppingCart",
      title: "E-commerce Platforms",
      description:
        "Online stores, B2B portals, and marketplaces with payment systems, logistics, and advanced analytics built in.",
      slug: "ecommerce-platforms",
    },
    {
      icon: "calculator",
      title: "Accounting Automation",
      description:
        "We build systems for payroll, tax reporting, and expense tracking, fully aligned with local legislation and accounting models.",
      slug: "accounting-automation",
    },
    {
      icon: "building",
      title: "Property & Tenant Management",
      description:
        "CRMs and booking systems for shopping malls and commercial properties — manage leases, tenants, and contracts with ease.",
      slug: "property-management",
    },
    {
      icon: "banknote",
      title: "Finance & Payment Systems",
      description:
        "Solutions for bank integrations, transaction tracking, budgeting, and financial reporting — secure and scalable.",
      slug: "finance-platforms",
    },
    {
      icon: "activity",
      title: "Business Process Automation",
      description:
        "We digitize and optimize operations: CRM, document flow, approvals, and data collection — all tailored to your workflow.",
      slug: "process-automation",
    },
  ];

  const caseStudies = [
    {
      title: "AI-Driven CRM for Retail",
      description:
        "A retail chain with over 40 stores struggled to retain clients and organize sales data. We built a custom CRM with an AI assistant that guided managers, automated responses, and tracked inventory and visits.",
      impact:
        "Client return rate increased by 15%, and average handling time dropped by 40%.",
    },
    {
      title: "Clinic Management Platform",
      description:
        "A group of private clinics needed better control over appointments, records, and staff workload. We developed a secure, modular platform with scheduling, medical notes, and performance analytics.",
      impact:
        "Operational efficiency improved by 30%, and patient satisfaction rose significantly.",
    },
    {
      title: "B2B Marketplace with Logistics",
      description:
        "A regional supplier required a scalable e-commerce system for wholesalers. We delivered a B2B marketplace with online payments, delivery tracking, and custom pricing rules.",
      impact:
        "Transaction volume grew by 25% in the first quarter after launch.",
    },
  ];
  return (
    <main className="flex flex-1 flex-col  bg-white overflow-auto">
      <Header />
      <div className="flex flex-col flex-1  overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto  scrollbar-hide">
          <div className="min-h-screen  font-sans">
            {/* Hero Section */}
            <section
              className={`text-black ${styles.herosection}  w-full  mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24`}
            >
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Our Expertise
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  We build tailored digital systems that solve complex business
                  challenges — from automation and analytics to AI-powered
                  platforms.
                </p>
              </div>
            </section>

            {/* Expertise Grid */}
            <section className="w-full  mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 bg-gray-100">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                  Digital Solutions We Specialize In
                </h2>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${styles.expertiseGrid}`}
                >
                  {expertiseItems.map((item, index) => (
                    <ExpertiseItem key={index} {...item} />
                  ))}
                </div>
              </div>
            </section>

            {/* Case Studies */}
            <section className="w-full  mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                  Our Success Stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseStudies.map((study, index) => (
                    <CaseStudy key={index} {...study} />
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="w-full mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 bg-gray-100">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  🤝 Let’s Build Something Meaningful Together
                </h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
                  Whether you are exploring ideas or need a ready solution — our
                  team is here to help you move forward.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-900 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </section>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
