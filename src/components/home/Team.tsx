import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/content/home";
import { team } from "@/content/team";

export function Team({ locale, copy }: { locale: Locale; copy: HomeCopy }) {
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto grid max-w-[1376px] items-end gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-green">{copy.teamEyebrow}</p>
          <h2 className="mt-2 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight">
            {copy.teamTitle}
          </h2>
        </div>
        <p className="text-lg leading-7 text-muted">{copy.teamBody}</p>
      </div>
      <ul className="mx-auto mt-14 grid max-w-[1376px] gap-4 md:grid-cols-2">
        {team.map((person, index) => (
          <li
            key={person.id}
            className={`flex overflow-hidden bg-cream ${
              index % 2 === 1 ? "md:translate-x-8" : ""
            }`}
          >
            <div
              className={`w-1.5 shrink-0 ${person.accent === "green" ? "bg-green" : "bg-orange"}`}
            />
            <Image
              src={person.photo}
              alt={person.name}
              width={192}
              height={240}
              className="h-[240px] w-40 object-cover"
            />
            <div className="flex flex-1 flex-col justify-between p-4">
              <h3 className="text-2xl leading-tight font-medium">{person.name}</h3>
              <p className="text-sm text-muted">{person.role[locale]}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
