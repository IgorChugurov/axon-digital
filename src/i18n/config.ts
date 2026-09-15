export const locales = ["en", "uk"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "uk";
}

// The default locale lives at the root, every other one behind its own prefix,
// so each page has exactly one address per language.
export function localeHref(locale: Locale, path: string): string {
  if (locale === defaultLocale) {
    return path;
  }

  if (path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path.startsWith("/#") ? path.slice(1) : path}`;
}

export function stripLocale(path: string): string {
  for (const locale of locales) {
    if (path === `/${locale}`) {
      return "/";
    }

    if (path.startsWith(`/${locale}/`)) {
      return path.slice(locale.length + 1);
    }
  }

  return path;
}
