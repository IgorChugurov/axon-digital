import type { Metadata } from "next";
import localFont from "next/font/local";
import { ContactModalProvider } from "@/components/contact/ContactModalProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getLocale } from "@/i18n/get-locale";
import { site } from "@/content/site";
import "./globals.css";

const kharkivTone = localFont({
  src: "../../public/fonts/Kharkiv-Tone-04-10-2020/KharkivTone-regular.ttf",
  variable: "--font-kharkiv",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: site.name,
  description: "Full-cycle engineering studio. Engineering complex business logic since 2013.",
};

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
