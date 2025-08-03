import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://axondigital.xyz";
  const currentDate = new Date().toISOString();

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/platform`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/public-offer`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Services pages
  const servicesPages = [
    "web-app-development",
    "website-creation",
    "ai-integration",
    "process-automation",
    "tvorflow-platform",
    "spec-documentation",
    "documentation-audit",
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Solutions pages
  const solutionsPages = [
    "oblikflow-en",
    "oblikflow-ua",
    "education-platform",
    "healthcare-systems",
    "ecommerce-platforms",
    "realestate-platform",
    "fintech-platform",
    "enterprise-process-automation",
    "ai-integration",
  ].map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Expertise pages
  const expertisePages = [
    "fintech-financial",
    "healthcare-medtech",
    "ecommerce-retail",
    "enterprise-corporate",
    "education-edtech",
    "proptech-realestate",
  ].map((slug) => ({
    url: `${baseUrl}/expertise/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...mainPages, ...servicesPages, ...solutionsPages, ...expertisePages];
}
