import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { buttonClassName } from "@/components/ui/Button";
import { expertisePageCopy } from "@/content/expertise";
import { localeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/get-locale";

export default async function ExpertiseNotFound() {
  const locale = await getLocale();
  const copy = expertisePageCopy[locale];

  return (
    <main className="flex flex-1 items-center px-8 py-[120px]">
      <div className="mx-auto flex w-full max-w-[793px] flex-col items-center gap-8 text-center">
        <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
          404
        </p>
        <div className="flex flex-col gap-4">
          <h1 className="text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.04em]">
            {copy.notFoundTitle}
          </h1>
          <p className="text-pretty text-[24px] leading-[1.2] tracking-[-0.72px] text-[#676767]">
            {copy.notFoundBody}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={localeHref(locale, "/expertise")}
            className={buttonClassName("green")}
          >
            <ArrowLeft className="size-5" aria-hidden />
            {copy.back}
          </Link>
          <Link
            href={localeHref(locale, "/")}
            className={buttonClassName("outline")}
          >
            {copy.notFoundHome}
            <ArrowUpRight className="size-5" aria-hidden />
          </Link>
        </div>
      </div>
    </main>
  );
}
