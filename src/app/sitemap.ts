import type { MetadataRoute } from "next";
import { expertiseAreas } from "@/content/expertise";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/expertise`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...expertiseAreas.map((area) => ({
      url: `${site.url}/expertise/${area.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
