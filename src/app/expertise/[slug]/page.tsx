import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpertiseDetail } from "@/components/expertise/ExpertiseDetail";
import {
  expertiseAreas,
  expertisePageCopy,
  getExpertiseArea,
} from "@/content/expertise";
import { getLocale } from "@/i18n/get-locale";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return expertiseAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const area = getExpertiseArea(slug);

  if (!area) {
    return {
      title: `${expertisePageCopy[locale].notFoundTitle} | Axon Digital`,
    };
  }

  const copy = area.copy[locale];

  return {
    title: `${copy.metaTitle} | Axon Digital`,
    description: copy.metaDescription,
  };
}

export default async function ExpertiseAreaPage({ params }: Props) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const area = getExpertiseArea(slug);

  if (!area) {
    notFound();
  }

  return (
    <main className="flex-1">
      <ExpertiseDetail area={area} locale={locale} />
    </main>
  );
}
