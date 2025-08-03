import React from "react";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  Briefcase,
  Bot,
  Building,
  Calculator,
  Activity,
  Banknote,
  Stethoscope,
  ShoppingCart,
} from "lucide-react";
import {
  expertiseItems,
  caseStudies,
  type iconKeys,
} from "@/content/expertiseItems";

const iconMap: Record<iconKeys, React.JSX.Element> = {
  brainCircuit: <Bot className="w-8 h-8" />,
  bot: <Bot className="w-8 h-8" />,
  building: <Building className="w-8 h-8" />,
  calculator: <Calculator className="w-8 h-8" />,
  activity: <Activity className="w-8 h-8" />,
  banknote: <Banknote className="w-8 h-8" />,
  stethoscope: <Stethoscope className="w-8 h-8" />,
  shoppingCart: <ShoppingCart className="w-8 h-8" />,
};

export const metadata: Metadata = {
  title: "Our Expertise | AxonDigital - Industry-Specific Digital Solutions",
  description:
    "Discover our deep expertise across industries: AI-powered workflows, healthcare systems, e-commerce automation, and fintech innovations.",
  keywords: [
    "expertise",
    "AI automation",
    "healthcare technology",
    "fintech solutions",
    "e-commerce platforms",
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
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="mt-4">
      <p className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-md shadow-inner">
        💡 <span className="font-semibold">Impact:</span> {impact}
      </p>
    </div>
  </div>
);

export default function Page() {
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
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    Our Expertise
                  </h1>
                  <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Deep industry knowledge across{" "}
                    <strong>fintech, healthcare, e-commerce</strong>, and{" "}
                    <strong>enterprise solutions</strong>. We understand the
                    unique challenges of each sector and deliver{" "}
                    <strong>tailored digital solutions</strong> that drive real
                    business results.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                      Industry Focus
                    </span>
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                      Proven Results
                    </span>
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                      Domain Expertise
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Expertise Areas Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Industry Expertise Areas
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Specialized knowledge and proven experience across key
                    industries
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {expertiseItems.map((item, index) => (
                    <ExpertiseItem
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      slug={item.slug}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Case Studies Section */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Success Stories
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Real results from industry-specific solutions
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {caseStudies.map((study, index) => (
                    <CaseStudy
                      key={index}
                      title={study.title}
                      description={study.description}
                      impact={study.impact}
                    />
                  ))}
                </div>
              </div>
            </section>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
