import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";

// Next replaces the whole openGraph block when a segment defines it, so every
// page has to restate the shared fields instead of inheriting them.
export function pageMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "uk" ? "uk_UA" : "en_US",
      title,
      description,
      ...(path ? { url: path } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
