"use client";
import content from "@/content/aboutPage.json";

import ContactFormSection from "@/components/about/ContactFormSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col  bg-white overflow-auto min-h-screen">
      <Header />

      <div className="flex flex-col flex-1  overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto  scrollbar-hide">
          <ContactFormSection
            content={content.contactForm}
            bgFon={"bg-white"}
          />
        </div>
        <Footer />
      </div>
    </main>
  );
}
