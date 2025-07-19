import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { MoreExpertise } from "@/components/MoreExpertise";

const expertiseContent: Record<
  string,
  {
    title: string;
    intro: string;
    content: string[];
  }
> = {
  "fintech-financial": {
    title: "Fintech & Financial Services",
    intro:
      "We specialize in building secure, compliant financial technology solutions for payment processors, digital banks, investment platforms, and fintech startups. Our expertise covers regulatory compliance, real-time processing, and enterprise-grade security.",
    content: [
      "Payment processing systems with multi-currency support, fraud detection, and real-time transaction monitoring built with secure APIs and blockchain integration.",
      "Digital banking platforms including account management, loan processing, KYC/AML compliance, and regulatory reporting for financial institutions.",
      "Investment and trading platforms with real-time market data, portfolio management, risk assessment, and algorithmic trading capabilities.",
      "Cryptocurrency and DeFi solutions including wallet services, exchange platforms, smart contracts, and regulatory compliance frameworks.",
      "Financial analytics and reporting systems with automated compliance reporting, audit trails, and real-time business intelligence dashboards.",
    ],
  },
  "healthcare-medtech": {
    title: "Healthcare & Medical Technology",
    intro:
      "We develop HIPAA-compliant healthcare solutions including electronic health records, telemedicine platforms, clinical management systems, and medical device integrations. Our focus is on improving patient outcomes while ensuring data security and regulatory compliance.",
    content: [
      "Electronic Health Record (EHR) systems with FHIR compliance, patient portals, clinical decision support, and seamless integration with medical devices.",
      "Telemedicine and remote patient monitoring platforms with video consultations, real-time health data collection, and automated alert systems.",
      "Clinical workflow management systems including appointment scheduling, patient flow optimization, billing integration, and staff coordination tools.",
      "Medical device integration and IoT solutions for real-time patient monitoring, automated data collection, and clinical alert systems.",
      "Healthcare analytics and population health management with predictive modeling, outcome tracking, and public health reporting capabilities.",
    ],
  },
  "ecommerce-retail": {
    title: "E-commerce & Retail Technology",
    intro:
      "We create comprehensive e-commerce solutions and retail technology platforms that drive sales growth, improve customer experience, and optimize operations. Our expertise spans from small online stores to large-scale marketplace platforms.",
    content: [
      "E-commerce platforms with advanced product catalogs, dynamic pricing, inventory management, and multi-channel sales integration across web and mobile.",
      "Marketplace development with vendor management, commission systems, product reviews, and integrated payment processing for multi-vendor platforms.",
      "Customer experience optimization including personalization engines, recommendation systems, cart abandonment recovery, and loyalty program management.",
      "Inventory and supply chain management with real-time tracking, automated reordering, demand forecasting, and supplier integration systems.",
      "Retail analytics and business intelligence with sales reporting, customer behavior analysis, profit margin optimization, and market trend insights.",
    ],
  },
  "education-edtech": {
    title: "Education & Learning Platforms",
    intro:
      "We develop educational technology solutions that enhance learning experiences, streamline administrative processes, and improve educational outcomes. Our platforms serve schools, universities, corporate training, and online education providers.",
    content: [
      "Learning Management Systems (LMS) with course creation, student progress tracking, assessment tools, and collaborative learning environments.",
      "Student Information Systems with enrollment management, grade tracking, attendance monitoring, and parent-teacher communication portals.",
      "Online course platforms with video streaming, interactive content, certification tracking, and payment processing for educational institutions.",
      "Corporate training solutions with skills assessment, compliance training, performance tracking, and integration with HR management systems.",
      "Educational analytics with learning outcome analysis, student performance prediction, curriculum optimization, and institutional reporting dashboards.",
    ],
  },
  "proptech-realestate": {
    title: "Real Estate & Property Technology",
    intro:
      "We build property technology solutions that streamline real estate operations, improve tenant experiences, and optimize property management. Our platforms serve property managers, real estate agents, and commercial property owners.",
    content: [
      "Property management platforms with lease tracking, rent collection, maintenance scheduling, and tenant communication portals for residential and commercial properties.",
      "Real estate CRM systems with lead management, client tracking, property listings, and automated marketing campaigns for real estate professionals.",
      "Tenant and resident portals with online rent payments, maintenance requests, community features, and lease management for improved tenant satisfaction.",
      "Smart building integration with IoT sensors, energy management, security systems, and predictive maintenance for modern commercial properties.",
      "Real estate analytics with market analysis, property valuation, investment performance tracking, and portfolio management tools for investors.",
    ],
  },
  "enterprise-corporate": {
    title: "Enterprise & Corporate Solutions",
    intro:
      "We develop large-scale enterprise applications and corporate solutions that handle complex business processes, integrate with existing systems, and scale with organizational growth. Our expertise covers ERP, CRM, and custom enterprise software.",
    content: [
      "Enterprise Resource Planning (ERP) systems with financial management, human resources, supply chain optimization, and business intelligence integration.",
      "Customer Relationship Management (CRM) platforms with sales pipeline management, customer service automation, and marketing campaign integration.",
      "Business process automation with workflow management, approval systems, document management, and integration with existing enterprise software.",
      "Data management and analytics platforms with data warehousing, business intelligence, predictive analytics, and executive reporting dashboards.",
      "System integration and API development for connecting legacy systems, third-party services, and modern cloud-based applications in enterprise environments.",
    ],
  },
};

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
