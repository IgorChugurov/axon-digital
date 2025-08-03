import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ContactFormSection from "@/components/about/ContactFormSection";
import siteContent from "@/content/siteContent.json";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Получаем решение только из детальных данных
  const solutionDetails =
    siteContent.pages.solutionsDetails[
      slug as keyof typeof siteContent.pages.solutionsDetails
    ];

  if (!solutionDetails) {
    return {
      title: "Solution Not Found | AxonDigital",
      description: "The requested digital solution was not found.",
    };
  }

  return {
    title: `${solutionDetails.title} | AxonDigital Solutions`,
    description: solutionDetails.description,
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
      description: solutionDetails.description,
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
      description: solutionDetails.description,
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
      canonical: `https://axondigital.xyz/solutions/${slug}`,
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
  const solutionDetails =
    siteContent.pages.solutionsDetails[
      slug as keyof typeof siteContent.pages.solutionsDetails
    ];

  if (!solutionDetails) {
    return (
      <main className="flex flex-1 flex-col bg-white overflow-auto min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center flex-1 text-gray-600">
          <h1 className="text-2xl font-semibold">Solution Not Found</h1>
          <p className="text-gray-500 mt-2">
            No digital solution found for: {slug}
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  // Создаем объект solution из solutionDetails
  const details = solutionDetails as any;
  const {
    title,
    description,
    category,
    language,
    features,
    architecture,
    technology,
    useCases,
    benefits,
  } = details?.sections?.overview;

  // Определяем переводы заголовков разделов
  const isUkrainian = language === "ua";
  const sectionTitles = {
    features: isUkrainian ? "Ключові функції" : "Key Features",
    architecture: isUkrainian ? "Архітектура системи" : "System Architecture",
    technology: isUkrainian ? "Технологічний стек" : "Technology Stack",
    useCases: isUkrainian
      ? "Випадки використання та приклади"
      : "Use Cases & Examples",
    benefits: isUkrainian ? "Бізнес-переваги" : "Business Benefits",
  };

  const solution = {
    title: title,
    description: description,
    category:
      category || (isUkrainian ? "Цифрове рішення" : "Digital Solution"),
    language: language,
    features: features || [],
    architecture: architecture || [],
    technology: technology || [],
    useCases: useCases || [],
    benefits: benefits || [],
  };

  const contactForm = {
    title: isUkrainian ? "Зв'яжіться з нами" : "Contact Us",
    subtitle: isUkrainian
      ? "Заповніть форму, і ми зв'яжемося з вами протягом 24 годин."
      : "Fill out the form, and we'll get back to you within 24 hours.",
    fields: {
      name: isUkrainian ? "Ваше ім'я" : "Your Name",
      email: isUkrainian ? "Ваш Email" : "Your Email",
      message: isUkrainian ? "Ваше повідомлення" : "Your Message",
    },
    buttonText: isUkrainian ? "Відправити повідомлення" : "Send Message",
    message: isUkrainian
      ? `Я хотів би обговорити цифрове рішення: ${solution.title}`
      : `I'd like to discuss the digital solution: ${solution.title}`,
  };

  return (
    <main className="flex flex-1 flex-col bg-white overflow-auto">
      <Header />

      <div className="digital-style flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-gray-700 to-slate-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-sm bg-white/20 rounded-full px-3 py-1 font-medium">
                    {solution.category}
                  </span>
                  {/* <span className="ml-2 text-sm bg-blue-500 rounded-full px-3 py-1 font-medium">
                    {solution.language?.toUpperCase()}
                  </span> */}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  {solution.title}
                </h1>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  {solution.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    {isUkrainian
                      ? "Індивідуально адаптовано"
                      : "Custom-Adapted"}
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    {isUkrainian ? "AI-рішення" : "AI-Powered"}
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    {isUkrainian ? "Корпоративний рівень" : "Enterprise-Grade"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-6xl mx-auto py-12 px-4">
            {/* Key Features Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                {sectionTitles.features}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solution.features?.map((feature: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-blue-600 text-2xl">✓</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Architecture Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                {sectionTitles.architecture}
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <ul className="space-y-4">
                  {solution.architecture?.map((item: any, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">→</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Technology Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                {sectionTitles.technology}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {solution.technology?.map((tech: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-green-600 text-sm">⚙</span>
                      </div>
                      <p className="text-gray-700">{tech}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Use Cases Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                {sectionTitles.useCases}
              </h2>
              <div className="bg-blue-50 rounded-lg p-8">
                <ul className="space-y-4">
                  {solution.useCases?.map((useCase: any, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">📋</span>
                      <span className="text-gray-700">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                {sectionTitles.benefits}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solution.benefits?.map((benefit: any, index: number) => (
                  <div
                    key={index}
                    className="bg-green-50 border border-green-200 rounded-lg p-6"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-green-600 text-2xl">📈</span>
                    </div>
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Implementation Timeline */}
            {/* <section className="mb-16">
                <div className="relative bg-gradient-to-r from-gray-700 to-slate-800 rounded-lg p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">
                    {solution.language === "ua"
                        ? "Перевага адаптованого рішення"
                        : "Advantage of Adapted Solution"}
                    </h3>
                    <p className="text-xl mb-4">
                    {solution.language === "ua"
                        ? "Значно швидше за розробку з нуля"
                        : "Significantly faster than custom development from scratch"}
                    </p>
                    <p className="text-blue-100">
                    {solution.implementationTimeline?.customDevelopment ||
                        (solution.language === "ua"
                        ? "до 6 місяців для розробки з нуля"
                        : "up to 6 months for custom development from scratch")}
                    </p>
                </div>
                </section> */}
          </div>

          <section className="bg-[#f0f4f9]">
            <ContactFormSection content={contactForm} />
          </section>
          <Footer />
        </div>
      </div>
    </main>
  );
}
