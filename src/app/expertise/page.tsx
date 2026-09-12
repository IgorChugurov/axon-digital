import { chromeCopy, navItems } from "@/content/site";
import { getLocale } from "@/i18n/get-locale";

export default async function ExpertisePage() {
  const locale = await getLocale();
  const title = navItems[2].label[locale];

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-8 py-24">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-muted">{chromeCopy[locale].pageStub}</p>
    </main>
  );
}
