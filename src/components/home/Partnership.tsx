import Image from "next/image";
import { partnershipLogos, type HomeCopy } from "@/content/home";

export function Partnership({ copy }: { copy: HomeCopy }) {
  return (
    <section className="px-4 py-20 md:px-8">
      <p className="text-center text-sm font-medium text-green">
        {copy.partnershipEyebrow}
      </p>
      <h2 className="mt-2 text-center text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight">
        {copy.partnershipTitle}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-7 text-muted">
        {copy.partnershipBody}
      </p>
      <ul className="mx-auto mt-14 grid max-w-[1376px] grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {partnershipLogos.map((logo) => (
          <li
            key={logo.src}
            className="flex aspect-square items-center justify-center bg-cream p-6"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={182}
              height={44}
              className="max-h-16 w-auto max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
