import Image from "next/image";
import { partnershipLogos, type HomeCopy } from "@/content/home";

export function Partnership({ copy }: { copy: HomeCopy }) {
  return (
    <section className="flex flex-col items-center gap-16 px-8 py-[60px] lg:py-[120px]">
      <div className="flex w-full flex-col items-center gap-2">
        <p className="text-center text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
          {copy.partnershipEyebrow}
        </p>
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.2] tracking-[-0.04em] text-ink">
            {copy.partnershipTitle}
          </h2>
          <p className="max-w-[676px] text-center text-pretty text-[24px] leading-[1.1] tracking-[-0.72px] text-[#676767]">
            {copy.partnershipBody}
          </p>
        </div>
      </div>

      <ul className="@container flex w-full flex-wrap justify-center gap-2">
        {partnershipLogos.map((logo) => (
          <li
            key={logo.src}
            className="flex aspect-square w-full shrink-0 items-center justify-center bg-cream @min-[452px]:w-[calc((100%-8px)/2)] @min-[682px]:w-[calc((100%-16px)/3)] @min-[912px]:w-[calc((100%-24px)/4)] @min-[1142px]:w-[calc((100%-32px)/5)] @min-[1372px]:w-[calc((100%-40px)/6)]"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
