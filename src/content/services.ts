import type { Locale } from "@/i18n/config";

export type ServiceItem = {
  title: string;
  description: string;
};

export type ServiceStep = {
  title: string;
  description: string;
};

export type ServiceCopy = {
  title: string;
  summary: string;
  hero: string;
  whenNeeded: string[];
  included: ServiceItem[];
  process: ServiceStep[];
  result: string;
  ctaTitle: string;
  ctaBody: string;
  metaTitle: string;
  metaDescription: string;
};

export type Service = {
  id: string;
  slug: string;
  related: string[];
  copy: Record<Locale, ServiceCopy>;
};

export const servicesPageCopy = {
  en: {
    eyebrow: "Services",
    title: "Strategic Technology & Development Services",
    intro:
      "We turn complex business logic into maintainable digital systems through living documentation, deliberate architecture, and iterative development.",
    whenNeeded: "When you need it",
    included: "What’s included",
    process: "Process",
    result: "Result",
    related: "Related services",
    back: "All services",
    openService: "View service",
    notFoundTitle: "Service not found",
    notFoundBody: "The requested service does not exist.",
    notFoundHome: "Return home",
    ctaTitle: "Not sure which service you need?",
    ctaBody: "Describe the situation and we’ll suggest the starting point.",
    deliveryNote:
      "Every service runs on the same delivery system: documented flows become executable scenarios that agents check before you see an increment.",
    deliveryLink: "How our delivery works",
  },
  uk: {
    eyebrow: "Послуги",
    title: "Стратегічні технологічні послуги та розробка",
    intro:
      "Перетворюємо складну бізнес-логіку на зручні для розвитку цифрові системи через живу документацію, продуману архітектуру та ітеративну розробку.",
    whenNeeded: "Коли це потрібно",
    included: "Що входить",
    process: "Процес",
    result: "Результат",
    related: "Пов’язані послуги",
    back: "Усі послуги",
    openService: "Переглянути послугу",
    notFoundTitle: "Послугу не знайдено",
    notFoundBody: "Запитаної послуги не існує.",
    notFoundHome: "На головну",
    ctaTitle: "Не впевнені, яка послуга потрібна?",
    ctaBody: "Опишіть ситуацію, і ми запропонуємо, з чого почати.",
    deliveryNote:
      "Кожна послуга виконується тією самою системою поставки: описані флоу стають виконуваними сценаріями, які агенти перевіряють ще до того, як ви побачите інкремент.",
    deliveryLink: "Як працює наша поставка",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export const services: Service[] = [
  {
    id: "01",
    slug: "product-architecture-living-documentation",
    related: [
      "web-app-development",
      "software-extension-modernization",
      "custom-admin-panels",
    ],
    copy: {
      en: {
        title: "Product Architecture & Living Documentation",
        summary:
          "Define a product from scratch or turn existing documentation into a living foundation for design, planning, and development.",
        hero:
          "Working software begins before code. We build a living product model that connects business goals, domain logic, user experience, data, architecture, and delivery—and evolves alongside the implemented system.",
        whenNeeded: [
          "You are preparing a new product or a major new initiative.",
          "Requirements are incomplete, scattered, or understood differently by stakeholders.",
          "The system’s workflows, boundaries, entities, or integrations are unclear.",
          "Existing documentation is outdated, contradictory, or difficult to use.",
          "The team needs a shared foundation for design, estimation, and development.",
        ],
        included: [
          {
            title: "Product context and scope",
            description:
              "We clarify goals, users, business rules, constraints, stakeholders, and the boundaries of the initiative.",
          },
          {
            title: "Documentation review and gap analysis",
            description:
              "When materials already exist, we assess their clarity, completeness, consistency, structure, and relevance.",
          },
          {
            title: "System and workflow design",
            description:
              "We describe user flows, screens, core entities, business modules, integrations, and relevant API interactions.",
          },
          {
            title: "Architecture decisions",
            description:
              "We document the proposed system structure and technology choices in the context of product requirements and constraints.",
          },
          {
            title: "Living documentation and roadmap",
            description:
              "We organize requirements, decisions, phases, dependencies, priorities, and acceptance criteria, then keep them aligned with implementation.",
          },
        ],
        process: [
          {
            title: "Define the starting point",
            description:
              "We agree whether the work begins with an idea, existing documentation, a working system, or a combination of them.",
          },
          {
            title: "Discover or audit",
            description:
              "We gather product context and examine current materials to identify requirements, gaps, and open questions.",
          },
          {
            title: "Model the product",
            description:
              "We define or refine workflows, domain entities, system structure, interfaces, and architecture decisions.",
          },
          {
            title: "Validate through development",
            description:
              "Documentation is checked against working implementation and updated as the product and technical understanding evolve.",
          },
          {
            title: "Review and hand over",
            description:
              "We align the final state with stakeholders and provide an up-to-date product and engineering context.",
          },
        ],
        result:
          "You receive a living product model and an agreed documentation package that guide design, implementation, testing, and future development. Its exact composition follows the product scope and starting point.",
        ctaTitle: "Need clarity before building or improving a product?",
        ctaBody:
          "Let’s define the product model and documentation your team needs.",
        metaTitle: "Product Architecture & Living Documentation",
        metaDescription:
          "Living product documentation connecting business goals, domain logic, UX, data, architecture, and implementation.",
      },
      uk: {
        title: "Архітектура продукту та жива документація",
        summary:
          "Досліджуємо продукт з нуля або перетворюємо наявну документацію на живу основу для дизайну, планування й розробки.",
        hero:
          "Робочий продукт починається ще до написання коду. Ми створюємо живу модель, яка поєднує бізнес-цілі, доменну логіку, користувацький досвід, дані, архітектуру та реалізацію — і розвивається разом із системою.",
        whenNeeded: [
          "Ви готуєте новий продукт або велику продуктову ініціативу.",
          "Вимоги неповні, розпорошені або учасники розуміють їх по-різному.",
          "Процеси, межі системи, сутності чи інтеграції не визначені.",
          "Наявна документація застаріла, суперечлива або незручна в роботі.",
          "Команді потрібна спільна основа для дизайну, оцінювання та розробки.",
        ],
        included: [
          {
            title: "Контекст і обсяг продукту",
            description:
              "Уточнюємо цілі, користувачів, бізнес-правила, обмеження, зацікавлені сторони й межі ініціативи.",
          },
          {
            title: "Перевірка документації",
            description:
              "Якщо матеріали вже існують, оцінюємо їхню зрозумілість, повноту, узгодженість, структуру й актуальність.",
          },
          {
            title: "Проєктування системи",
            description:
              "Описуємо користувацькі сценарії, екрани, основні сутності, бізнес-модулі, інтеграції та API-взаємодії.",
          },
          {
            title: "Архітектурні рішення",
            description:
              "Документуємо структуру системи та вибір технологій у контексті вимог і обмежень продукту.",
          },
          {
            title: "Жива документація та план",
            description:
              "Організовуємо вимоги, рішення, етапи, залежності, пріоритети й критерії приймання та синхронізуємо їх із реалізацією.",
          },
        ],
        process: [
          {
            title: "Визначаємо стартову точку",
            description:
              "Узгоджуємо, чи починаємо з ідеї, наявної документації, робочої системи або їх поєднання.",
          },
          {
            title: "Досліджуємо або аудіюємо",
            description:
              "Збираємо контекст і перевіряємо матеріали, визначаючи вимоги, прогалини й відкриті питання.",
          },
          {
            title: "Моделюємо продукт",
            description:
              "Визначаємо або уточнюємо процеси, доменні сутності, структуру системи, інтерфейси й архітектурні рішення.",
          },
          {
            title: "Перевіряємо розробкою",
            description:
              "Зіставляємо документацію з робочою реалізацією та оновлюємо її разом із розвитком продукту.",
          },
          {
            title: "Узгоджуємо й передаємо",
            description:
              "Синхронізуємо фінальний стан з учасниками та передаємо актуальний продуктовий і технічний контекст.",
          },
        ],
        result:
          "Ви отримуєте живу модель продукту та погоджений пакет документації, які спрямовують дизайн, реалізацію, тестування й подальший розвиток. Точний склад залежить від обсягу та стартової точки продукту.",
        ctaTitle: "Потрібна ясність перед створенням або розвитком продукту?",
        ctaBody:
          "Визначмо модель продукту та документацію, потрібні вашій команді.",
        metaTitle: "Архітектура продукту та жива документація",
        metaDescription:
          "Жива модель продукту, що поєднує бізнес-цілі, доменну логіку, UX, дані, архітектуру та реалізацію.",
      },
    },
  },
  {
    id: "02",
    slug: "web-app-development",
    related: [
      "product-architecture-living-documentation",
      "ai-integration",
      "software-extension-modernization",
    ],
    copy: {
      en: {
        title: "Web App Development",
        summary:
          "Build a custom web application around your business logic, user workflows, and product requirements.",
        hero:
          "Custom web applications built around your business logic, user workflows, and product requirements.",
        whenNeeded: [
          "Off-the-shelf products cannot support your processes.",
          "The product has custom business rules or user journeys.",
          "Different roles require distinct workflows and permissions.",
          "The application must manage interconnected data and operations.",
          "You need control over how the product develops.",
        ],
        included: [
          {
            title: "Product and workflow definition",
            description:
              "We translate product goals and business rules into application requirements, user roles, and workflows.",
          },
          {
            title: "UX and interface design",
            description:
              "We design screens and interactions around the tasks users need to complete.",
          },
          {
            title: "Application engineering",
            description:
              "We develop the frontend, backend, data model, and APIs required by the agreed scope.",
          },
          {
            title: "Quality assurance",
            description:
              "We address the security, performance, reliability, and testing requirements defined for the application.",
          },
          {
            title: "Release and handover",
            description:
              "We prepare the application for its agreed environment and transfer the relevant code, configuration, and living documentation.",
          },
        ],
        process: [
          {
            title: "Discovery",
            description:
              "We clarify goals, users, workflows, requirements, and constraints.",
          },
          {
            title: "Design and architecture",
            description:
              "We define the user experience, data model, system structure, and technical approach.",
          },
          {
            title: "Iterative development",
            description:
              "We build, document, and review the application in agreed increments.",
          },
          {
            title: "Validation and release",
            description:
              "We test the approved scope, resolve identified issues, and prepare the release.",
          },
        ],
        result:
          "You receive a working web application covering the agreed business logic, user workflows, and product scope, together with the agreed source code, deployment configuration, and living documentation.",
        ctaTitle: "Need an application shaped around how your business works?",
        ctaBody: "Let’s discuss its users, workflows, and core logic.",
        metaTitle: "Web App Development",
        metaDescription:
          "Custom web applications designed around business logic, user workflows, data, and product requirements.",
      },
      uk: {
        title: "Розробка вебзастосунків",
        summary:
          "Створюємо вебзастосунки навколо вашої бізнес-логіки, користувацьких процесів і вимог продукту.",
        hero:
          "Створюємо вебзастосунки навколо вашої бізнес-логіки, користувацьких процесів і вимог продукту.",
        whenNeeded: [
          "Готові продукти не підтримують ваші процеси.",
          "Продукт має власні бізнес-правила чи користувацькі сценарії.",
          "Різним ролям потрібні окремі процеси та права доступу.",
          "Застосунок має керувати пов’язаними даними й операціями.",
          "Вам потрібен контроль над розвитком продукту.",
        ],
        included: [
          {
            title: "Визначення продукту та процесів",
            description:
              "Перетворюємо цілі й бізнес-правила на вимоги до застосунку, ролі та користувацькі процеси.",
          },
          {
            title: "UX і дизайн інтерфейсу",
            description:
              "Проєктуємо екрани та взаємодії навколо завдань користувачів.",
          },
          {
            title: "Розробка застосунку",
            description:
              "Створюємо frontend, backend, модель даних і API відповідно до погодженого обсягу.",
          },
          {
            title: "Забезпечення якості",
            description:
              "Опрацьовуємо визначені вимоги до безпеки, продуктивності, надійності й тестування.",
          },
          {
            title: "Випуск і передавання",
            description:
              "Готуємо застосунок до погодженого середовища та передаємо код, конфігурацію й живу документацію.",
          },
        ],
        process: [
          {
            title: "Збір контексту",
            description:
              "Уточнюємо цілі, користувачів, процеси, вимоги й обмеження.",
          },
          {
            title: "Дизайн та архітектура",
            description:
              "Визначаємо користувацький досвід, модель даних, структуру системи й технічний підхід.",
          },
          {
            title: "Ітеративна розробка",
            description:
              "Створюємо, документуємо й переглядаємо застосунок погодженими частинами.",
          },
          {
            title: "Перевірка й випуск",
            description:
              "Тестуємо погоджений обсяг, усуваємо виявлені проблеми та готуємо випуск.",
          },
        ],
        result:
          "Ви отримуєте робочий вебзастосунок, який охоплює погоджену бізнес-логіку, користувацькі процеси та обсяг продукту, разом із визначеним кодом, конфігурацією розгортання й живою документацією.",
        ctaTitle: "Потрібен застосунок, побудований навколо роботи вашого бізнесу?",
        ctaBody: "Обговорімо його користувачів, процеси та ключову логіку.",
        metaTitle: "Розробка вебзастосунків",
        metaDescription:
          "Вебзастосунки, спроєктовані навколо бізнес-логіки, користувацьких процесів, даних і вимог продукту.",
      },
    },
  },
  {
    id: "03",
    slug: "website-creation",
    related: [
      "product-architecture-living-documentation",
      "web-app-development",
      "software-extension-modernization",
    ],
    copy: {
      en: {
        title: "Website Creation",
        summary:
          "Create a public-facing website with clear content, purposeful design, and a maintainable publishing structure.",
        hero:
          "Public-facing websites that communicate your offer clearly, express your brand, and guide visitors toward meaningful actions.",
        whenNeeded: [
          "You are launching or repositioning a brand.",
          "Your current website no longer reflects the business.",
          "Content is difficult to navigate or maintain.",
          "Important visitor journeys and calls to action are unclear.",
          "You need a landing page, company website, or content platform.",
        ],
        included: [
          {
            title: "Goals and requirements",
            description:
              "We define audiences, business purpose, key journeys, content needs, constraints, and success criteria.",
          },
          {
            title: "Content architecture",
            description:
              "We organize pages, navigation, content types, relationships, and publishing requirements.",
          },
          {
            title: "UX and visual design",
            description:
              "We design responsive layouts and interactions aligned with the brand and document significant decisions.",
          },
          {
            title: "Development and content management",
            description:
              "We build the agreed pages and components and provide appropriate content-management capabilities where required.",
          },
          {
            title: "Technical setup and handover",
            description:
              "We implement agreed metadata, analytics, accessibility, and performance requirements and document maintenance needs.",
          },
        ],
        process: [
          {
            title: "Definition",
            description:
              "We align on audiences, goals, requirements, content, and project boundaries.",
          },
          {
            title: "Structure",
            description:
              "We create the sitemap, content model, page hierarchy, and key visitor journeys.",
          },
          {
            title: "Design",
            description:
              "We develop the visual direction and layouts while recording the reasoning behind important decisions.",
          },
          {
            title: "Build and review",
            description:
              "We implement the website, add agreed content, and validate it across defined devices.",
          },
          {
            title: "Launch and handover",
            description:
              "We prepare the approved version for release and transfer the relevant content, design, and technical documentation.",
          },
        ],
        result:
          "You receive a public-facing website with the agreed pages, content structure, design system, publishing capabilities, and supporting documentation.",
        ctaTitle: "Need a website that explains your business clearly?",
        ctaBody: "Let’s define its audience, content, structure, and purpose.",
        metaTitle: "Website Creation",
        metaDescription:
          "Public-facing websites with clear content, purposeful design, and maintainable publishing structures.",
      },
      uk: {
        title: "Створення вебсайтів",
        summary:
          "Створюємо публічні сайти зі зрозумілим контентом, продуманим дизайном і зручною для підтримки структурою.",
        hero:
          "Створюємо публічні сайти, які зрозуміло представляють вашу пропозицію, передають характер бренду та ведуть відвідувачів до цільових дій.",
        whenNeeded: [
          "Ви запускаєте бренд або змінюєте його позиціювання.",
          "Наявний сайт більше не відповідає бізнесу.",
          "Контент складно знайти, зрозуміти чи оновити.",
          "Ключові шляхи відвідувачів і заклики до дії нечіткі.",
          "Потрібен лендинг, корпоративний сайт або контентна платформа.",
        ],
        included: [
          {
            title: "Цілі та вимоги",
            description:
              "Визначаємо аудиторії, призначення, ключові сценарії, потреби в контенті, обмеження й критерії результату.",
          },
          {
            title: "Архітектура контенту",
            description:
              "Організовуємо сторінки, навігацію, типи контенту, зв’язки та вимоги до публікації.",
          },
          {
            title: "UX і візуальний дизайн",
            description:
              "Проєктуємо адаптивні макети й взаємодії відповідно до бренду та документуємо важливі рішення.",
          },
          {
            title: "Розробка та керування контентом",
            description:
              "Створюємо погоджені сторінки й компоненти та додаємо відповідні можливості керування контентом.",
          },
          {
            title: "Технічне налаштування й передавання",
            description:
              "Реалізуємо погоджені метадані, аналітику, доступність і продуктивність та документуємо підтримку сайту.",
          },
        ],
        process: [
          {
            title: "Визначення",
            description:
              "Узгоджуємо аудиторії, цілі, вимоги, контент і межі проєкту.",
          },
          {
            title: "Структура",
            description:
              "Створюємо мапу сайту, модель контенту, ієрархію сторінок і ключові шляхи відвідувачів.",
          },
          {
            title: "Дизайн",
            description:
              "Розробляємо візуальний напрям і макети та фіксуємо логіку важливих рішень.",
          },
          {
            title: "Розробка й перевірка",
            description:
              "Реалізуємо сайт, додаємо погоджений контент і перевіряємо його на визначених пристроях.",
          },
          {
            title: "Запуск і передавання",
            description:
              "Готуємо затверджену версію до публікації та передаємо контентну, дизайн- і технічну документацію.",
          },
        ],
        result:
          "Ви отримуєте публічний сайт із погодженими сторінками, структурою контенту, дизайн-системою, можливостями публікації та супровідною документацією.",
        ctaTitle: "Потрібен сайт, який зрозуміло пояснює ваш бізнес?",
        ctaBody: "Визначмо його аудиторію, контент, структуру та призначення.",
        metaTitle: "Створення вебсайтів",
        metaDescription:
          "Публічні сайти зі зрозумілим контентом, продуманим дизайном і зручною для підтримки структурою.",
      },
    },
  },
  {
    id: "04",
    slug: "business-automation",
    related: [
      "product-architecture-living-documentation",
      "software-extension-modernization",
      "custom-admin-panels",
    ],
    copy: {
      en: {
        title: "Business Automation",
        summary:
          "Transform repeatable operational work into documented, automated workflows connecting people, data, and systems.",
        hero:
          "Map and automate repeatable operational workflows across people, data, and systems.",
        whenNeeded: [
          "Teams repeatedly transfer information between tools.",
          "Routine work depends on manual data entry or follow-ups.",
          "Handoffs, approvals, and responsibilities are unclear.",
          "Process status is difficult to track.",
          "Exceptions are handled inconsistently.",
          "Growing workload puts pressure on existing operations.",
        ],
        included: [
          {
            title: "Process discovery and mapping",
            description:
              "We document the current workflow, participants, data, systems, rules, handoffs, and exceptions.",
          },
          {
            title: "Automation design",
            description:
              "We define triggers, actions, states, approvals, notifications, human decisions, and failure handling.",
          },
          {
            title: "Implementation and integration",
            description:
              "We develop the components required to automate the agreed workflow and connect relevant systems.",
          },
          {
            title: "Validation and observability",
            description:
              "We test representative scenarios and define status tracking, logging, and operational checks.",
          },
          {
            title: "Living operational documentation",
            description:
              "We maintain process maps, rules, decisions, and operating guidance alongside implementation.",
          },
        ],
        process: [
          {
            title: "Map the current process",
            description:
              "We document how work happens today across people, data, systems, and decisions.",
          },
          {
            title: "Design the target workflow",
            description:
              "We decide what to automate, what remains human-controlled, and how exceptions should work.",
          },
          {
            title: "Implement incrementally",
            description:
              "We build and connect the automation while keeping its documentation aligned.",
          },
          {
            title: "Validate real scenarios",
            description:
              "We test normal paths, edge cases, permissions, and failure conditions.",
          },
          {
            title: "Introduce and hand over",
            description:
              "We prepare the workflow for use and document responsibilities and operating rules.",
          },
        ],
        result:
          "You receive an implemented workflow covering the agreed process scope, together with the required integrations, interfaces, and living operational documentation.",
        ctaTitle: "Which recurring process is slowing your team down?",
        ctaBody:
          "Let’s map how it works today and identify what should be automated.",
        metaTitle: "Business Automation",
        metaDescription:
          "Documented and automated operational workflows connecting people, data, and business systems.",
      },
      uk: {
        title: "Автоматизація бізнес-процесів",
        summary:
          "Перетворюємо повторювану роботу на задокументовані автоматизовані процеси між людьми, даними та системами.",
        hero:
          "Описуємо й автоматизуємо повторювані операційні процеси, що поєднують людей, дані та системи.",
        whenNeeded: [
          "Команди регулярно переносять інформацію між інструментами.",
          "Рутинна робота залежить від ручного введення даних або нагадувань.",
          "Передавання завдань, погодження й відповідальність нечіткі.",
          "Стан процесу складно відстежувати.",
          "Нестандартні ситуації опрацьовуються непослідовно.",
          "Зростання навантаження ускладнює наявні операції.",
        ],
        included: [
          {
            title: "Дослідження та опис процесу",
            description:
              "Документуємо поточний процес, учасників, дані, системи, правила, передавання роботи й винятки.",
          },
          {
            title: "Проєктування автоматизації",
            description:
              "Визначаємо тригери, дії, стани, погодження, сповіщення, рішення людини й оброблення збоїв.",
          },
          {
            title: "Реалізація та інтеграція",
            description:
              "Розробляємо компоненти для автоматизації погодженого процесу та підключення потрібних систем.",
          },
          {
            title: "Перевірка й спостережуваність",
            description:
              "Тестуємо типові сценарії та визначаємо відстеження станів, журналювання й операційні перевірки.",
          },
          {
            title: "Жива операційна документація",
            description:
              "Підтримуємо описи процесів, правила, рішення та інструкції разом із реалізацією.",
          },
        ],
        process: [
          {
            title: "Описуємо поточний процес",
            description:
              "Документуємо реальну роботу між людьми, даними, системами та рішеннями.",
          },
          {
            title: "Проєктуємо цільовий процес",
            description:
              "Визначаємо, що автоматизувати, що залишити під контролем людини та як обробляти винятки.",
          },
          {
            title: "Реалізуємо поетапно",
            description:
              "Створюємо й підключаємо автоматизацію та синхронно оновлюємо документацію.",
          },
          {
            title: "Перевіряємо сценарії",
            description:
              "Тестуємо основні шляхи, граничні випадки, права доступу та збої.",
          },
          {
            title: "Запроваджуємо й передаємо",
            description:
              "Готуємо процес до використання та документуємо відповідальність і правила роботи.",
          },
        ],
        result:
          "Ви отримуєте реалізований процес у погоджених межах, потрібні інтеграції чи інтерфейси та живу операційну документацію.",
        ctaTitle: "Який повторюваний процес сповільнює вашу команду?",
        ctaBody:
          "Опишімо, як він працює зараз, і визначмо, що варто автоматизувати.",
        metaTitle: "Автоматизація бізнес-процесів",
        metaDescription:
          "Задокументовані й автоматизовані операційні процеси між людьми, даними та бізнес-системами.",
      },
    },
  },
  {
    id: "05",
    slug: "ai-integration",
    related: [
      "product-architecture-living-documentation",
      "web-app-development",
      "business-automation",
    ],
    copy: {
      en: {
        title: "AI Integration",
        summary:
          "Add AI to a defined product feature or workflow with explicit context, evaluation, monitoring, fallback, and human control.",
        hero:
          "Add a focused AI capability to a product or workflow with explicit context, evaluation criteria, safeguards, and human control.",
        whenNeeded: [
          "A product feature could benefit from intelligent search or recommendations.",
          "A workflow includes repeated extraction, classification, or summarization.",
          "Users need generation or decision support grounded in business context.",
          "Relevant data and representative examples are available.",
          "Uncertain results can be reviewed or handled safely.",
        ],
        included: [
          {
            title: "Use case and boundaries",
            description:
              "We define the user need, expected output, constraints, risk level, and role of human review.",
          },
          {
            title: "Data and context",
            description:
              "We determine what information the AI needs and what access and privacy rules apply.",
          },
          {
            title: "Solution and integration",
            description:
              "We select a project-appropriate approach and connect it to the relevant product, data, and workflow.",
          },
          {
            title: "Evaluation and safeguards",
            description:
              "We define test cases, quality criteria, prohibited outcomes, fallback behaviour, and escalation paths.",
          },
          {
            title: "Observability and documentation",
            description:
              "We document prompts, context sources, limitations, evaluation results, and operating rules.",
          },
          {
            title: "Agents that keep working",
            description:
              "Where the case calls for it, we set up agents that stay with the product after launch: walking documented flows, reporting divergences, and keeping the description current.",
          },
        ],
        process: [
          {
            title: "Frame the use case",
            description:
              "We define the user, task, expected value, constraints, and conditions where AI should not act.",
          },
          {
            title: "Test feasibility",
            description:
              "We evaluate suitable approaches using representative examples and project-specific criteria.",
          },
          {
            title: "Integrate the capability",
            description:
              "We connect the selected solution to the required product or workflow.",
          },
          {
            title: "Validate controls",
            description:
              "We test quality, permissions, failure modes, fallback paths, and human review.",
          },
          {
            title: "Introduce and monitor",
            description:
              "We prepare the capability for use, establish monitoring, and hand over living documentation.",
          },
        ],
        result:
          "You receive an integrated AI capability for the agreed use case, together with its evaluation criteria, safeguards, monitoring approach, fallback behaviour, and documentation.",
        ctaTitle: "Have a specific task where AI might help?",
        ctaBody:
          "Let’s define the use case, evidence, constraints, and controls before choosing a solution.",
        metaTitle: "AI Integration",
        metaDescription:
          "Focused AI capabilities integrated with explicit context, evaluation criteria, safeguards, and human control.",
      },
      uk: {
        title: "Інтеграція ШІ",
        summary:
          "Додаємо ШІ до визначеної функції чи процесу з явним контекстом, оцінюванням, моніторингом і контролем людини.",
        hero:
          "Додаємо цільову ШІ-функцію до продукту або процесу з визначеним контекстом, критеріями оцінювання, запобіжниками та контролем людини.",
        whenNeeded: [
          "Функції продукту можуть допомогти інтелектуальний пошук або рекомендації.",
          "Процес містить повторюване виділення даних, класифікацію чи узагальнення.",
          "Користувачам потрібна генерація або підтримка рішень у бізнес-контексті.",
          "Доступні потрібні дані та репрезентативні приклади.",
          "Невизначені результати можна безпечно перевірити або опрацювати.",
        ],
        included: [
          {
            title: "Сценарій і межі",
            description:
              "Визначаємо потребу, очікуваний результат, обмеження, ризики та роль перевірки людиною.",
          },
          {
            title: "Дані та контекст",
            description:
              "Визначаємо потрібну інформацію та правила доступу й приватності.",
          },
          {
            title: "Рішення та інтеграція",
            description:
              "Добираємо відповідний підхід і підключаємо його до продукту, даних та процесу.",
          },
          {
            title: "Оцінювання й запобіжники",
            description:
              "Визначаємо тестові сценарії, критерії якості, заборонені результати та резервну поведінку.",
          },
          {
            title: "Спостережуваність і документація",
            description:
              "Документуємо промпти, джерела контексту, обмеження, результати оцінювання й операційні правила.",
          },
          {
            title: "Агенти, які продовжують працювати",
            description:
              "Якщо сценарій цього вимагає, налаштовуємо агентів, які залишаються з продуктом після запуску: проходять описані флоу, повідомляють про розбіжності й підтримують опис актуальним.",
          },
        ],
        process: [
          {
            title: "Формулюємо сценарій",
            description:
              "Визначаємо користувача, завдання, очікувану цінність, обмеження й умови, коли ШІ не повинен діяти.",
          },
          {
            title: "Перевіряємо доцільність",
            description:
              "Оцінюємо підходи на репрезентативних прикладах за критеріями конкретного проєкту.",
          },
          {
            title: "Інтегруємо функцію",
            description:
              "Підключаємо вибране рішення до потрібного продукту або процесу.",
          },
          {
            title: "Перевіряємо контроль",
            description:
              "Тестуємо якість, права доступу, помилки, резервні сценарії та перевірку людиною.",
          },
          {
            title: "Запроваджуємо й спостерігаємо",
            description:
              "Готуємо функцію до використання, налаштовуємо моніторинг і передаємо живу документацію.",
          },
        ],
        result:
          "Ви отримуєте інтегровану ШІ-функцію для погодженого сценарію разом із критеріями оцінювання, запобіжниками, моніторингом, резервною поведінкою та документацією.",
        ctaTitle: "Маєте конкретне завдання, у якому може допомогти ШІ?",
        ctaBody:
          "Спочатку визначмо сценарій, дані, обмеження й контроль, а потім оберімо рішення.",
        metaTitle: "Інтеграція ШІ",
        metaDescription:
          "Цільові ШІ-функції з визначеним контекстом, критеріями оцінювання, запобіжниками та контролем людини.",
      },
    },
  },
  {
    id: "06",
    slug: "software-extension-modernization",
    related: [
      "product-architecture-living-documentation",
      "web-app-development",
      "business-automation",
    ],
    copy: {
      en: {
        title: "Software Extension & Modernization",
        summary:
          "Extend existing business software with new features, integrations, and modules while improving its technical foundation step by step.",
        hero:
          "Add new features, integrations, and modules to existing business software without rebuilding the entire system from scratch.",
        whenNeeded: [
          "The system works but lacks capabilities the business now needs.",
          "You need to connect payments, CRM, analytics, AI, or other services.",
          "New features are difficult to add because of the current architecture.",
          "Some components are outdated and limit further development.",
          "A complete replacement would be too disruptive or risky.",
          "Changes must be introduced while the current system remains in use.",
        ],
        included: [
          {
            title: "Current-system assessment",
            description:
              "We examine the existing application, dependencies, data, constraints, and business logic.",
          },
          {
            title: "Documentation recovery",
            description:
              "We reconstruct missing system knowledge and document behaviour that must be preserved.",
          },
          {
            title: "Feature and integration design",
            description:
              "We define new capabilities and how they connect to existing workflows and data.",
          },
          {
            title: "Incremental implementation",
            description:
              "We develop modules, integrations, or component replacements in controlled stages.",
          },
          {
            title: "Validation and release",
            description:
              "We test compatibility and agreed scenarios and prepare a controlled release and rollback approach.",
          },
          {
            title: "Living documentation",
            description:
              "We update system structure, contracts, decisions, and operating guidance alongside each change.",
          },
        ],
        process: [
          {
            title: "Understand the current system",
            description:
              "We map how the software works, including dependencies and undocumented business behaviour.",
          },
          {
            title: "Define the change",
            description:
              "We describe the new capability and its relationship with existing logic, data, and users.",
          },
          {
            title: "Choose what to preserve",
            description:
              "We decide which parts can remain and which need refactoring, replacement, or isolation.",
          },
          {
            title: "Implement incrementally",
            description:
              "We introduce changes in controlled stages while keeping documentation aligned.",
          },
          {
            title: "Release and hand over",
            description:
              "We validate the updated system, release the agreed change, and transfer current documentation.",
          },
        ],
        result:
          "Your existing system gains the agreed features, integrations, or modules without requiring a complete rebuild. Updated components and their relationship to existing business logic are captured in living documentation.",
        ctaTitle: "Need to add new capabilities to an existing system?",
        ctaBody:
          "Let’s understand what should be preserved, extended, or updated.",
        metaTitle: "Software Extension & Modernization",
        metaDescription:
          "New features, integrations, and modules for existing business software without rebuilding the entire system.",
      },
      uk: {
        title: "Розвиток і модернізація наявних систем",
        summary:
          "Розвиваємо наявні бізнес-системи: додаємо функції, інтеграції й модулі та поступово оновлюємо їхню технічну основу.",
        hero:
          "Додаємо нові функції, інтеграції та модулі до наявних бізнес-систем без повної розробки продукту з нуля.",
        whenNeeded: [
          "Система працює, але їй бракує нових можливостей.",
          "Потрібно підключити платежі, CRM, аналітику, ШІ або інші сервіси.",
          "Нові функції складно додавати через поточну архітектуру.",
          "Окремі компоненти застаріли й обмежують розвиток.",
          "Повна заміна системи була б надто складною або ризикованою.",
          "Зміни потрібно впроваджувати без зупинення поточної роботи.",
        ],
        included: [
          {
            title: "Оцінювання наявної системи",
            description:
              "Вивчаємо застосунок, залежності, дані, обмеження й бізнес-логіку.",
          },
          {
            title: "Відновлення документації",
            description:
              "Відновлюємо відсутні знання про систему та документуємо поведінку, яку потрібно зберегти.",
          },
          {
            title: "Проєктування функцій та інтеграцій",
            description:
              "Визначаємо нові можливості та їхній зв’язок із наявними процесами й даними.",
          },
          {
            title: "Поетапна реалізація",
            description:
              "Розробляємо модулі, інтеграції або заміни компонентів контрольованими етапами.",
          },
          {
            title: "Перевірка й випуск",
            description:
              "Тестуємо сумісність і погоджені сценарії та готуємо контрольований випуск і варіант відкату.",
          },
          {
            title: "Жива документація",
            description:
              "Оновлюємо структуру, контракти, рішення та операційні інструкції разом із кожною зміною.",
          },
        ],
        process: [
          {
            title: "Вивчаємо поточну систему",
            description:
              "Описуємо роботу ПЗ, залежності й незадокументовану бізнес-поведінку.",
          },
          {
            title: "Визначаємо зміну",
            description:
              "Описуємо нову можливість і її зв’язок із наявною логікою, даними та користувачами.",
          },
          {
            title: "Визначаємо, що зберегти",
            description:
              "Вирішуємо, які частини можна залишити, а які потрібно оновити, замінити чи ізолювати.",
          },
          {
            title: "Реалізуємо поетапно",
            description:
              "Впроваджуємо зміни контрольованими частинами та синхронізуємо документацію.",
          },
          {
            title: "Випускаємо й передаємо",
            description:
              "Перевіряємо оновлену систему, випускаємо погоджену зміну та передаємо актуальну документацію.",
          },
        ],
        result:
          "Наявна система отримує погоджені функції, інтеграції чи модулі без повної перебудови. Оновлені компоненти та їхній зв’язок із бізнес-логікою зафіксовані в живій документації.",
        ctaTitle: "Потрібно додати нові можливості до наявної системи?",
        ctaBody:
          "Визначмо, що варто зберегти, розширити або оновити.",
        metaTitle: "Розвиток і модернізація наявних систем",
        metaDescription:
          "Нові функції, інтеграції та модулі для наявного бізнес-ПЗ без повної перебудови системи.",
      },
    },
  },
  {
    id: "07",
    slug: "custom-admin-panels",
    related: [
      "product-architecture-living-documentation",
      "business-automation",
      "software-extension-modernization",
    ],
    copy: {
      en: {
        title: "Custom Admin Panels",
        summary:
          "Give your team a purpose-built workspace for managing business data, workflows, access, approvals, reporting, and settings.",
        hero:
          "Give your team one purpose-built workspace to manage business data, daily operations, approvals, access, reporting, and system settings.",
        whenNeeded: [
          "Teams manage important operations through spreadsheets or disconnected tools.",
          "An existing system lacks a safe and practical internal interface.",
          "Different roles need specific data, actions, and permissions.",
          "Approvals and status changes are difficult to track.",
          "Reporting requires repeated manual preparation.",
          "Generic administration tools do not match how the business works.",
        ],
        included: [
          {
            title: "Operations and role mapping",
            description:
              "We document what teams manage, who is responsible, and what information and actions each role needs.",
          },
          {
            title: "Information and interface design",
            description:
              "We organize navigation, dashboards, tables, forms, detail views, filters, and actions around real tasks.",
          },
          {
            title: "Data and workflow management",
            description:
              "We implement tools for creating, reviewing, updating, assigning, and tracking business records.",
          },
          {
            title: "Roles, permissions, and approvals",
            description:
              "We define access rules, protected actions, approval paths, and relevant activity history.",
          },
          {
            title: "Reporting, settings, and integrations",
            description:
              "Where required, we add reports, exports, settings, notifications, and connections to relevant services.",
          },
          {
            title: "Validation and documentation",
            description:
              "We test agreed scenarios and maintain living documentation for fields, roles, rules, states, and procedures.",
          },
        ],
        process: [
          {
            title: "Understand the work",
            description:
              "We observe how the team manages data, decisions, exceptions, and responsibilities.",
          },
          {
            title: "Define rules and access",
            description:
              "We document entities, states, actions, roles, permissions, and approval logic.",
          },
          {
            title: "Design the workspace",
            description:
              "We shape screens and navigation around frequent and critical tasks.",
          },
          {
            title: "Build and connect",
            description:
              "We implement the panel in agreed increments and keep its documentation aligned.",
          },
          {
            title: "Validate and release",
            description:
              "We test workflows and permissions, prepare the approved version, and hand over operating guidance.",
          },
        ],
        result:
          "You receive an internal workspace covering the agreed operational scope, with role-specific access, data-management tools, workflows, reports, settings, integrations, and living documentation.",
        ctaTitle: "Does your team need a better way to run internal operations?",
        ctaBody:
          "Let’s define the data, tasks, roles, and controls the workspace should support.",
        metaTitle: "Custom Admin Panels",
        metaDescription:
          "Purpose-built internal workspaces for business data, operations, roles, approvals, reporting, and settings.",
      },
      uk: {
        title: "Кастомні адмінпанелі",
        summary:
          "Створюємо внутрішній робочий простір для керування бізнес-даними, процесами, доступами, погодженнями, звітністю та налаштуваннями.",
        hero:
          "Створюємо для команди єдиний внутрішній простір для керування бізнес-даними, щоденними операціями, погодженнями, доступами, звітністю та налаштуваннями.",
        whenNeeded: [
          "Команда керує важливими операціями через таблиці або розрізнені інструменти.",
          "Наявній системі бракує безпечного та практичного внутрішнього інтерфейсу.",
          "Різним ролям потрібні окремі дані, дії та права доступу.",
          "Погодження й зміни статусів складно відстежувати.",
          "Звіти доводиться щоразу готувати вручну.",
          "Стандартні адміністративні інструменти не відповідають роботі бізнесу.",
        ],
        included: [
          {
            title: "Опис операцій і ролей",
            description:
              "Документуємо, чим керують команди, хто за що відповідає та які дані й дії потрібні кожній ролі.",
          },
          {
            title: "Структура й дизайн інтерфейсу",
            description:
              "Організовуємо навігацію, дашборди, таблиці, форми, детальні сторінки, фільтри й дії навколо реальних завдань.",
          },
          {
            title: "Керування даними та процесами",
            description:
              "Реалізуємо інструменти для створення, перевірки, оновлення, призначення та відстеження бізнес-записів.",
          },
          {
            title: "Ролі, права та погодження",
            description:
              "Визначаємо правила доступу, захищені дії, шляхи погодження й потрібну історію активності.",
          },
          {
            title: "Звіти, налаштування та інтеграції",
            description:
              "За потреби додаємо звіти, експорт, налаштування, сповіщення та підключення до сервісів.",
          },
          {
            title: "Перевірка й документація",
            description:
              "Тестуємо погоджені сценарії та підтримуємо живу документацію полів, ролей, правил, станів і процедур.",
          },
        ],
        process: [
          {
            title: "Вивчаємо роботу команди",
            description:
              "З’ясовуємо, як вона керує даними, рішеннями, винятками та відповідальністю.",
          },
          {
            title: "Визначаємо правила й доступ",
            description:
              "Документуємо сутності, стани, дії, ролі, права та логіку погоджень.",
          },
          {
            title: "Проєктуємо робочий простір",
            description:
              "Будуємо екрани й навігацію навколо частих і критично важливих завдань.",
          },
          {
            title: "Розробляємо й підключаємо",
            description:
              "Реалізуємо панель погодженими частинами та синхронно оновлюємо документацію.",
          },
          {
            title: "Перевіряємо й запускаємо",
            description:
              "Тестуємо процеси та права, готуємо версію до використання й передаємо інструкції.",
          },
        ],
        result:
          "Ви отримуєте внутрішню адмінпанель для погоджених операцій із доступом за ролями, керуванням даними, процесами, звітами, налаштуваннями, інтеграціями та живою документацією.",
        ctaTitle: "Вашій команді потрібен зручніший спосіб керувати внутрішніми операціями?",
        ctaBody:
          "Визначмо дані, завдання, ролі й засоби контролю, які має підтримувати робочий простір.",
        metaTitle: "Кастомні адмінпанелі",
        metaDescription:
          "Внутрішні робочі простори для керування бізнес-даними, операціями, ролями, погодженнями та звітністю.",
      },
    },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
