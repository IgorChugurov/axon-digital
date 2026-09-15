import type { Locale } from "@/i18n/config";

export const homeCopy = {
  en: {
    heroEyebrow: "Full-cycle engineering studio",
    heroTitle: "Engineering complex business logic since 2013",
    heroSubtitle: "Architecture, code and checks grow from one description.",
    deliveryEyebrow: "Delivery system",
    deliveryLead: "Documentation that runs.",
    deliveryBodyBefore:
      "A described business process becomes scenarios an agent walks through your product,",
    deliveryBodyAfter: "so broken rules find us, not your users",
    deliveryLink: "How our delivery works",
    processEyebrow: "Process",
    processTitle: "Four phases of a project",
    processSlides: [
      {
        id: "01",
        title: "Discovery & Alignment",
        description:
          "We align business goals, user needs, domain rules, constraints, and success criteria, then define the first valuable vertical slice. Living documentation connects these decisions and evolves whenever working software provides new evidence.",
        output: "Aligned problem frame and prioritized vertical slice.",
        tone: "green",
      },
      {
        id: "02",
        title: "Architecture & Living Specification",
        description:
          "We connect domain logic and UX with data, system boundaries, and implementation decisions. Models, technical experiments, and early executable slices continuously validate and refine the living specification throughout delivery.",
        output:
          "Implementable increment specification and recorded architecture decisions.",
        tone: "green",
      },
      {
        id: "03",
        title: "Design & Iterative Delivery",
        description:
          "We design and build complete vertical slices, demonstrate working software, and use feedback to adjust priorities. Documentation evolves with implementation, keeping each increment aligned, correct, understandable, and maintainable.",
        output: "Tested working increment ready for demonstration.",
        tone: "orange",
      },
      {
        id: "04",
        title: "Validation, Launch & Evolution",
        description:
          "We validate each increment against agreed outcomes, prepare it for operation, release it, and observe real use. Test results, production evidence, and updated documentation shape the priorities for the next iteration.",
        output: "Released increment and priorities for the next iteration.",
        tone: "green",
      },
    ],
    servicesEyebrow: "Services",
    servicesTitle: "Strategic Technology & Development Services",
    partnershipEyebrow: "Tools",
    partnershipTitle: "Delivery tools and product stack",
    partnershipBody:
      "The first group runs our delivery: agents describe, check, and correct. The second builds your product. We replace a tool as soon as a stronger one appears, because every step it performs is defined independently of it.",
    partnershipDeliveryLabel: "Delivery tools",
    partnershipStackLabel: "Product stack",
    teamEyebrow: "Team",
    teamTitle: "High-density team",
    teamBody:
      "Senior engineers who own architecture, a product designer, and lean management without bureaucracy. The engineering core are KhNURE graduates, so systems are discussed in one language.",
    ctaTitle: "Discuss your project architecture?",
    ctaSubtitle: "Response from the team within 24 hours.",
    faqEyebrow: "F.A.Q.",
    faqTitle: "Common Questions, Clear Answers",
    faqLink: "See how our delivery works",
    faq: [
      {
        id: "starting-point",
        question: "What can we start with?",
        answer:
          "We can begin with an idea, existing documentation, a working system, or a combination of them. We review the available context, identify gaps, and define the first valuable increment.",
      },
      {
        id: "methodology",
        question: "What method do you use to describe a system?",
        answer:
          "We describe a business process as data in motion: what data exists, which nodes change it, by what rule, and who may read data, run processing, or change how processing works. Alongside it we fix the domain vocabulary — what is an entity, what is configuration, what is shared classification — and build the taxonomy on top. Architecture follows as a graph of relations, with dependencies as directed vectors with weights and responsibilities separated into layers — modelling the data, maintaining it, and using it through an interface — and the model goes through an optimisation pass. Automation often improves the business logic itself, because a process described this way makes redundant steps visible. The engineering core here are KhNURE graduates, so this way of thinking about systems is shared, not personal.",
      },
      {
        id: "collaboration",
        question: "How will we collaborate?",
        answer:
          "We treat you as the domain expert. Decisions remain visible through shared context, living documentation, regular demonstrations, and feedback.",
      },
      {
        id: "delivery-process",
        question: "How do you organise delivery?",
        answer:
          "Every documented flow becomes an executable scenario, and agents check behaviour and design against it before an increment reaches you. On top of that we work in 2–4-week sprints and deliver complete vertical slices, each one designed, built, checked, demonstrated, and refined using your feedback.",
      },
      {
        id: "permanent-agents",
        question: "Do the agents keep working after launch?",
        answer:
          "Yes. Agents are set up on your documentation and scenarios, so they are specific to your product rather than generic. Under a support agreement they keep running after launch: walking flows after each change, reporting divergences, and keeping the description current as the system evolves.",
      },
      {
        id: "project-output",
        question: "What will we receive?",
        answer:
          "The result depends on the service and agreed scope. It may include working software, source code, deployment configuration, integrations, and current product, technical, or operational documentation.",
      },
      {
        id: "existing-system",
        question: "Can you modernize an existing system without rebuilding it?",
        answer:
          "Yes, where its condition allows. We assess the current system, define what to preserve, update, replace, or isolate, and introduce changes incrementally.",
      },
      {
        id: "ai-integration",
        question: "How do you approach AI integration?",
        answer:
          "We begin with a defined use case, representative examples, constraints, and evaluation criteria. The solution includes safeguards, fallback behaviour, monitoring, documentation, and human control.",
      },
      {
        id: "security-compliance",
        question: "How do you address security and compliance?",
        answer:
          "We identify the applicable security, privacy, access, auditability, and compliance requirements with you, then address the agreed requirements in architecture, implementation, testing, and documentation.",
      },
      {
        id: "contact",
        question: "How can we start a conversation?",
        answer:
          "Use the “Let’s Talk” form or email contact@axondigital.xyz with a short description of your project.",
      },
    ],
  },
  uk: {
    heroEyebrow: "Інженерна студія повного циклу",
    heroTitle: "Складну бізнес-логіку проєктуємо з 2013",
    heroSubtitle: "Архітектура, код і перевірки виростають з одного опису.",
    deliveryEyebrow: "Система поставки",
    deliveryLead: "Документація як механізм поставки.",
    deliveryBodyBefore:
      "Описаний бізнес-процес стає сценаріями, які агент проходить у вашому продукті,",
    deliveryBodyAfter: "тому порушене правило знаходимо ми, а не ваші користувачі",
    deliveryLink: "Як працює наша поставка",
    processEyebrow: "Процес",
    processTitle: "Чотири фази проєкту",
    processSlides: [
      {
        id: "01",
        title: "Дослідження та узгодження",
        description:
          "Узгоджуємо бізнес-цілі, потреби користувачів, правила домену, обмеження та критерії успіху, а потім визначаємо перший цінний вертикальний зріз. Жива документація пов’язує ці рішення й оновлюється, коли робочий продукт дає нові дані.",
        output:
          "Узгоджена постановка задачі та пріоритетний вертикальний зріз.",
        tone: "green",
      },
      {
        id: "02",
        title: "Архітектура та жива специфікація",
        description:
          "Поєднуємо доменну логіку та UX із даними, межами системи й рішеннями щодо реалізації. Моделі, технічні експерименти та ранні робочі зрізи постійно перевіряють і уточнюють живу специфікацію.",
        output:
          "Реалізовна специфікація інкремента та зафіксовані архітектурні рішення.",
        tone: "green",
      },
      {
        id: "03",
        title: "Дизайн та ітеративна реалізація",
        description:
          "Проєктуємо й реалізуємо завершені вертикальні зрізи, демонструємо робочий продукт і коригуємо пріоритети за відгуками. Документація розвивається разом із реалізацією, щоб кожен інкремент залишався узгодженим, коректним, зрозумілим і супроводжуваним.",
        output:
          "Протестований робочий інкремент, готовий до демонстрації.",
        tone: "orange",
      },
      {
        id: "04",
        title: "Перевірка, запуск та розвиток",
        description:
          "Перевіряємо кожен інкремент за узгодженими результатами, готуємо до експлуатації, випускаємо й спостерігаємо за реальним використанням. Результати тестування, дані з робочого середовища та оновлена документація визначають пріоритети наступної ітерації.",
        output: "Випущений інкремент і пріоритети наступної ітерації.",
        tone: "green",
      },
    ],
    servicesEyebrow: "Послуги",
    servicesTitle: "Стратегічні технологічні та розробницькі послуги",
    partnershipEyebrow: "Інструменти",
    partnershipTitle: "Інструменти поставки і продуктовий стек",
    partnershipBody:
      "Перша група виконує нашу поставку: агенти описують, перевіряють і виправляють. Друга збирає ваш продукт. Інструмент ми змінюємо щойно з’являється сильніший, бо кожен крок, який він виконує, визначений незалежно від нього.",
    partnershipDeliveryLabel: "Інструменти поставки",
    partnershipStackLabel: "Продуктовий стек",
    teamEyebrow: "Команда",
    teamTitle: "Компактна команда",
    teamBody:
      "Сеньйорні інженери, які відповідають і за архітектуру, продуктовий дизайнер і lean-менеджмент без бюрократії. Інженерне ядро — випускники ХНУРЕ, тому про системи ми говоримо однією мовою.",
    ctaTitle: "Обговоримо архітектуру проєкту?",
    ctaSubtitle: "Відповідь команди протягом 24 годин.",
    faqEyebrow: "F.A.Q.",
    faqTitle: "Типові питання, зрозумілі відповіді",
    faqLink: "Дивіться, як працює наша поставка",
    faq: [
      {
        id: "starting-point",
        question: "З чого можна почати?",
        answer:
          "Можемо почати з ідеї, наявної документації, робочої системи або їх поєднання. Ми вивчаємо контекст, визначаємо прогалини та формуємо перший цінний інкремент.",
      },
      {
        id: "methodology",
        question: "Яким методом ви описуєте систему?",
        answer:
          "Бізнес-процес ми описуємо як рух даних: які дані існують, у яких вузлах вони змінюються, за яким правилом і хто має право читати дані, запускати обробку та змінювати саму обробку. Паралельно фіксуємо вокабуляр домену — що є сутністю, що конфігурацією, а що спільною класифікацією — і будуємо на ньому таксономію. З опису виростає архітектура: граф зв’язків, де залежності є спрямованими векторами з вагами, а відповідальності розведені по шарах — моделювання даних, їхнє ведення й користування ними через інтерфейс; модель проходить оптимізаційний прогін. Автоматизація часто покращує саму бізнес-логіку, бо описаний так процес показує зайві кроки. Інженерне ядро команди — випускники ХНУРЕ, тому такий погляд на системи в нас спільний, а не персональний.",
      },
      {
        id: "collaboration",
        question: "Як відбуватиметься співпраця?",
        answer:
          "Ми сприймаємо вас як експерта домену. Рішення залишаються прозорими завдяки спільному контексту, живій документації, регулярним демо та зворотному зв’язку.",
      },
      {
        id: "delivery-process",
        question: "Як ви організовуєте реалізацію?",
        answer:
          "Кожне описане флоу стає виконуваним сценарієм, і агенти перевіряють за ним поведінку та дизайн ще до того, як інкремент дійде до вас. Поверх цього ми працюємо спринтами 2–4 тижні та реалізуємо завершені вертикальні зрізи: кожен проєктуємо, розробляємо, перевіряємо, демонструємо й уточнюємо за вашими відгуками.",
      },
      {
        id: "permanent-agents",
        question: "Чи продовжують агенти працювати після запуску?",
        answer:
          "Так. Агентів налаштовують на вашу документацію та сценарії, тому вони специфічні для вашого продукту, а не універсальні. За угодою про підтримку вони працюють і після запуску: проходять флоу після кожної зміни, повідомляють про розбіжності й підтримують опис актуальним разом із розвитком системи.",
      },
      {
        id: "project-output",
        question: "Що ми отримаємо?",
        answer:
          "Результат залежить від послуги та погодженого обсягу. Він може охоплювати робочий продукт, код, конфігурацію розгортання, інтеграції та актуальну продуктову, технічну або операційну документацію.",
      },
      {
        id: "existing-system",
        question: "Чи можете ви модернізувати систему без повної перебудови?",
        answer:
          "Так, якщо це дозволяє її стан. Ми оцінюємо систему, визначаємо, що зберегти, оновити, замінити чи ізолювати, і впроваджуємо зміни поетапно.",
      },
      {
        id: "ai-integration",
        question: "Як ви підходите до інтеграції ШІ?",
        answer:
          "Починаємо з визначеного сценарію, репрезентативних прикладів, обмежень і критеріїв оцінювання. Рішення передбачає запобіжники, резервну поведінку, моніторинг, документацію та контроль людини.",
      },
      {
        id: "security-compliance",
        question: "Як ви враховуєте безпеку та відповідність вимогам?",
        answer:
          "Разом із вами визначаємо вимоги до безпеки, приватності, доступу, простежуваності та нормативної відповідності, а потім враховуємо їх в архітектурі, реалізації, тестуванні й документації.",
      },
      {
        id: "contact",
        question: "Як розпочати розмову?",
        answer:
          "Скористайтеся формою «Давайте поговоримо» або напишіть на contact@axondigital.xyz і коротко опишіть свій проєкт.",
      },
    ],
  },
} as const;

export type HomeCopy = (typeof homeCopy)[Locale];

// Marks without a wordmark of their own get a caption.
export const deliveryToolLogos = [
  {
    src: "/tools/cursor.svg",
    alt: "Cursor",
    width: 88,
    height: 88,
    caption: "Cursor",
  },
  { src: "/tools/grok.svg", alt: "Grok", width: 88, height: 88, caption: "Grok" },
  {
    src: "/tools/claude.svg",
    alt: "Claude",
    width: 88,
    height: 88,
    caption: "Claude",
  },
  {
    src: "/tools/openai.svg",
    alt: "OpenAI",
    width: 88,
    height: 88,
    caption: "OpenAI",
  },
] as const;

export const partnershipLogos = [
  { src: "/tech/typescript.svg", alt: "TypeScript", width: 182, height: 44 },
  { src: "/tech/nestjs.svg", alt: "NestJS", width: 174, height: 62 },
  { src: "/tech/nextjs.svg", alt: "Next.js", width: 172, height: 94 },
  {
    src: "/tech/react.svg",
    alt: "React",
    width: 88,
    height: 78,
    caption: "React",
  },
  { src: "/tech/postgresql.svg", alt: "PostgreSQL", width: 88, height: 88 },
  { src: "/tech/docker.svg", alt: "Docker", width: 186, height: 42 },
] as const;
