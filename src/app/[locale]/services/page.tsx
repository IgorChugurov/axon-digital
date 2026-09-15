import type { Metadata } from "next";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { servicesPageCopy } from "@/content/services";
import { getLocale } from "@/i18n/get-locale";
import { pageMetadata } from "../../shared-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = servicesPageCopy[locale];

  return pageMetadata({
    locale,
    title: `${copy.eyebrow} | Axon Digital`,
    description: copy.intro,
    path: "/services",
  });
}

export default async function ServicesPage() {
  const locale = await getLocale();

  return (
    <main className="flex-1">
      <ServicesIndex locale={locale} />
    </main>
  );
}
