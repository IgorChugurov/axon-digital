import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/content/home";
import { team } from "@/content/team";

function MemberCard({
  person,
  locale,
}: {
  person: (typeof team)[number];
  locale: Locale;
}) {
  const accent = person.accent === "green" ? "green" : "orange";

  return (
    <li className="relative flex overflow-hidden bg-cream min-[1440px]:h-[240px] min-[1440px]:w-[559px] min-[1440px]:shrink-0 min-[1440px]:overflow-visible min-[1440px]:bg-transparent">
      <div
        className={`w-1.5 shrink-0 min-[1440px]:hidden ${
          accent === "green" ? "bg-green" : "bg-orange"
        }`}
      />
      <div className="relative h-[240px] w-40 shrink-0 min-[1440px]:absolute min-[1440px]:top-4 min-[1440px]:left-4 min-[1440px]:h-[208px] min-[1440px]:w-[160px]">
        <Image
          src={person.photo}
          alt={person.name}
          width={160}
          height={208}
          className="size-full object-cover grayscale"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4 min-[1440px]:contents">
        <h3 className="text-2xl leading-tight min-[1440px]:absolute min-[1440px]:top-[127px] min-[1440px]:left-48 min-[1440px]:w-[200px] min-[1440px]:text-[32px] min-[1440px]:leading-[1.1] min-[1440px]:tracking-[-0.96px]">
          {person.name}
        </h3>
        <p
          className={`text-balance text-sm min-[1440px]:absolute min-[1440px]:top-[205px] min-[1440px]:left-48 min-[1440px]:text-[16px] min-[1440px]:leading-[1.2] min-[1440px]:tracking-[-0.64px] ${
            accent === "green" ? "text-green" : "text-orange"
          }`}
        >
          {person.role[locale]}
        </p>
      </div>
      <div
        className={`absolute top-[25px] left-[423px] hidden h-[190px] border-l border-dashed min-[1440px]:block ${
          accent === "green" ? "border-green" : "border-orange"
        }`}
      />
    </li>
  );
}

export function Team({ locale, copy }: { locale: Locale; copy: HomeCopy }) {
  return (
    <section className="px-8 py-[60px] lg:py-[120px]">
      <div className="mx-auto flex max-w-[1376px] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
            {copy.teamEyebrow}
          </p>
          <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.2] tracking-[-0.04em] text-ink">
            {copy.teamTitle}
          </h2>
        </div>
        <p className="max-w-[676px] text-pretty text-[24px] leading-[1.1] tracking-[-0.72px] text-[#676767] lg:text-right">
          {copy.teamBody}
        </p>
      </div>

      <ul className="mx-auto mt-14 flex max-w-[1376px] flex-col gap-4 lg:hidden">
        {team.map((person) => (
          <MemberCard key={person.id} person={person} locale={locale} />
        ))}
      </ul>

      <ul className="mx-auto mt-14 hidden max-w-[1376px] grid-cols-2 gap-4 lg:max-[1440px]:grid">
        {team.map((person) => (
          <MemberCard key={person.id} person={person} locale={locale} />
        ))}
      </ul>

      <div className="mx-auto mt-12 hidden max-w-[1376px] flex-col gap-10 min-[1440px]:flex">
        <ul className="flex gap-6">
          {team.slice(0, 2).map((person) => (
            <MemberCard key={person.id} person={person} locale={locale} />
          ))}
        </ul>
        <ul className="flex gap-6 pl-[233px]">
          {team.slice(2).map((person) => (
            <MemberCard key={person.id} person={person} locale={locale} />
          ))}
        </ul>
      </div>
    </section>
  );
}
