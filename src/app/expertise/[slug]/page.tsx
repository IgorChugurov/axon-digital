import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { MoreExpertise } from "@/components/MoreExpertise";
import { expertiseContent } from "@/content/expertiseContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const expertise = expertiseContent[slug];

  if (!expertise) {
    return {
      title: "Expertise Not Found | AxonDigital",
      description: "The requested expertise area was not found.",
    };
  }

  return {
    title: `${expertise.title} | AxonDigital Expertise`,
    description: expertise.intro,
    keywords: [
      expertise.title.toLowerCase(),
      "AxonDigital expertise",
      "digital solutions",
      "technology consulting",
      "business automation",
    ],
    openGraph: {
      title: `${expertise.title} | AxonDigital Expertise`,
      description: expertise.intro,
      type: "article",
      url: `https://axondigital.xyz/expertise/${slug}`,
      siteName: "AxonDigital",
      images: [
        {
          url: "/banner.webp",
          width: 1200,
          height: 630,
          alt: `${expertise.title} - AxonDigital Expertise`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${expertise.title} | AxonDigital`,
      description: expertise.intro,
      images: ["/banner.webp"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://axondigital.xyz/expertise/${slug}`,
    },
  };
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const expertise = expertiseContent[slug];

  if (!expertise) {
    return (
      <main className="flex flex-1 flex-col bg-white overflow-auto min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center flex-1 text-gray-600">
          <h1 className="text-2xl font-semibold">Page Not Found</h1>
          <p className="text-gray-500 mt-2">
            No expertise page found for: {slug}
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-white overflow-auto min-h-screen">
      <Header />
      <div className="digital-style flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {expertise.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">{expertise.intro}</p>
            <div className="space-y-6 text-gray-700 text-base">
              {expertise.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <MoreExpertise current={slug} />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
