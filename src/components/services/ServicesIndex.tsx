import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { services, servicesPageCopy } from "@/content/services";

export function ServicesIndex({ locale }: { locale: Locale }) {
  const pageCopy = servicesPageCopy[locale];

  return (
    <>
      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
              {pageCopy.eyebrow}
            </p>
            <h1 className="max-w-[18ch] text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.04em] text-ink">
              {pageCopy.title}
            </h1>
          </div>
          <p className="max-w-[676px] text-pretty text-[24px] leading-[1.1] tracking-[-0.72px] text-[#676767]">
            {pageCopy.intro}
          </p>
        </div>
      </section>

      <section aria-label={pageCopy.eyebrow}>
        <ul className="mx-auto w-full max-w-[1440px] border-b border-muted">
          {services.map((service) => {
            const copy = service.copy[locale];

            return (
              <li key={service.slug} className="border-t border-muted">
                <Link
                  href={`/services/${service.slug}`}
                  aria-label={`${pageCopy.openService}: ${copy.title}`}
                  className="group grid gap-6 px-8 py-8 transition-colors hover:bg-orange hover:text-background focus-visible:bg-orange focus-visible:text-background focus-visible:outline-none lg:grid-cols-[93px_minmax(260px,443px)_minmax(0,1fr)_32px] lg:items-center lg:gap-[48px]"
                >
                  <span className="text-[32px] leading-[1.1] tracking-[-1.28px]">
                    {service.id}
                  </span>
                  <h2 className="text-balance text-[28px] leading-[1.1] tracking-[-1.12px] lg:text-[32px]">
                    {copy.title}
                  </h2>
                  <p className="max-w-[560px] text-pretty text-[16px] leading-[1.3] tracking-[-0.32px] text-[#676767] transition-colors group-hover:text-background/80 group-focus-visible:text-background/80">
                    {copy.summary}
                  </p>
                  <ArrowUpRight
                    className="size-8 text-green transition-colors group-hover:text-background group-focus-visible:text-background"
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
