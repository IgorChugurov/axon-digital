import type { Metadata } from "next";
import { DeliveryPage } from "@/components/delivery/DeliveryPage";
import { deliveryCopy } from "@/content/delivery";
import { getLocale } from "@/i18n/get-locale";
import { pageMetadata } from "../../shared-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = deliveryCopy[locale];

  return pageMetadata({
    locale,
    title: `${copy.metaTitle} | Axon Digital`,
    description: copy.metaDescription,
    path: "/delivery",
  });
}

export default async function Delivery() {
  const locale = await getLocale();

  return (
    <main className="flex-1">
      <DeliveryPage locale={locale} />
    </main>
  );
}
