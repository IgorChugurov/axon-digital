import { Approach } from "@/components/home/Approach";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { HowWeWork } from "@/components/home/HowWeWork";
import { Partnership } from "@/components/home/Partnership";
import { Services } from "@/components/home/Services";
import { Team } from "@/components/home/Team";
import { homeCopy } from "@/content/home";
import { getLocale } from "@/i18n/get-locale";

export default async function Home() {
  const locale = await getLocale();
  const copy = homeCopy[locale];

  return (
    <main className="flex-1">
      <Hero locale={locale} copy={copy} />
      <Approach copy={copy} />
      <HowWeWork copy={copy} />
      <Services locale={locale} copy={copy} />
      <Partnership copy={copy} />
      <Team locale={locale} copy={copy} />
      <CtaBanner locale={locale} copy={copy} />
      <Faq copy={copy} />
    </main>
  );
}
