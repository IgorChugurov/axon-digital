import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { expertiseAreas, expertisePageCopy } from "@/content/expertise";

export function ExpertiseIndex({ locale }: { locale: Locale }) {
  const pageCopy = expertisePageCopy[locale];

  return (
    <>
      <section className="px-8 py-[60px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1376px] flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
              {pageCopy.eyebrow}
            </p>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.04em] text-ink">
              {pageCopy.title}
            </h1>
          </div>
          <p className="max-w-[793px] text-pretty text-[24px] leading-[1.1] tracking-[-0.72px] text-[#676767]">
            {pageCopy.intro}
          </p>
        </div>
      </section>

      <section className="px-8" aria-label={pageCopy.eyebrow}>
        <ul className="mx-auto grid max-w-[1376px] border-t border-l border-muted lg:grid-cols-2">
          {expertiseAreas.map((area) => {
            const copy = area.copy[locale];

            return (
              <li
                key={area.slug}
                className="border-r border-b border-muted"
              >
                <Link
                  href={`/expertise/${area.slug}`}
                  aria-label={`${pageCopy.openArea}: ${copy.title}`}
                  className="group relative flex min-h-[340px] flex-col justify-between gap-12 bg-cream p-8 transition-colors hover:bg-green hover:text-background focus-visible:bg-green focus-visible:text-background focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-orange"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-[48px] leading-none tracking-[-0.04em] text-orange">
                      {area.id}
                    </span>
                    <ArrowUpRight
                      className="size-8 shrink-0 text-green transition-colors group-hover:text-orange group-focus-visible:text-orange"
                      aria-hidden
                    />
                  </div>
                  <div className="flex max-w-[560px] flex-col gap-4">
                    <h2 className="text-balance text-[28px] leading-[1.1] tracking-[-0.04em] lg:text-[32px]">
                      {copy.title}
                    </h2>
                    <p className="text-pretty text-[16px] leading-[1.3] tracking-[-0.32px] text-[#676767] transition-colors group-hover:text-background/80 group-focus-visible:text-background/80">
                      {copy.summary}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
