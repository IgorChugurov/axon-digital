import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { chromeCopy, navItems, site, teamNavItem } from "@/content/site";
import { defaultLocale, isLocale, localeHref } from "@/i18n/config";
import "./globals.css";

const kharkivTone = localFont({
  src: "../../public/fonts/Kharkiv-Tone-04-10-2020/KharkivTone-regular.ttf",
  variable: "--font-kharkiv",
  display: "swap",
  weight: "400",
});

// Unmatched addresses never reach the locale segment, so the proxy passes the
// language it resolved for the request.
async function requestLocale() {
  const value = (await headers()).get("x-locale") ?? undefined;

  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const copy = chromeCopy[await requestLocale()];

  return {
    title: copy.notFoundMetaTitle,
    description: copy.notFoundBody,
  };
}

export default async function GlobalNotFound() {
  const locale = await requestLocale();
  const copy = chromeCopy[locale];
  const links = [...navItems, teamNavItem];

  return (
    <html lang={locale} className={`${kharkivTone.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-ink">
        <header className="h-20">
          <div className="mx-auto flex h-full max-w-[1440px] items-center px-8">
            <Link
              href={localeHref(locale, "/")}
              className="flex items-center gap-2"
            >
              <Image src="/brand/mark.svg" alt="" width={32} height={32} />
              <span className="whitespace-nowrap text-2xl leading-none tracking-[-0.96px]">
                {site.name}
              </span>
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center px-8 py-[60px] lg:py-[120px]">
          <div className="mx-auto flex w-full max-w-[793px] flex-col gap-8">
            <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
              404
            </p>
            <div className="flex flex-col gap-4">
              <h1 className="text-balance text-[clamp(2rem,6vw,5rem)] leading-[1.05] tracking-[-0.04em]">
                {copy.notFoundTitle}
              </h1>
              <p className="text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-[#676767] lg:text-[24px]">
                {copy.notFoundBody}
              </p>
            </div>

            <ul className="border-b border-muted">
              {links.map((item) => (
                <li key={item.href} className="border-t border-muted">
                  <Link
                    href={localeHref(locale, item.href)}
                    className="group flex items-center justify-between gap-6 py-6 text-[24px] leading-[1.1] tracking-[-0.04em] hover:text-green lg:text-[32px]"
                  >
                    {item.label[locale]}
                    <ArrowUpRight
                      className="size-7 shrink-0 text-green"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={localeHref(locale, "/")}
              className="inline-flex h-12 w-fit items-center justify-center gap-2 bg-green px-6 text-base tracking-[-0.32px] text-background hover:bg-[#2d5228]"
            >
              {copy.notFoundHome}
              <ArrowUpRight className="size-6" aria-hidden />
            </Link>
          </div>
        </main>

        <footer className="px-8 py-10">
          <div className="mx-auto max-w-[1440px] text-[16px] tracking-[-0.32px] text-[#939393]">
            {copy.rights} {site.name} {site.copyrightYear}
          </div>
        </footer>
      </body>
    </html>
  );
}
