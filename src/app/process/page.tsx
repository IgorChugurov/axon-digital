import pageContent from "@/content/process.json";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";
const processData = pageContent.process;
export const metadata: Metadata = {
  title: processData.title,
  description: processData.description,
  keywords: [
    "digital solutions",
    "fintech platforms",
    "healthcare systems",
    "e-commerce automation",
    "enterprise automation",
    "industry expertise",
    "technology solutions",
    "business transformation",
  ],
  openGraph: {
    title: processData.title,
    description: processData.description,
    type: "website",
    url: "https://axondigital.xyz/solutions",
    siteName: "AxonDigital",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "AxonDigital Digital Solutions - Industry-Tailored Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: processData.title,
    description: processData.description,
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
    canonical: "https://axondigital.xyz/process",
  },
};

export default function ProcessPage() {
  return (
    <main className="flex flex-1 flex-col bg-white overflow-auto">
      <Header />

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-gray-700 to-slate-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  {processData.sections.hero.title}
                </h1>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  {processData.sections.hero.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {/* {processData.sections.hero.features.map(
                    (feature: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    )
                  )} */}
                </div>
              </div>
            </div>
          </section>

          {/* Solutions Grid */}
          <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {processData.sections.topics.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions customized for your business needs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {processData.sections.topics.items.map((solution: any) => (
                <Link
                  key={solution.url}
                  href={`${solution.url}`}
                  className="group block"
                >
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#f0f4f9] hover:shadow-md transition duration-300 ease-in-out flex flex-col h-full">
                   

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                          {solution.title}
                        </h3>
                        {/* <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {solution.language?.toUpperCase()}
                        </span> */}
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed flex-1">
                        {solution.description}
                      </p>

                      {/* Read More */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-gray-700 text-sm font-medium group-hover:underline">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
