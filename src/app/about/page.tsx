"use client";
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

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col  bg-white overflow-auto">
      <Header />

      <div className="flex flex-col flex-1  overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto  scrollbar-hide">
          {/* Блок 1 — HeroSection на белом */}
          <section className="bg-white">
            <HeroSection content={content.hero} />
          </section>
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
