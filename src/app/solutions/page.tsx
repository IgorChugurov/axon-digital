import content from "@/content/businessSolutions.json";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Business Solutions | AxonDigital - Enterprise Business Systems",
  description:
    "Comprehensive business solutions tailored to your needs. From accounting automation to industry-specific platforms, we offer proven systems that accelerate your digital transformation.",
  keywords: [
    "business solutions",
    "accounting automation",
    "OblikFlow platform",
    "enterprise systems",
    "business automation",
    "digital transformation",
    "custom solutions",
    "financial management",
  ],
  openGraph: {
    title: "Business Solutions | AxonDigital - Enterprise Systems",
    description:
      "Custom-adapted business solutions: OblikFlow accounting automation, enterprise systems, and proven platforms that accelerate your digital transformation.",
    type: "website",
    url: "https://axondigital.xyz/solutions",
    siteName: "AxonDigital",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "AxonDigital Business Solutions - Enterprise Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Solutions | AxonDigital - Enterprise Systems",
    description:
      "Custom-adapted business solutions: OblikFlow accounting automation and enterprise systems. Accelerate your digital transformation.",
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
    canonical: "https://axondigital.xyz/solutions",
  },
};

export default function SolutionsPage() {
  return (
    <main className="flex flex-1 flex-col bg-white overflow-auto">
      <Header />

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-gray-700 to-slate-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-6">Business Solutions</h1>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  Proven business systems tailored and adapted to your specific
                  needs. Our solutions combine industry expertise with
                  cutting-edge technology and are customized for your business.{" "}
                  <strong>Much faster than development from scratch.</strong>
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Custom-Adapted
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Industry-Proven
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Full Support
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Solutions Grid */}
          <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Business Solutions Portfolio
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions customized for your business needs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.map((solution) => (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="group block"
                >
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#f0f4f9] hover:shadow-md transition duration-300 ease-in-out flex flex-col h-full">
                    {/* Image */}
                    <div className="relative aspect-square bg-gray-100">
                      {solution.image ? (
                        <Image
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                          <span className="text-4xl text-blue-600">💼</span>
                        </div>
                      )}
                    </div>

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

                      <p className="text-sm text-gray-500 mb-2 font-medium">
                        {solution.category}
                      </p>

                      <p className="text-gray-700 text-sm leading-relaxed flex-1">
                        {solution.shortDescription}
                      </p>

                      {/* Key Features */}
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          Key Features:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {solution.features
                            ?.slice(0, 3)
                            .map((feature, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                {feature.length > 25
                                  ? `${feature.substring(0, 25)}...`
                                  : feature}
                              </span>
                            ))}
                        </div>
                      </div>

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

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Need a Custom Solution?
                </h3>
                <p className="text-gray-600 mb-6">
                  Can&apos;t find what you&apos;re looking for? We also offer
                  custom development services tailored to your specific business
                  needs.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  Explore Custom Services
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
