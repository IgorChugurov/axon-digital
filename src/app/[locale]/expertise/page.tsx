import type { Metadata } from "next";
import { ExpertiseIndex } from "@/components/expertise/ExpertiseIndex";
import { expertisePageCopy } from "@/content/expertise";
import { getLocale } from "@/i18n/get-locale";
import { pageMetadata } from "../../shared-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = expertisePageCopy[locale];

  return pageMetadata({
    locale,
    title: `${copy.title} | Axon Digital`,
    description: copy.metaDescription,
    path: "/expertise",
  });
}

export default async function ExpertisePage() {
  const locale = await getLocale();

  return (
    <main className="flex-1">
      <ExpertiseIndex locale={locale} />
    </main>
  );
}
