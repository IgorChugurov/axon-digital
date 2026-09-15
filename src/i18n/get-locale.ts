import { locale } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const value = await locale();
  return isLocale(value) ? value : defaultLocale;
}
