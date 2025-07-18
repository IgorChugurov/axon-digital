import type { Metadata } from "next";
import content from "@/content/aboutPage.json";

import ContactFormSection from "@/components/about/ContactFormSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | AxonDigital - Get Your Digital Solution Quote",
  description:
    "Contact AxonDigital for professional digital solutions. Get expert consultation for web development, AI integration, process automation, and CoreFlow Platform implementation.",
  keywords: [
    "contact AxonDigital",
    "digital agency consultation",
    "web development quote",
    "AI solutions consultation",
    "CoreFlow Platform demo",
    "business digitalization",
    "custom software quote",
  ],
  openGraph: {
    title: "Contact Us | AxonDigital - Digital Solutions Consultation",
    description:
      "Ready to transform your business? Contact AxonDigital for expert consultation on web development, AI integration, and our innovative CoreFlow Platform.",
    type: "website",
    url: "https://axondigital.xyz/contact",
    siteName: "AxonDigital",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Contact AxonDigital - Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | AxonDigital - Digital Solutions Consultation",
    description:
      "Get expert consultation for web development, AI integration, and platform solutions. Contact AxonDigital today.",
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
    canonical: "https://axondigital.xyz/contact",
  },
};

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
          <Footer />
        </div>
      </div>
    </main>
  );
}
