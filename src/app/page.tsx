import type { Metadata } from "next";
import ChatWindowStream from "./components/ChatWindowStream";
import Header from "./components/Header";
import { SidebarDesktop } from "./components/SidebarDesktop";

export const metadata: Metadata = {
  title: "AxonDigital - Digital Agency & AI-Powered Solutions",
  description:
    "Professional digital agency offering web development, AI integration, process automation, and CoreFlow Platform. Get expert solutions tailored to your business needs.",
  keywords: [
    "digital agency",
    "web development",
    "AI solutions",
    "process automation",
    "CoreFlow Platform",
    "custom software development",
    "business digitalization",
    "AI assistant",
    "no-code platform",
  ],
  openGraph: {
    title: "AxonDigital - Digital Agency & AI-Powered Solutions",
    description:
      "Transform your business with our comprehensive digital solutions: web development, AI integration, process automation, and innovative CoreFlow Platform.",
    type: "website",
    url: "https://axondigital.xyz",
    siteName: "AxonDigital",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "AxonDigital - Digital Agency Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AxonDigital - Digital Agency & AI-Powered Solutions",
    description:
      "Professional digital solutions: web development, AI integration, automation, and CoreFlow Platform. Transform your business today.",
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
    canonical: "https://axondigital.xyz",
  },
};

export default function Home() {
  return (
    <>
      <SidebarDesktop />
      <main className="flex flex-col flex-1 bg-white overflow-auto">
        <Header />
        <ChatWindowStream />
      </main>
    </>
  );
}
