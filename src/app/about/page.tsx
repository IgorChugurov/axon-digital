import type { Metadata } from "next";
import content from "@/content/aboutPage.json";
import HeroSection from "@/components/about/HeroSection";
import ApproachSection from "@/components/about/ApproachSection";
import ServicesSection from "@/components/about/ServicesSection";
import ExpertiseSection from "@/components/about/ExpertiseSection";
import PlatformSection from "@/components/about/PlatformSection";
import WhyUsSection from "@/components/about/WhyUsSection";
import PricingSection from "@/components/about/PricingSection";
import ContactFormSection from "@/components/about/ContactFormSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProcessSection from "@/components/about/ProcessSection";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "About Us | AxonDigital - Digital Agency & Technology Experts",
  description:
    "Learn about AxonDigital's team, approach, and comprehensive digital services. Discover our expertise in web development, AI integration, and TvorFlow Platform solutions.",
  keywords: [
    "about AxonDigital",
    "digital agency team",
    "technology experts",
    "web development company",
    "AI solutions provider",
    "TvorFlow Platform",
    "business digitalization",
    "custom software development",
  ],
  openGraph: {
    title: "About Us | AxonDigital - Digital Technology Experts",
    description:
      "Meet the AxonDigital team. Discover our approach to digital solutions, from web development to AI integration and our innovative TvorFlow Platform.",
    type: "website",
    url: "https://axondigital.xyz/about",
    siteName: "AxonDigital",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "AxonDigital Team - Digital Technology Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | AxonDigital - Digital Technology Experts",
    description:
      "Meet our team of digital experts. Learn about our approach to web development, AI integration, and innovative platform solutions.",
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
    canonical: "https://axondigital.xyz/about",
  },
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col  bg-white overflow-auto">
      <Header />

      <div className="flex flex-col flex-1  overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto  scrollbar-hide">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-gray-700 to-slate-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  About AxonDigital
                </h1>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  We are a digital engineering agency specializing in
                  enterprise-grade solutions. From AI integration to our
                  proprietary <strong>TvorFlow Platform</strong>, we deliver{" "}
                  <strong>professional, scalable solutions</strong> that drive
                  business growth.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Enterprise Solutions
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Digital Engineering
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    TvorFlow Platform
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Блок 1 — HeroSection на белом */}
          {/* <section className="bg-white">
            <HeroSection content={content.hero} />
          </section> */}

          {/* Блок 2 — ApproachSection на светлом */}

          <section className="bg-[#f0f4f9]    relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H40' stroke='%23d9e2ec' stroke-width='0.5'/%3E%3Cpath d='M0 0V40' stroke='%23d9e2ec' stroke-width='0.5'/%3E%3C/svg%3E\")",
                backgroundSize: "40px 40px",
                backgroundRepeat: "repeat",
                opacity: 1,
                maskImage: "linear-gradient(to bottom, black 80%, transparent)",
              }}
            />
            <FadeInSection>
              <ApproachSection content={content.approach} />
            </FadeInSection>
            {/* <ApproachSection content={content.approach} /> */}
          </section>

          <section className="bg-white">
            <ServicesSection content={content.services} />
          </section>

          <section className="bg-[#f0f4f9]">
            <ExpertiseSection content={content.expertise} />
          </section>

          <section className="bg-white">
            <PlatformSection />
          </section>

          <section className="bg-[#f0f4f9]">
            <WhyUsSection content={content.whyUs} />
          </section>

          <section className="bg-[#f0f4f9]">
            <ProcessSection content={content.process} />
          </section>
          <section className="bg-white">
            <PricingSection content={content.pricing} />
          </section>

          <section className="bg-[#f0f4f9]">
            <ContactFormSection content={content.contactForm} />
          </section>
          <Footer />
        </div>
      </div>
    </main>
  );
}
