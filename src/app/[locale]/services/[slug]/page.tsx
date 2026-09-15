import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import {
  getService,
  services,
  servicesPageCopy,
} from "@/content/services";
import { getLocale } from "@/i18n/get-locale";
import { pageMetadata } from "../../../shared-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const service = getService(slug);

  if (!service) {
    return {
      title: `${servicesPageCopy[locale].notFoundTitle} | Axon Digital`,
    };
  }

  const copy = service.copy[locale];

  return pageMetadata({
    locale,
    title: `${copy.metaTitle} | Axon Digital`,
    description: copy.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="flex-1">
      <ServiceDetail service={service} locale={locale} />
    </main>
  );
}
