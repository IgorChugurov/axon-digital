import siteContent from "@/content/siteContent.json";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";

const servicesData = siteContent.pages.services;

export const metadata: Metadata = {
  title: servicesData.title,
  description: servicesData.description,
  keywords: [
    "web application development",
    "documentation audit",
    "AI integration",
    "process automation",
    "website creation",
    "digital solutions",
    "custom software development",
    "business digitalization",
  ],
  openGraph: {
    title: servicesData.title,
    description: servicesData.description,
    type: "website",
    url: "https://axondigital.xyz/services",
    siteName: "AxonDigital",
    images: [
      {
        url: "/banner.webp",
        width: 600,
        height: 1200,
        alt: "AxonDigital Services - Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: servicesData.title,
    description: servicesData.description,
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
    canonical: "https://axondigital.xyz/services",
  },
};

export default function ServicesPage() {
  // Получаем все сервисы из новой структуры данных
  const services = servicesData.sections.servicesGrid.services;

  return (
    <main className="flex flex-1 flex-col bg-white overflow-auto">
      <Header />

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-gray-700 to-slate-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-6">
                  {servicesData.sections.hero.title}
                </h1>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  {servicesData.sections.hero.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {servicesData.sections.hero.features.map(
                    (feature: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block"
                >
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#f0f4f9] hover:shadow-md transition duration-300 ease-in-out flex flex-col h-full">
                    {/* Image */}
                    <div className="relative aspect-square bg-gray-100">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <span className="text-4xl text-gray-400">📋</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed flex-1">
                        {service.description}
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
