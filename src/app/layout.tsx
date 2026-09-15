import type { Metadata } from "next";
import localFont from "next/font/local";
import { ContactModalProvider } from "@/components/contact/ContactModalProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getLocale } from "@/i18n/get-locale";
import { chromeCopy, site } from "@/content/site";
import { pageMetadata } from "./shared-metadata";
import "./globals.css";

const kharkivTone = localFont({
  src: "../../public/fonts/Kharkiv-Tone-04-10-2020/KharkivTone-regular.ttf",
  variable: "--font-kharkiv",
  display: "swap",
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = chromeCopy[locale];

  return {
    metadataBase: new URL(site.url),
    ...pageMetadata({
      locale,
      title: copy.metaTitle,
      description: copy.metaDescription,
    }),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${kharkivTone.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-ink">
        <ContactModalProvider locale={locale}>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
        </ContactModalProvider>
      </body>
    </html>
  );
}
