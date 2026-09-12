import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { chromeCopy, navItems, site } from "@/content/site";

export function Footer({ locale }: { locale: Locale }) {
  const copy = chromeCopy[locale];

  return (
    <footer className="relative overflow-hidden bg-ink text-background">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:px-8">
        <div className="flex flex-col gap-10">
          <Image src="/brand/mark.svg" alt="" width={56} height={56} />
          <p className="max-w-sm text-lg leading-7 text-muted">
            {locale === "uk" ? (
              <>
                Обговоримо архітектуру проєкту. Відповідь команди протягом{" "}
                <span className="text-orange">24 годин.</span>
              </>
            ) : (
              <>
                Discuss your project architecture. Response from the team within{" "}
                <span className="text-orange">24 hours.</span>
              </>
            )}
          </p>
          <p className="mt-auto text-xs text-muted/80">
            {copy.rights} {site.name} {site.copyrightYear}
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <div>
            <p className="mb-3 text-sm font-medium">{copy.socials}</p>
            <ul className="flex flex-wrap gap-x-10 gap-y-2 text-[15px] text-muted">
              {site.socials.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-orange hover:underline">
                    {item.label[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="border-b border-muted/40 pb-3 text-3xl font-medium text-orange md:text-5xl"
          >
            {site.email}
          </a>
          <div>
            <p className="mb-3 text-sm font-medium">{copy.map}</p>
            <ul className="flex flex-wrap gap-x-10 gap-y-2 text-[15px] text-muted">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-background">
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none select-none px-2 text-[18vw] leading-none font-bold tracking-tight text-background/[0.06]"
      >
        {site.name}
      </p>
    </footer>
  );
}
