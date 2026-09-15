import type { MetadataRoute } from "next";
import { expertiseAreas } from "@/content/expertise";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { locales, localeHref } from "@/i18n/config";

const paths: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/delivery", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.8,
  })),
  { path: "/expertise", priority: 0.8 },
  ...expertiseAreas.map((area) => ({
    path: `/expertise/${area.slug}`,
    priority: 0.7,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, `${site.url}${localeHref(locale, path)}`]),
    );

    return locales.map((locale) => ({
      url: `${site.url}${localeHref(locale, path)}`,
      lastModified,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority,
      alternates: { languages },
    }));
  });
}
