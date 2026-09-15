import type { Metadata } from "next";
import { CtaBanner } from "@/components/home/CtaBanner";
import { DeliveryTeaser } from "@/components/home/DeliveryTeaser";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { HowWeWork } from "@/components/home/HowWeWork";
import { Partnership } from "@/components/home/Partnership";
import { Services } from "@/components/home/Services";
import { Team } from "@/components/home/Team";
import { homeCopy } from "@/content/home";
import { chromeCopy } from "@/content/site";
import { getLocale } from "@/i18n/get-locale";
import { pageMetadata } from "../shared-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = chromeCopy[locale];

  return pageMetadata({
    locale,
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: "/",
  });
}

export default async function Home() {
  const locale = await getLocale();
  const copy = homeCopy[locale];

  return (
    <main className="flex-1">
      <Hero locale={locale} copy={copy} />
      <DeliveryTeaser copy={copy} locale={locale} />
      <HowWeWork copy={copy} />
      <Services locale={locale} copy={copy} />
      <Partnership copy={copy} />
      <Team locale={locale} copy={copy} />
      <CtaBanner locale={locale} copy={copy} />
      <Faq copy={copy} locale={locale} />
    </main>
  );
}
