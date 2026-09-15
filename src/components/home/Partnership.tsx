import Image from "next/image";
import {
  deliveryToolLogos,
  partnershipLogos,
  type HomeCopy,
} from "@/content/home";

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const tileBase =
  "flex aspect-square w-full shrink-0 flex-col items-center justify-center gap-4 bg-cream";

// Tiles grow one column at a time until the group is on a single row.
const tileWidths = [
  "@min-[452px]:w-[calc((100%-8px)/2)]",
  "@min-[682px]:w-[calc((100%-16px)/3)]",
  "@min-[912px]:w-[calc((100%-24px)/4)]",
  "@min-[1142px]:w-[calc((100%-32px)/5)]",
  "@min-[1372px]:w-[calc((100%-40px)/6)]",
];

function LogoGroup({
  label,
  logos,
  columns,
}: {
  label: string;
  logos: readonly Logo[];
  columns: number;
}) {
  const width = tileWidths.slice(0, columns - 1).join(" ");

  return (
    <div className="@container flex w-full flex-col gap-4">
      <p className="text-[16px] leading-[1.2] tracking-[-0.32px] text-muted">
        {label}
      </p>
      <ul className="flex w-full flex-wrap justify-center gap-2">
        {logos.map((logo) => (
          <li key={logo.src} className={`${tileBase} ${width}`}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
            {logo.caption ? (
              <span className="text-[16px] leading-none tracking-[-0.32px] text-ink">
                {logo.caption}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Partnership({ copy }: { copy: HomeCopy }) {
  return (
    <section className="flex flex-col items-center gap-16 px-8 py-[60px] lg:py-[120px]">
      <div className="flex w-full flex-col items-center gap-2">
        <p className="text-center text-[16px] leading-[1.2] tracking-[-0.64px] text-green">
          {copy.partnershipEyebrow}
        </p>
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-balance text-center text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.2] tracking-[-0.04em] text-ink">
            {copy.partnershipTitle}
          </h2>
          <p className="max-w-[676px] text-center text-pretty text-[24px] leading-[1.1] tracking-[-0.72px] text-[#676767]">
            {copy.partnershipBody}
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-[1376px] flex-col gap-12">
        <LogoGroup
          label={copy.partnershipDeliveryLabel}
          logos={deliveryToolLogos}
          columns={6}
        />
        <LogoGroup
          label={copy.partnershipStackLabel}
          logos={partnershipLogos}
          columns={6}
        />
      </div>
    </section>
  );
}
