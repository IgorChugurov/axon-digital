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
    <li className="relative flex overflow-hidden bg-cream lg:h-[240px] lg:w-[559px] lg:shrink-0 lg:overflow-visible lg:bg-transparent">
      <div
        className={`w-1.5 shrink-0 lg:hidden ${
          accent === "green" ? "bg-green" : "bg-orange"
        }`}
      />
      <div className="relative h-[240px] w-40 shrink-0 lg:absolute lg:top-4 lg:left-4 lg:h-[208px] lg:w-[160px]">
        <Image
          src={person.photo}
          alt={person.name}
          width={160}
          height={208}
          className="size-full object-cover grayscale"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4 lg:contents">
        <h3 className="text-2xl leading-tight lg:absolute lg:top-[127px] lg:left-48 lg:w-[200px] lg:text-[32px] lg:leading-[1.1] lg:tracking-[-0.96px]">
          {person.name}
        </h3>
        <p
          className={`text-sm lg:absolute lg:top-[205px] lg:left-48 lg:text-[16px] lg:leading-[1.2] lg:tracking-[-0.64px] ${
            accent === "green" ? "text-green" : "text-orange"
          }`}
        >
          {person.role[locale]}
        </p>
      </div>
      <div
        className={`absolute top-[25px] left-[423px] hidden h-[190px] border-l border-dashed lg:block ${
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
        <p className="max-w-[676px] text-[24px] leading-[1.1] tracking-[-0.72px] text-[#676767] lg:text-right">
          {copy.teamBody}
        </p>
      </div>

      <ul className="mx-auto mt-14 flex max-w-[1376px] flex-col gap-4 lg:hidden">
        {team.map((person) => (
          <MemberCard key={person.id} person={person} locale={locale} />
        ))}
      </ul>

      <div className="mx-auto mt-12 hidden max-w-[1376px] flex-col gap-10 lg:flex">
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
