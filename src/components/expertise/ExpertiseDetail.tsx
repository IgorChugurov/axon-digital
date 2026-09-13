import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CtaBanner } from "@/components/home/CtaBanner";
import {
  expertisePageCopy,
  type ExpertiseArea,
} from "@/content/expertise";
import { homeCopy } from "@/content/home";
import { services, type Service } from "@/content/services";
import type { Locale } from "@/i18n/config";

export function ExpertiseDetail({
  area,
  locale,
}: {
  area: ExpertiseArea;
  locale: Locale;
}) {
  const copy = area.copy[locale];
  const pageCopy = expertisePageCopy[locale];
  const relatedServices = area.relatedServices
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));

  return (
    <>
      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col gap-12">
          <Link
            href="/expertise"
            className="inline-flex w-fit items-center gap-2 text-[16px] text-green transition-colors hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            <ArrowLeft className="size-5" aria-hidden />
            {pageCopy.back}
          </Link>

          <div className="flex max-w-[1024px] flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
                {pageCopy.eyebrow} / {area.id}
              </p>
              <h1 className="text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.04em] text-ink">
                {copy.title}
              </h1>
            </div>
            <p className="max-w-[793px] text-pretty text-[24px] leading-[1.15] tracking-[-0.72px] text-[#676767] lg:text-[32px] lg:tracking-[-1.28px]">
              {copy.hero}
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col gap-12">
          <div>
            <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
              {pageCopy.eyebrow}
            </p>
            <h2 className="mt-2 max-w-[18ch] text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
              {pageCopy.points}
            </h2>
          </div>

          <ul className="grid border-t border-l border-muted md:grid-cols-2">
            {copy.points.map((point, index) => (
              <li
                key={point.title}
                className="flex min-h-[280px] flex-col justify-between gap-10 border-r border-b border-muted bg-cream p-8"
              >
                <span className="text-[48px] leading-none tracking-[-0.04em] text-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-4">
                  <h3 className="text-balance text-[28px] leading-[1.1] tracking-[-0.04em] lg:text-[32px]">
                    {point.title}
                  </h3>
                  <p className="text-pretty text-[16px] leading-[1.3] tracking-[-0.32px] text-[#676767]">
                    {point.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto grid max-w-[1376px] gap-12 lg:grid-cols-[443px_minmax(0,676px)] lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
              {pageCopy.eyebrow}
            </p>
            <h2 className="text-balance text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
              {pageCopy.situations}
            </h2>
          </div>
          <ul className="border-b border-muted">
            {copy.situations.map((situation) => (
              <li
                key={situation}
                className="border-t border-muted py-6 text-pretty text-[20px] leading-[1.2] tracking-[-0.6px] text-[#676767] lg:text-[24px]"
              >
                {situation}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto max-w-[1376px] bg-cream px-8 py-12 lg:px-12 lg:py-16">
          <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
            {pageCopy.outcome}
          </p>
          <p className="mt-6 max-w-[1024px] text-pretty text-[28px] leading-[1.15] tracking-[-0.04em] text-ink lg:text-[40px]">
            {copy.outcome}
          </p>
        </div>
      </section>

      <section className="py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <h2 className="px-8 text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.04em]">
            {pageCopy.relatedServices}
          </h2>
          <ul className="border-b border-muted">
            {relatedServices.map((service) => (
              <li key={service.slug} className="border-t border-muted">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center justify-between gap-6 px-8 py-8 transition-colors hover:bg-orange hover:text-background focus-visible:bg-orange focus-visible:text-background focus-visible:outline-none"
                >
                  <span className="flex min-w-0 items-center gap-6 lg:gap-[140px]">
                    <span className="text-[32px] leading-[1.1] tracking-[-1.28px]">
                      {service.id}
                    </span>
                    <span className="text-balance text-[24px] leading-[1.1] tracking-[-0.04em] lg:text-[32px]">
                      {service.copy[locale].title}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-8 shrink-0 text-green group-hover:text-background group-focus-visible:text-background"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="py-[60px] lg:py-[120px]">
        <CtaBanner locale={locale} copy={homeCopy[locale]} />
      </div>
    </>
  );
}
