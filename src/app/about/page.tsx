"use client";
import content from "@/content/aboutPage.json";
import HeroSection from "@/components/about/HeroSection";
import ApproachSection from "@/components/about/ApproachSection";
import ServicesSection from "@/components/about/ServicesSection";
import ExpertiseSection from "@/components/about/ExpertiseSection";
import WhyUsSection from "@/components/about/WhyUsSection";
// import PricingSection from "@/components/about/PricingSection";
//import ProcessSection from "@/components/about/ProcessSection";
import ContactFormSection from "@/components/about/ContactFormSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProcessSection from "@/components/about/ProcessSection";

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
          <section className="bg-gray-50">
            <ApproachSection content={content.approach} />
          </section>

          <section className="bg-white">
            <ServicesSection content={content.services} />
          </section>

          <section className="bg-gray-50">
            <ExpertiseSection content={content.expertise} />
          </section>

          <section className="bg-white">
            <WhyUsSection content={content.whyUs} />
          </section>

          {/*  <section className="bg-gray-50">
          <PricingSection content={content.pricing} />
        </section>*/}

          <section className="bg-white">
            <ProcessSection content={content.process} />
          </section>

          <section className="bg-gray-50">
            <ContactFormSection content={content.contactForm} />
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
