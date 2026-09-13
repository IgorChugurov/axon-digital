import type { Locale } from "@/i18n/config";

export const homeCopy = {
  en: {
    heroEyebrow: "Full-cycle engineering studio",
    heroTitle: "Engineering complex business logic since 2013",
    heroSubtitle: "From architectural blueprints to functional systems.",
    approachEyebrow: "Our Approach",
    approachLead: "Working in 2-4 week sprints.",
    approachBodyBefore:
      "We focus on real business value rather than just code, ensuring transparency",
    approachBodyAfter: "through regular demos",
    processEyebrow: "Process",
    processTitle: "How we work",
    processSlides: [
      { id: "01", title: "Goal Analysis", tone: "green" },
      { id: "02", title: "Architecture", tone: "green" },
      { id: "03", title: "Tech Specs", tone: "orange" },
      { id: "04", title: "Delivery", tone: "green" },
    ],
    servicesEyebrow: "Services",
    servicesTitle: "Strategic Technology & Development Services",
    partnershipEyebrow: "Technology",
    partnershipTitle: "Partnership & Responsibility",
    partnershipBody:
      "We believe development is a collaborative process. We value the client as a domain expert and ensure stability via rigorous QA standards.",
    teamEyebrow: "Team",
    teamTitle: "High-density team",
    teamBody:
      "Senior engineers, architects, and flexible-vision designers. Lean management without bureaucracy.",
    ctaTitle: "Discuss your project architecture?",
    ctaSubtitle: "Response from the team within 24 hours.",
    faqEyebrow: "F.A.Q.",
    faqTitle: "Common Questions, Clear Answers",
    faq: [
      {
        id: "poc",
        question: "How long for a PoC?",
        answer:
          "A focused proof of concept typically takes a few sprints. We scope the smallest slice that proves the architecture and the business case.",
      },
      {
        id: "hipaa",
        question: "How do we handle HIPAA?",
        answer:
          "We treat compliance as part of the architecture: access control, audit trails, encryption, and documented processes — not a layer added at the end.",
      },
      {
        id: "architecture",
        question: "Why is architecture more important than code?",
        answer:
          "Architecture is more important than code because it provides the foundational structure that ensures scalability, maintainability, and performance, guiding how the code is organized and interacts within the system.",
      },
      {
        id: "poc-2",
        question: "How long for a PoC?",
        answer:
          "A focused proof of concept typically takes a few sprints. We scope the smallest slice that proves the architecture and the business case.",
      },
      {
        id: "hipaa-2",
        question: "How do we handle HIPAA?",
        answer:
          "We treat compliance as part of the architecture: access control, audit trails, encryption, and documented processes — not a layer added at the end.",
      },
    ],
  },
  uk: {
    heroEyebrow: "Інженерна студія повного циклу",
    heroTitle: "Складну бізнес-логіку проєктуємо з 2013",
    heroSubtitle: "Від архітектурних креслень до робочих систем.",
    approachEyebrow: "Наш підхід",
    approachLead: "Працюємо спринтами 2–4 тижні.",
    approachBodyBefore:
      "Ми фокусуємось на реальній бізнес-цінності, а не лише на коді, і забезпечуємо прозорість",
    approachBodyAfter: "через регулярні демо",
    processEyebrow: "Процес",
    processTitle: "Як ми працюємо",
    processSlides: [
      { id: "01", title: "Аналіз цілей", tone: "green" },
      { id: "02", title: "Архітектура", tone: "green" },
      { id: "03", title: "Технічне завдання", tone: "orange" },
      { id: "04", title: "Поставка", tone: "green" },
    ],
    servicesEyebrow: "Послуги",
    servicesTitle: "Стратегічні технологічні та розробницькі послуги",
    partnershipEyebrow: "Технології",
    partnershipTitle: "Партнерство і відповідальність",
    partnershipBody:
      "Розробка для нас — спільний процес. Ми цінуємо клієнта як експерта домену і забезпечуємо стабільність через суворий QA.",
    teamEyebrow: "Команда",
    teamTitle: "Компактна команда",
    teamBody:
      "Сеньйорні інженери, архітектори та дизайнери з гнучким баченням. Lean-менеджмент без бюрократії.",
    ctaTitle: "Обговоримо архітектуру проєкту?",
    ctaSubtitle: "Відповідь команди протягом 24 годин.",
    faqEyebrow: "F.A.Q.",
    faqTitle: "Типові питання, зрозумілі відповіді",
    faq: [
      {
        id: "poc",
        question: "Скільки часу на PoC?",
        answer:
          "Сфокусований proof of concept зазвичай займає кілька спринтів. Ми беремо найменший зріз, який доводить архітектуру і бізнес-кейс.",
      },
      {
        id: "hipaa",
        question: "Як ми працюємо з HIPAA?",
        answer:
          "Комплаєнс закладаємо в архітектуру: доступ, аудит, шифрування і задокументовані процеси — а не шар на фініші.",
      },
      {
        id: "architecture",
        question: "Чому архітектура важливіша за код?",
        answer:
          "Архітектура важливіша за код, бо задає структуру, від якої залежать масштабованість, супровід і продуктивність, і визначає, як код організований і взаємодіє в системі.",
      },
      {
        id: "poc-2",
        question: "Скільки часу на PoC?",
        answer:
          "Сфокусований proof of concept зазвичай займає кілька спринтів. Ми беремо найменший зріз, який доводить архітектуру і бізнес-кейс.",
      },
      {
        id: "hipaa-2",
        question: "Як ми працюємо з HIPAA?",
        answer:
          "Комплаєнс закладаємо в архітектуру: доступ, аудит, шифрування і задокументовані процеси — а не шар на фініші.",
      },
    ],
  },
} as const;

export type HomeCopy = (typeof homeCopy)[Locale];

export const partnershipLogos = [
  { src: "/tech/typescript.svg", alt: "TypeScript", width: 182, height: 44 },
  { src: "/tech/nestjs.svg", alt: "NestJS", width: 174, height: 62 },
  { src: "/tech/nextjs.svg", alt: "Next.js", width: 172, height: 94 },
  { src: "/tech/react.svg", alt: "React", width: 88, height: 78 },
  { src: "/tech/postgresql.svg", alt: "PostgreSQL", width: 88, height: 88 },
  { src: "/tech/docker.svg", alt: "Docker", width: 186, height: 42 },
] as const;
