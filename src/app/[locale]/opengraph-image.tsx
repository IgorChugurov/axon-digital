import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { homeCopy } from "@/content/home";
import { site } from "@/content/site";
import { defaultLocale, isLocale } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = homeCopy[isLocale(locale) ? locale : defaultLocale];

  const [fontData, mark] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "public/fonts/Kharkiv-Tone-04-10-2020/KharkivTone-regular.ttf",
      ),
    ),
    readFile(join(process.cwd(), "public/brand/mark.svg")),
  ]);

  const markSrc = `data:image/svg+xml;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fffdf8",
          color: "#101010",
          padding: 80,
          fontFamily: "Kharkiv Tone",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={markSrc} alt="" width={72} height={72} />
          <span style={{ fontSize: 56, letterSpacing: "-0.03em" }}>
            {site.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 32, color: "#36632f" }}>
            {copy.heroEyebrow}
          </span>
          <span
            style={{
              fontSize: 76,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
            }}
          >
            {copy.heroTitle}
          </span>
          <span style={{ fontSize: 32, color: "#969a96" }}>
            {copy.heroSubtitle}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Kharkiv Tone",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
