import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import pageContent from "@/content/process-pages-content.json";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Получаем решение только из детальных данных
  const solutionDetails = pageContent[slug as keyof typeof pageContent];

  if (!solutionDetails) {
    return {
      title: "Process Not Found | AxonDigital",
      description: "The requested process was not found.",
    };
  }

  return {
    title: `${solutionDetails.title} | AxonDigital Solutions`,
    description: solutionDetails.intro,
    keywords: [
      solutionDetails.title.toLowerCase(),
      "AxonDigital digital solutions",
      "fintech platforms",
      "healthcare systems",
      "e-commerce automation",
      "enterprise automation",
      "industry solutions",
    ],
    openGraph: {
      title: `${solutionDetails.title} | AxonDigital Solutions`,
      description: solutionDetails.intro,
      type: "article",
      url: `https://axondigital.xyz/solutions/${slug}`,
      siteName: "AxonDigital",
      images: [
        {
          url: "/banner.webp",
          width: 1200,
          height: 630,
          alt: `${solutionDetails.title} - AxonDigital Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${solutionDetails.title} | AxonDigital`,
      description: solutionDetails.intro,
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
      canonical: `https://axondigital.xyz/process/${slug}`,
    },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Получаем решение только из детальных данных
  const solutionDetails = pageContent[slug as keyof typeof pageContent];

  if (!pageContent) {
    return (
      <main className="flex flex-1 flex-col bg-white overflow-auto min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center flex-1 text-gray-600">
          <h1 className="text-2xl font-semibold">Solution Not Found</h1>
          <p className="text-gray-500 mt-2">No process found for: {slug}</p>
        </div>
        <Footer />
      </main>
    );
  }

  // Создаем объект solution из solutionDetails
  const details = solutionDetails as any;
  const { title, intro, content } = details;

  // Определяем переводы заголовков разделов

  return (
    <main className="flex flex-1 flex-col bg-white overflow-auto">
      <Header />

      <div className="digital-style flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-gray-700 to-slate-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{title}</h1>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  {intro}
                </p>
              </div>
            </div>
          </section>

          <div className="max-w-6xl mx-auto py-12 px-4">
            {/* Key Features Section */}
            {content.map((item: any, index: number) => (
              <section className="mb-16" key={index}>
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                  {item.subtitle}
                </h2>
                <p className="text-gray-700">{item.text}</p>
              </section>
            ))}
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}
