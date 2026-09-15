import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

// The global 404 renders outside the locale segment, so it cannot read the
// route params. The locale travels to it in this header instead.
const localeHeader = "x-locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The default locale is served from the root, so its prefix would be a second
  // address for the same page.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url);
  }

  const prefixed = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (prefixed) {
    const headers = new Headers(request.headers);
    headers.set(localeHeader, prefixed);
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  const headers = new Headers(request.headers);
  headers.set(localeHeader, defaultLocale);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\.).*)"],
};
