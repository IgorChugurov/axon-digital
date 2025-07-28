import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ContactFormSection from "@/components/about/ContactFormSection";
import businessSolutions from "@/content/businessSolutions.json";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = businessSolutions.find((s) => s.slug === slug);

  if (!solution) {
    return {
      title: "Solution Not Found | AxonDigital",
      description: "The requested business solution was not found.",
    };
  }

  return {
    title: `${solution.title} | AxonDigital Business Solutions`,
    description: solution.description,
    keywords: [
      solution.title.toLowerCase(),
      "AxonDigital business solutions",
      "accounting automation",
      "OblikFlow platform",
      "enterprise systems",
      "business automation",
      "custom solutions",
    ],
    openGraph: {
      title: `${solution.title} | AxonDigital Business Solutions`,
      description: solution.description,
      type: "article",
      url: `https://axondigital.xyz/solutions/${slug}`,
      siteName: "AxonDigital",
      images: [
        {
          url: solution.image || "/banner.webp",
          width: 1200,
          height: 630,
          alt: `${solution.title} - AxonDigital Business Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.title} | AxonDigital`,
      description: solution.description,
      images: [solution.image || "/banner.webp"],
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
  const solution = businessSolutions.find((s) => s.slug === slug);

  if (!solution) {
    return (
      <main className="flex flex-1 flex-col bg-white overflow-auto min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center flex-1 text-gray-600">
          <h1 className="text-2xl font-semibold">Solution Not Found</h1>
          <p className="text-gray-500 mt-2">
            No business solution found for: {slug}
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  const contactForm = {
    title: "Contact Us",
    subtitle: "Fill out the form, and we'll get back to you within 24 hours.",
    fields: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
    },
    buttonText: "Send Message",
    message: `I'd like to discuss the business solution: ${solution.title}`,
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
                <h1 className="text-5xl font-bold mb-6">{solution.title}</h1>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  {solution.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Custom-Adapted
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    AI-Powered
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Enterprise-Grade
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-6xl mx-auto py-12 px-4">
            {/* Key Features Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solution.features?.map((feature, index) => (
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
                System Architecture
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <ul className="space-y-4">
                  {solution.architecture?.map((item, index) => (
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
                Technology Stack
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {solution.technology?.map((tech, index) => (
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
                Use Cases & Examples
              </h2>
              <div className="bg-blue-50 rounded-lg p-8">
                <ul className="space-y-4">
                  {solution.useCases?.map((useCase, index) => (
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
                Business Benefits
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solution.benefits?.map((benefit, index) => (
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
