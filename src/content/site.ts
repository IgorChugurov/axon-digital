import type { Locale } from "@/i18n/config";

export const navItems = [
  { href: "/about", label: { en: "About", uk: "Про нас" } },
  { href: "/services", label: { en: "Services", uk: "Послуги" } },
  { href: "/expertise", label: { en: "Expertise", uk: "Експертиза" } },
  { href: "/contacts", label: { en: "Contacts", uk: "Контакти" } },
] as const;

export const site = {
  name: "Axon Digital",
  email: "hello@axondigital.com",
  copyrightYear: 2026,
  socials: [
    { id: "instagram", href: "#", label: { en: "Instagram", uk: "Instagram" } },
    { id: "whatsapp", href: "#", label: { en: "Whatsapp", uk: "Whatsapp" } },
    { id: "telegram", href: "#", label: { en: "Telegram", uk: "Telegram" } },
    { id: "linkedin", href: "#", label: { en: "LinkedIn", uk: "LinkedIn" } },
  ],
  localeLabel: { en: "EN", uk: "УКР" },
} as const;

export const chromeCopy = {
  en: {
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
    footerBlurb: "Discuss your project architecture. Response from the team within 24 hours.",
    socials: "Socials",
    map: "Map",
    rights: "All rights reserved.",
    pageStub: "This page is empty for now.",
  },
  uk: {
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
    footerBlurb:
      "Обговоримо архітектуру проєкту. Відповідь команди протягом 24 годин.",
    socials: "Соцмережі",
    map: "Мапа",
    rights: "Усі права захищено.",
    pageStub: "Ця сторінка поки порожня.",
  },
} as const satisfies Record<Locale, Record<string, string>>;
