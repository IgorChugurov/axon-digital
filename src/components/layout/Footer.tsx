import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { chromeCopy, navItems, site } from "@/content/site";

const footerNav = [
  navItems[0],
  navItems[2],
  navItems[3],
  navItems[1],
] as const;

export function Footer({ locale }: { locale: Locale }) {
  const copy = chromeCopy[locale];

  return (
    <footer
      id="contact"
      className="scroll-mt-20 relative overflow-hidden bg-ink text-background"
    >
      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 px-8 py-14 lg:grid-cols-[443px_minmax(0,793px)] lg:justify-between lg:gap-x-[140px] lg:pt-14 lg:pb-10">
        <div className="flex flex-col gap-10 lg:min-h-[286px]">
          <Image src="/brand/mark.svg" alt="" width={56} height={56} />
          <p className="max-w-[443px] text-pretty text-[24px] leading-normal tracking-[-0.48px] text-[#939393]">
            {locale === "uk" ? (
              <>
                Обговоримо архітектуру проєкту. Відповідь команди протягом{" "}
                <span className="text-orange">24 годин.</span>
              </>
            ) : (
              <>
                Discuss your project architecture. Response from the team
                within <span className="text-orange">24 hours.</span>
              </>
            )}
          </p>
          <p className="mt-auto text-[10px] leading-[1.1] tracking-[-0.4px] text-[#939393]">
            {copy.rights} {site.name} {site.copyrightYear}
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:gap-[72px]">
          <a
            href={`mailto:${site.email}`}
            className="border-b border-[#939393] pb-1 text-3xl leading-normal tracking-[-0.02em] text-orange lg:text-[64px]"
          >
            {site.email}
          </a>
          <div>
            <p className="mb-3 text-[16px] tracking-[-0.32px]">{copy.map}</p>
            <ul className="flex flex-wrap gap-x-10 gap-y-2 text-[16px] tracking-[-0.32px] text-[#939393] lg:justify-between lg:gap-x-0">
              {footerNav.map((item) => (
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
        className="pointer-events-none relative z-0 select-none px-2 text-center text-[18vw] leading-[1.1] tracking-tight text-background/[0.06] lg:bg-clip-text lg:text-[238px] lg:tracking-[-9.52px] lg:text-transparent lg:[background-image:linear-gradient(94.58deg,rgba(16,16,16,0.9)_0.58%,rgba(71,71,71,0.4)_52.31%,rgba(16,16,16,0.9)_99.73%)]"
      >
        {site.name}
      </p>
    </footer>
  );
}
