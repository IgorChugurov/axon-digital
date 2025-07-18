import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ContactFormSection from "@/components/about/ContactFormSection";
import servicesPages from "@/content/servicesPages.json";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = servicesPages[slug as keyof typeof servicesPages];

  if (!page) {
    return {
      title: "Service Not Found | AxonDigital",
      description: "The requested service was not found.",
    };
  }

  return {
    title: `${page.title} | AxonDigital Services`,
    description: page.description,
    keywords: [
      page.title.toLowerCase(),
      "AxonDigital services",
      "digital solutions",
      "web development",
      "AI integration",
      "business automation",
      "custom software",
    ],
    openGraph: {
      title: `${page.title} | AxonDigital Services`,
      description: page.description,
      type: "article",
      url: `https://axondigital.xyz/services/${slug}`,
      siteName: "AxonDigital",
      images: [
        {
          url: "/banner.webp",
          width: 1200,
          height: 630,
          alt: `${page.title} - AxonDigital Services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | AxonDigital`,
      description: page.description,
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
      canonical: `https://axondigital.xyz/services/${slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = servicesPages[slug as keyof typeof servicesPages];

  if (!page) {
    return <div>Page not found</div>;
  }

  const contactForm = {
    title: "Contact Us",
    subtitle: "Fill out the form, and we’ll get back to you within 24 hours.",
    fields: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
    },
    buttonText: "Send Message",
    message: `I’d like to discuss the service: ${page.title}`,
  };

  return (
    <main className="flex flex-1 flex-col bg-white overflow-auto">
      <Header />

      <div className="digital-style flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">
              {page.title}
            </h1>
            <p className="text-gray-700 text-center mb-8">{page.description}</p>
            <div className="prose prose-lg max-w-none mt-8">
              <h2 className="text-2xl font-bold mt-4 text-gray-900">
                When do you need it?
              </h2>
              <p className="text-gray-700">{page.whenDoYouNeedIt}</p>
            </div>

            <div className="prose prose-lg max-w-none mt-8">
              <h2 className="text-2xl font-bold mt-4 text-gray-900">
                What’s included?
              </h2>
              {page.whatsIncluded.items.map((item) => (
                <div key={item.title}>
                  <h2 className="text-xl font-bold mt-4 text-gray-900">
                    {item.title}
                  </h2>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="prose prose-lg max-w-none mt-8">
              <h2 className="text-2xl font-bold mt-4 text-gray-900">
                What you get
              </h2>
              <p className="text-gray-700">{page.whatYouGet}</p>
            </div>
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
