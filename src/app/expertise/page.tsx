import type { Metadata } from "next";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ExpertiseIndex } from "@/components/expertise/ExpertiseIndex";
import { expertisePageCopy } from "@/content/expertise";
import { homeCopy } from "@/content/home";
import { getLocale } from "@/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = expertisePageCopy[locale];

  return {
    title: `${copy.title} | Axon Digital`,
    description: copy.intro,
  };
}

export default async function ExpertisePage() {
  const locale = await getLocale();

  return (
    <main className="flex-1">
      <ExpertiseIndex locale={locale} />
      <div className="py-[60px] lg:py-[120px]">
        <CtaBanner locale={locale} copy={homeCopy[locale]} />
      </div>
    </main>
  );
}
