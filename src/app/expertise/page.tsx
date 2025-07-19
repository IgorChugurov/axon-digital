import React from "react";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css"; // Import your CSS module
const iconMap = {
  brainCircuit: "⚡",
  bot: "🔧",
  stethoscope: "⚕",
  shoppingCart: "💼",
  calculator: "📈",
  building: "🏢",
  banknote: "💰",
  activity: "📊",
};
type iconKeys = keyof typeof iconMap;
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Expertise | AxonDigital - AI, Healthcare & E-commerce Solutions",
  description:
    "Explore AxonDigital's expertise in AI-powered workflows, healthcare digitalization, e-commerce automation, and fintech solutions. Industry-specific digital transformation.",
  keywords: [
    "AI expertise",
    "healthcare digitalization",
    "e-commerce automation",
    "fintech solutions",
    "LLM workflows",
    "AI assistants",
    "digital transformation",
    "industry solutions",
    "business automation",
  ],
  openGraph: {
    title: "Our Expertise | AxonDigital - Industry-Specific Digital Solutions",
    description:
      "Discover our deep expertise across industries: AI-powered workflows, healthcare systems, e-commerce automation, and fintech innovations.",
    type: "website",
    url: "https://axondigital.xyz/expertise",
    siteName: "AxonDigital",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "AxonDigital Expertise - Industry Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Expertise | AxonDigital - Industry Digital Solutions",
    description:
      "Expert solutions across industries: AI workflows, healthcare digitalization, e-commerce automation, and fintech innovations.",
    images: ["/banner.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://axondigital.xyz/expertise",
  },
};

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
      icon: "banknote",
      title: "Fintech & Financial Services",
      description:
        "Payment systems, financial platforms, banking integrations, and regulatory compliance solutions for fintech startups and established financial institutions.",
      slug: "fintech-financial",
    },
    {
      icon: "stethoscope",
      title: "Healthcare & Medical Technology",
      description:
        "HIPAA-compliant systems, electronic health records, telemedicine platforms, and clinical workflow management for healthcare providers.",
      slug: "healthcare-medtech",
    },
    {
      icon: "shoppingCart",
      title: "E-commerce & Retail Technology",
      description:
        "Online marketplaces, inventory management, customer experience platforms, and omnichannel retail solutions that drive sales growth.",
      slug: "ecommerce-retail",
    },
    {
      icon: "activity",
      title: "Education & Learning Platforms",
      description:
        "Learning management systems, educational content platforms, student information systems, and interactive learning tools for modern education.",
      slug: "education-edtech",
    },
    {
      icon: "building",
      title: "Real Estate & Property Technology",
      description:
        "Property management platforms, tenant portals, lease management systems, and smart building solutions for real estate professionals.",
      slug: "proptech-realestate",
    },
    {
      icon: "calculator",
      title: "Enterprise & Corporate Solutions",
      description:
        "Large-scale business applications, enterprise resource planning, workflow automation, and system integrations for corporate environments.",
      slug: "enterprise-corporate",
    },
  ];

  const caseStudies = [
    {
      title: "Fintech Payment Platform",
      description:
        "A fintech startup needed a secure payment processing platform with real-time transaction monitoring and compliance features. We built a comprehensive solution with multi-currency support and regulatory compliance.",
      impact:
        "Processed over $10M in transactions within first quarter, achieved PCI DSS compliance, and reduced transaction processing time by 50%.",
    },
    {
      title: "Healthcare Management System",
      description:
        "A medical clinic network required a unified system for patient records, appointment scheduling, and clinical workflows. We developed a HIPAA-compliant platform with telemedicine capabilities.",
      impact:
        "Improved patient satisfaction by 40%, reduced administrative overhead by 35%, and enabled remote consultations during pandemic.",
    },
    {
      title: "E-commerce Marketplace Platform",
      description:
        "A growing retailer needed a scalable e-commerce platform with advanced inventory management and customer analytics. We created a comprehensive solution with real-time reporting.",
      impact:
        "Increased online sales by 65%, improved inventory accuracy to 99.5%, and provided actionable customer insights that boosted conversion rates.",
    },
  ];
  return (
    <main className="flex flex-1 flex-col  bg-white overflow-auto">
      <Header />
      <div className="flex flex-col flex-1  overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto  scrollbar-hide">
          <div className="min-h-screen  font-sans">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-gray-700 to-slate-800 text-white py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h1 className="text-5xl font-bold mb-6">Our Expertise</h1>
                  <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Deep industry knowledge across AI-powered workflows,
                    healthcare digitalization, e-commerce automation, and
                    fintech solutions.{" "}
                    <strong>
                      We build tailored digital systems that solve complex
                      business challenges with our innovative TvorFlow Platform.
                    </strong>
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                      AI-Powered Solutions
                    </span>
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                      Industry Expertise
                    </span>
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                      TvorFlow Platform
                    </span>
                  </div>
                </div>
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
