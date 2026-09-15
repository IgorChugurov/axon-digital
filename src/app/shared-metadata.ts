import type { Metadata } from "next";
import { site } from "@/content/site";
import { defaultLocale, localeHref, type Locale } from "@/i18n/config";

// Next replaces the whole openGraph block when a segment defines it, so every
// page has to restate the shared fields instead of inheriting them — including
// the generated preview image, which is otherwise dropped outside the root.
function previewImage(locale: Locale) {
  return {
    url: localeHref(locale, "/opengraph-image"),
    width: 1200,
    height: 630,
    alt: site.name,
  };
}

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
  const canonical = path ? localeHref(locale, path) : undefined;
  const image = previewImage(locale);

  return {
    title,
    description,
    ...(path
      ? {
          alternates: {
            canonical,
            languages: {
              en: localeHref("en", path),
              uk: localeHref("uk", path),
              "x-default": localeHref(defaultLocale, path),
            },
          },
        }
      : {}),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "uk" ? "uk_UA" : "en_US",
      title,
      description,
      ...(canonical ? { url: canonical } : {}),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
