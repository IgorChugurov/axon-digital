import type { Locale } from "@/i18n/config";

export const homeCopy = {
  en: {
    title: "To get started, edit the page.tsx file.",
    description:
      "This is a bilingual starter. The site is English by default. Switch to Ukrainian — the choice is stored in a cookie.",
    deploy: "Deploy Now",
    docs: "Documentation",
  },
  uk: {
    title: "Щоб почати, відредагуйте файл page.tsx.",
    description:
      "Це двомовна заготовка. Сайт за замовчуванням англійською. Перемикання на українську зберігається в cookie.",
    deploy: "Задеплоїти",
    docs: "Документація",
  },
} as const satisfies Record<Locale, Record<string, string>>;
