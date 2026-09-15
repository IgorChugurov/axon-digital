import { redirect } from "next/navigation";
import { localeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/get-locale";

export default async function AboutPage() {
  redirect(localeHref(await getLocale(), "/#about"));
}
