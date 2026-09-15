import type { Locale } from "@/i18n/config";

export const navItems = [
  { href: "/#about", label: { en: "About", uk: "Про нас" } },
  { href: "/services", label: { en: "Services", uk: "Послуги" } },
  { href: "/expertise", label: { en: "Expertise", uk: "Експертиза" } },
  { href: "/#contact", label: { en: "Contacts", uk: "Контакти" } },
] as const;

export const site = {
  name: "Axon Digital",
  url: "https://axondigital.xyz",
  email: "hello@axondigital.com",
  copyrightYear: 2026,
  localeLabel: { en: "EN", uk: "УКР" },
} as const;

export const chromeCopy = {
  en: {
    metaTitle: "Axon Digital — Full-cycle engineering studio",
    metaDescription:
      "Engineering complex business logic since 2013. From architectural blueprints to functional systems.",
    letsTalk: "Let’s Talk",
    ourServices: "Our services",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    closeModal: "Close",
    modalTitle: "Let’s Talk",
    modalName: "Name",
    modalEmail: "Email",
    modalPhone: "Phone",
    modalMessage: "Message",
    modalSubmit: "Let’s Talk",
    modalSending: "Sending your message…",
    modalSuccessTitle: "Thank you",
    modalSuccessMessage:
      "Your message has been sent. We’ll get back to you shortly.",
    modalError:
      "We couldn’t send your message. Please try again or email contact@axondigital.xyz.",
    map: "Map",
    rights: "All rights reserved.",
  },
  uk: {
    metaTitle: "Axon Digital — Інженерна студія повного циклу",
    metaDescription:
      "Складну бізнес-логіку проєктуємо з 2013. Від архітектурних креслень до робочих систем.",
    letsTalk: "Давайте поговоримо",
    ourServices: "Наші послуги",
    openMenu: "Відкрити меню",
    closeMenu: "Закрити меню",
    closeModal: "Закрити",
    modalTitle: "Давайте поговоримо",
    modalName: "Ім’я",
    modalEmail: "Email",
    modalPhone: "Телефон",
    modalMessage: "Повідомлення",
    modalSubmit: "Давайте поговоримо",
    modalSending: "Надсилаємо ваше повідомлення…",
    modalSuccessTitle: "Дякуємо",
    modalSuccessMessage:
      "Ваше повідомлення надіслано. Ми зв’яжемося з вами найближчим часом.",
    modalError:
      "Не вдалося надіслати повідомлення. Спробуйте ще раз або напишіть на contact@axondigital.xyz.",
    map: "Мапа",
    rights: "Усі права захищено.",
  },
} as const satisfies Record<Locale, Record<string, string>>;
