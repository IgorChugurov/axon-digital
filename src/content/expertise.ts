import type { Locale } from "@/i18n/config";

export type ExpertisePoint = {
  title: string;
  description: string;
};

export type ExpertiseCopy = {
  title: string;
  summary: string;
  hero: string;
  /** Projects behind the area, anonymised. Omitted where we have none. */
  evidence?: string;
  points: ExpertisePoint[];
  situations: string[];
  outcome: string;
  metaTitle: string;
  metaDescription: string;
};

export type ExpertiseArea = {
  id: string;
  slug: string;
  relatedServices: string[];
  copy: Record<Locale, ExpertiseCopy>;
};

export const expertisePageCopy = {
  en: {
    eyebrow: "Expertise",
    title: "Expertise",
    intro:
      "Our expertise is a method before it is an industry. We describe a business process as data in motion—what data exists, which nodes change it, by what rule, and who may read data, run processing, or change how processing works—and we give every domain its own vocabulary and taxonomy. The areas below show the method holds where data, roles, workflows, and integrations are complex.",
    metaDescription:
      "A method for describing complex domains: data, processing nodes, access rights, vocabulary, and taxonomy — proven in financial operations, clinics, commerce, learning, and enterprise systems.",
    evidence: "What we have already built",
    points: "What we understand and work with",
    situations: "When this expertise is relevant",
    outcome: "System context",
    relatedServices: "Related services",
    back: "All expertise",
    openArea: "View expertise",
    notFoundTitle: "Expertise area not found",
    notFoundBody: "The requested expertise area does not exist.",
    notFoundHome: "Return home",
    ctaTitle: "Working in this domain?",
    ctaBody:
      "Let’s map your system and decide which flows to describe and check first.",
  },
  uk: {
    eyebrow: "Експертиза",
    title: "Експертиза",
    intro:
      "Наша експертиза — це насамперед метод, а не галузь. Бізнес-процес ми описуємо як рух даних: які дані існують, у яких вузлах вони змінюються, за яким правилом і хто має право читати дані, запускати обробку та змінювати саму обробку, — і для кожної галузі складаємо власний вокабуляр і таксономію. Напрями нижче показують, що метод витримує там, де дані, ролі, процеси та інтеграції складні.",
    metaDescription:
      "Метод опису складних доменів: дані, вузли обробки, права доступу, вокабуляр і таксономія — перевірений у фінансових операціях, клініках, торгівлі, навчанні та корпоративних системах.",
    evidence: "Що ми вже зробили",
    points: "Що ми розуміємо й з чим працюємо",
    situations: "Коли ця експертиза актуальна",
    outcome: "Контекст системи",
    relatedServices: "Пов’язані послуги",
    back: "Уся експертиза",
    openArea: "Переглянути напрям",
    notFoundTitle: "Напрям експертизи не знайдено",
    notFoundBody: "Запитаного напряму експертизи не існує.",
    notFoundHome: "На головну",
    ctaTitle: "Працюєте в цій галузі?",
    ctaBody:
      "Складімо карту вашої системи й визначмо, які флоу описати та перевіряти першими.",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: "01",
    slug: "fintech-financial-operations",
    relatedServices: [
      "product-architecture-living-documentation",
      "web-app-development",
      "business-automation",
    ],
    copy: {
      en: {
        title: "Fintech: Financial Operations & Accounting",
        summary:
          "Systems for operational accounting, cash flow, settlements, inventory movements, postings, and financial reporting.",
        hero:
          "Our Fintech expertise is focused on financial operations and accounting—not banking or payment products. We work with systems that connect source records, operational activity, accounting entries, balances, and reports.",
        evidence:
          "From 2013 to 2022 we built and ran the operations platform of a vehicle service business: a workstation for every mechanic, warehouse and parts, work orders, customer settlements, and payroll. Operational records and their accounting representation followed one set of rules for nine years.",
        points: [
          {
            title: "Accounting data flows",
            description:
              "How source records and business operations become entries, balances, and reports.",
          },
          {
            title: "Inventory-linked accounting",
            description:
              "Receipts, movements, write-offs, availability, and their accounting representation.",
          },
          {
            title: "Cash flow and settlements",
            description:
              "Recording movements and obligations involving suppliers, customers, or internal units.",
          },
          {
            title: "Ledgers and reporting",
            description:
              "Account-based postings, trial balances, balance-sheet data, and profit-and-loss reporting.",
          },
          {
            title: "Operational structure",
            description:
              "Accounting across divisions, warehouses, projects, or other agreed business units.",
          },
          {
            title: "System connections",
            description:
              "APIs and data exchanges linking accounting modules with operational systems.",
          },
        ],
        situations: [
          "Accounting and operational records are maintained in disconnected tools.",
          "Inventory movements and financial records need to follow the same business rules.",
          "Settlements or balances require repeated manual reconciliation.",
          "Different divisions or warehouses need a shared but structured accounting model.",
          "Existing software needs an additional accounting module or integration.",
          "Reporting depends on manually combining data from several systems.",
        ],
        outcome:
          "Depending on the agreed scope, the system may be an accounting module, an internal financial workspace, or an integrated operational system connecting records, inventory, settlements, postings, and reporting. Its rules, reports, roles, and integrations follow the organisation’s accounting model and workflows.",
        metaTitle: "Fintech: Financial Operations & Accounting",
        metaDescription:
          "Expertise in systems for operational accounting, cash flow, settlements, inventory movements, postings, and financial reporting.",
      },
      uk: {
        title: "Fintech: Фінансові операції та бухгалтерський облік",
        summary:
          "Системи для операційного обліку, руху коштів, взаєморозрахунків, складських операцій, проведень і фінансової звітності.",
        hero:
          "Наша Fintech-експертиза зосереджена на фінансових операціях і бухгалтерському обліку, а не на банківських чи платіжних продуктах. Ми працюємо із системами, що поєднують первинні записи, операційну діяльність, бухгалтерські проведення, залишки та звітність.",
        evidence:
          "З 2013 до 2022 року ми побудували й супроводжували операційну платформу автосервісу: робоче місце кожного механіка, склад і запчастини, наряд-замовлення, розрахунки з клієнтами та зарплати. Операційні записи та їхнє облікове відображення дев’ять років жили за одними правилами.",
        points: [
          {
            title: "Потоки облікових даних",
            description:
              "Як первинні записи та бізнес-операції перетворюються на проведення, залишки й звіти.",
          },
          {
            title: "Облік, пов’язаний із запасами",
            description:
              "Надходження, переміщення, списання, наявність та їхнє відображення в обліку.",
          },
          {
            title: "Рух коштів і взаєморозрахунки",
            description:
              "Фіксація рухів і зобов’язань щодо постачальників, клієнтів або внутрішніх підрозділів.",
          },
          {
            title: "Регістри та звітність",
            description:
              "Проведення за рахунками, оборотно-сальдові відомості, дані балансу та звіту про прибутки й збитки.",
          },
          {
            title: "Операційна структура",
            description:
              "Облік за підрозділами, складами, проєктами чи іншими погодженими одиницями бізнесу.",
          },
          {
            title: "Зв’язки між системами",
            description:
              "API та обмін даними між обліковими модулями й операційними системами.",
          },
        ],
        situations: [
          "Облікові й операційні дані ведуться в розрізнених інструментах.",
          "Складські рухи та фінансові записи мають підпорядковуватися спільним бізнес-правилам.",
          "Взаєморозрахунки або залишки потребують повторного ручного звіряння.",
          "Підрозділам чи складам потрібна спільна, але структурована модель обліку.",
          "Наявній системі потрібен додатковий обліковий модуль або інтеграція.",
          "Для звітності доводиться вручну поєднувати дані з кількох систем.",
        ],
        outcome:
          "Залежно від погодженого обсягу система може бути обліковим модулем, внутрішнім фінансовим робочим простором або інтегрованою операційною системою, що поєднує записи, запаси, взаєморозрахунки, проведення та звітність. Її правила, звіти, ролі й інтеграції визначаються обліковою моделлю та процесами організації.",
        metaTitle: "Fintech: Фінансові операції та бухгалтерський облік",
        metaDescription:
          "Експертиза в системах операційного обліку, руху коштів, взаєморозрахунків, складських операцій і фінансової звітності.",
      },
    },
  },
  {
    id: "02",
    slug: "healthcare-clinical-systems",
    relatedServices: [
      "product-architecture-living-documentation",
      "web-app-development",
      "custom-admin-panels",
    ],
    copy: {
      en: {
        title: "Healthcare: Clinical & Administrative Systems",
        summary:
          "Systems for patient records, visits, scheduling, clinical documentation, roles, and connected administrative workflows.",
        hero:
          "We work with clinical and administrative systems that organise patient information, visits, schedules, documents, responsibilities, and related workflows. The focus is on making complex records and actions clear to the people who use and manage them.",
        evidence:
          "In 2024 and 2025 we delivered the portals of a clinic network as a multi-domain system: the public site, the administrative workspace, the management workspace, a file service, and the documentation each run as a separate application with its own roles inside one architecture.",
        points: [
          {
            title: "Patient records",
            description:
              "Structured profiles, histories, attached files, and related clinical information.",
          },
          {
            title: "Visits and care workflows",
            description:
              "Visit preparation, notes, statuses, follow-up actions, and summaries.",
          },
          {
            title: "Scheduling",
            description:
              "Practitioner calendars, appointment availability, bookings, changes, and reminders.",
          },
          {
            title: "Clinical documentation",
            description:
              "Structured notes and documents based on recorded visit information.",
          },
          {
            title: "Roles and responsibilities",
            description:
              "Distinct views and actions for practitioners, administrators, and other defined roles.",
          },
          {
            title: "Traceability and integrations",
            description:
              "Activity history and connections with relevant calendars, messaging, document, or administrative systems.",
          },
        ],
        situations: [
          "Patient information is distributed across disconnected tools or documents.",
          "Visit preparation, documentation, and follow-up lack a shared workflow.",
          "Scheduling requires repeated manual coordination.",
          "Different roles need controlled access to distinct information and actions.",
          "Clinical documents are prepared repeatedly from already recorded data.",
          "An existing system needs new workflows, interfaces, or integrations.",
        ],
        outcome:
          "Depending on the agreed scope, the system may be a patient-record module, scheduling workspace, documentation workflow, administrative interface, or an integrated clinical operations system. Its records, roles, states, actions, and connections are defined around the organisation’s actual workflows.",
        metaTitle: "Healthcare: Clinical & Administrative Systems",
        metaDescription:
          "Expertise in patient records, visits, scheduling, clinical documentation, roles, and connected administrative workflows.",
      },
      uk: {
        title: "Healthcare: Клінічні та адміністративні системи",
        summary:
          "Системи для записів пацієнтів, візитів, розкладу, клінічної документації, ролей і пов’язаних адміністративних процесів.",
        hero:
          "Ми працюємо з клінічними та адміністративними системами, що впорядковують інформацію про пацієнтів, візити, розклад, документи, відповідальність і пов’язані процеси. Основна увага — зрозуміла робота зі складними записами та діями для користувачів і адміністраторів.",
        evidence:
          "У 2024–2025 роках ми зробили портали мережі клінік як мультидоменну систему: публічний сайт, адміністративна частина, керівна частина, файловий сервіс і документація працюють як окремі застосунки зі своїми ролями в межах однієї архітектури.",
        points: [
          {
            title: "Записи пацієнтів",
            description:
              "Структуровані профілі, історії, прикріплені файли та пов’язана клінічна інформація.",
          },
          {
            title: "Візити й клінічні процеси",
            description:
              "Підготовка до візиту, нотатки, статуси, подальші дії та підсумки.",
          },
          {
            title: "Розклад",
            description:
              "Календарі фахівців, доступні години, записи, зміни та нагадування.",
          },
          {
            title: "Клінічна документація",
            description:
              "Структуровані нотатки й документи на основі зафіксованої інформації про візит.",
          },
          {
            title: "Ролі та відповідальність",
            description:
              "Окремі представлення й дії для фахівців, адміністраторів та інших визначених ролей.",
          },
          {
            title: "Простежуваність та інтеграції",
            description:
              "Історія дій і зв’язки з потрібними календарями, повідомленнями, документними чи адміністративними системами.",
          },
        ],
        situations: [
          "Інформація про пацієнтів розподілена між різними інструментами чи документами.",
          "Підготовка, документування та подальші дії після візиту не мають спільного процесу.",
          "Розклад потребує постійного ручного узгодження.",
          "Різним ролям потрібен контрольований доступ до окремих даних і дій.",
          "Клінічні документи повторно готуються з уже зафіксованої інформації.",
          "Наявній системі потрібні нові процеси, інтерфейси або інтеграції.",
        ],
        outcome:
          "Залежно від погодженого обсягу система може бути модулем записів пацієнтів, робочим простором для розкладу, процесом підготовки документів, адміністративним інтерфейсом або інтегрованою системою клінічних операцій. Її записи, ролі, стани, дії та зв’язки визначаються навколо реальних процесів організації.",
        metaTitle: "Healthcare: Клінічні та адміністративні системи",
        metaDescription:
          "Експертиза в системах записів пацієнтів, візитів, розкладу, клінічної документації та адміністративних процесів.",
      },
    },
  },
  {
    id: "03",
    slug: "ecommerce-marketplace-systems",
    relatedServices: [
      "web-app-development",
      "business-automation",
      "ai-integration",
    ],
    copy: {
      en: {
        title: "E-commerce & Marketplace Systems",
        summary:
          "Systems connecting online storefronts, product catalogues, orders, inventory, sellers, and operational data.",
        hero:
          "We work with e-commerce systems that connect the customer-facing storefront with product, order, inventory, and seller operations. The scope may range from an individual online store to a marketplace with multiple participating sellers.",
        evidence:
          "Since 2013 we have been developing a platform whose single core is deployed as complete sites; a shopping-mall marketplace runs on it today. Catalogues, storefront journeys, and seller operations are configured per project instead of being rebuilt each time.",
        points: [
          {
            title: "Product catalogues",
            description:
              "Categories, product records, variants, prices, media, availability, search, and filters.",
          },
          {
            title: "Storefront journeys",
            description:
              "Product discovery, product details, baskets, checkout, and order confirmation.",
          },
          {
            title: "Orders and fulfilment states",
            description:
              "Order records, status changes, returns, and operational follow-up.",
          },
          {
            title: "Inventory operations",
            description:
              "Stock balances, arrivals, sales, returns, and synchronisation with related systems.",
          },
          {
            title: "Seller operations",
            description:
              "Seller-specific products, availability, orders, responsibilities, and marketplace roles.",
          },
          {
            title: "Operational data",
            description:
              "Dashboards and reports for reviewing catalogue, order, inventory, and seller activity.",
          },
        ],
        situations: [
          "Catalogue, order, and inventory data are maintained in disconnected tools.",
          "An online store needs workflows specific to its products or operating model.",
          "Several sellers need distinct access, responsibilities, and product-management tools.",
          "Stock changes must remain connected with orders, returns, or internal records.",
          "Store teams need a dedicated workspace for daily operations.",
          "An existing commerce system needs new modules or integrations without complete replacement.",
        ],
        outcome:
          "Depending on the agreed scope, the system may be an online store, marketplace module, catalogue or order-management workspace, inventory connection, or an integrated commerce system. Its roles, records, states, rules, and integrations follow the selected operating model.",
        metaTitle: "E-commerce & Marketplace Systems",
        metaDescription:
          "Expertise in online storefronts, catalogues, orders, inventory, seller operations, and commerce data.",
      },
      uk: {
        title: "E-commerce та системи маркетплейсів",
        summary:
          "Системи, що поєднують онлайн-магазини, каталоги товарів, замовлення, запаси, продавців та операційні дані.",
        hero:
          "Ми працюємо із системами електронної комерції, що поєднують клієнтську частину магазину з керуванням товарами, замовленнями, запасами та продавцями. Обсяг може охоплювати як окремий онлайн-магазин, так і маркетплейс із кількома продавцями.",
        evidence:
          "З 2013 року ми розвиваємо платформу, єдине ядро якої розгортається як повноцінні сайти; сьогодні на ній працює маркетплейс супермолу. Каталоги, шлях покупця та операції продавців налаштовуються під проєкт, а не переписуються щоразу заново.",
        points: [
          {
            title: "Каталоги товарів",
            description:
              "Категорії, картки, варіанти, ціни, медіа, наявність, пошук і фільтри.",
          },
          {
            title: "Сценарії покупця",
            description:
              "Пошук товару, сторінки товарів, кошик, оформлення та підтвердження замовлення.",
          },
          {
            title: "Замовлення й виконання",
            description:
              "Записи замовлень, зміни статусів, повернення та подальші операційні дії.",
          },
          {
            title: "Операції із запасами",
            description:
              "Залишки, надходження, продажі, повернення та синхронізація з пов’язаними системами.",
          },
          {
            title: "Робота продавців",
            description:
              "Окремі товари, наявність, замовлення, відповідальність і ролі учасників маркетплейсу.",
          },
          {
            title: "Операційні дані",
            description:
              "Дашборди та звіти для перегляду активності каталогів, замовлень, запасів і продавців.",
          },
        ],
        situations: [
          "Дані каталогу, замовлень і запасів ведуться в розрізнених інструментах.",
          "Онлайн-магазину потрібні процеси, що відповідають його товарам або операційній моделі.",
          "Кільком продавцям потрібні окремі доступи, обов’язки та інструменти керування товарами.",
          "Зміни запасів мають бути пов’язані із замовленнями, поверненнями чи внутрішніми записами.",
          "Команді магазину потрібен окремий робочий простір для щоденних операцій.",
          "Наявній commerce-системі потрібні нові модулі або інтеграції без повної заміни.",
        ],
        outcome:
          "Залежно від погодженого обсягу система може бути онлайн-магазином, модулем маркетплейсу, робочим простором для каталогу чи замовлень, інтеграцією запасів або комплексною commerce-системою. Її ролі, записи, стани, правила й інтеграції визначаються відповідно до обраної операційної моделі.",
        metaTitle: "E-commerce та системи маркетплейсів",
        metaDescription:
          "Експертиза в онлайн-магазинах, каталогах, замовленнях, запасах, роботі продавців та операційних даних.",
      },
    },
  },
  {
    id: "04",
    slug: "enterprise-systems-operations",
    relatedServices: [
      "business-automation",
      "software-extension-modernization",
      "custom-admin-panels",
    ],
    copy: {
      en: {
        title: "Enterprise Systems & Operations",
        summary:
          "Complex internal systems with transactional operations, versioned subscriptions, multi-level access, traceable business events, and structured diagnostics.",
        hero:
          "We understand enterprise systems where access and available capabilities depend on organisational scope, subscription state, plan version, role, and entitlement. These systems must preserve historical meaning, coordinate related state changes, handle repeated or concurrent requests, and keep business history distinct from technical diagnostics.",
        evidence:
          "Our current work is an operations platform where the delivery pipeline is part of the product: scenario packages, runners, scheduled runs, and step-level reports live in its administrative workspace. Before that, from 2013 to 2022, we ran the full operational cycle of a vehicle service business, from the shop floor to payroll.",
        points: [
          {
            title: "Organisation-scoped subscriptions",
            description:
              "Subscription state and available capabilities associated with a specific organisation, branch, or facility.",
          },
          {
            title: "Versioned plans",
            description:
              "Frozen plan versions preserve the terms used by existing subscriptions when plans later change.",
          },
          {
            title: "Effective access",
            description:
              "System-side evaluation of roles, entitlements, subscription state, and capability restrictions.",
          },
          {
            title: "Transactionality and idempotency",
            description:
              "Related changes are applied atomically, while duplicate requests do not repeat the business effect.",
          },
          {
            title: "Business event history",
            description:
              "Relevant events are appended in sequence and corrections are recorded without rewriting prior history.",
          },
          {
            title: "Logging and diagnostics",
            description:
              "Structured technical logs record failures, statuses, and durations without replacing business history.",
          },
        ],
        situations: [
          "Subscriptions and capabilities must be isolated by organisation, branch, or facility.",
          "Existing subscriptions must retain their original terms after a plan changes.",
          "Access depends on several conditions rather than a single role or permission.",
          "One business operation changes several related records that must remain consistent.",
          "Requests may be retried or duplicated without repeating the business effect.",
          "Concurrent changes, business history, and technical incidents require distinct handling.",
        ],
        outcome:
          "The resulting system context has explicit boundaries for subscriptions, plan versions, access, usage, validation, and history. Transactionality protects coupled state changes; business event records explain domain activity and corrections; technical logs support diagnosis without becoming the business ledger.",
        metaTitle: "Enterprise Systems & Operations",
        metaDescription:
          "Expertise in transactional enterprise systems, versioned subscriptions, multi-level access, business event history, and structured logging.",
      },
      uk: {
        title: "Корпоративні системи та операції",
        summary:
          "Складні внутрішні системи з транзакційними операціями, версійними підписками, багаторівневим доступом, простежуваною історією бізнес-подій і структурованою технічною діагностикою.",
        hero:
          "Ми розуміємо корпоративні системи, у яких доступні можливості залежать від організаційного контексту, стану підписки, версії плану, ролі та прав. Такі системи мають зберігати історичний зміст даних, узгоджувати пов’язані зміни стану, опрацьовувати повторні чи одночасні запити та відокремлювати історію бізнес-подій від технічної діагностики.",
        evidence:
          "Наша поточна робота — операційна платформа, у якій конвеєр поставки є частиною продукту: пакети сценаріїв, виконавці, запуски за розкладом і покрокові звіти живуть у її адміністративній частині. До того, з 2013 до 2022 року, ми провадили повний операційний цикл автосервісу — від цеху до розрахунку зарплат.",
        points: [
          {
            title: "Підписки в межах організації",
            description:
              "Стан підписки та доступні можливості пов’язані з конкретною організацією, філією або facility.",
          },
          {
            title: "Версійні плани",
            description:
              "Зафіксовані версії планів зберігають умови чинних підписок після подальших змін.",
          },
          {
            title: "Фактичний доступ",
            description:
              "Система зіставляє ролі, права, стан підписки й обмеження можливостей.",
          },
          {
            title: "Транзакційність та ідемпотентність",
            description:
              "Пов’язані зміни застосовуються атомарно, а повторний запит не дублює бізнес-результат.",
          },
          {
            title: "Історія бізнес-подій",
            description:
              "Значущі події додаються послідовно, а виправлення не переписують попередню історію.",
          },
          {
            title: "Логування та діагностика",
            description:
              "Технічні логи фіксують помилки, статуси й тривалість операцій, не підміняючи бізнес-історію.",
          },
        ],
        situations: [
          "Підписки та можливості мають бути ізольовані в межах організації, філії або facility.",
          "Чинні підписки мають зберігати початкові умови після зміни плану.",
          "Доступ залежить від кількох умов, а не лише від однієї ролі чи права.",
          "Одна бізнес-операція змінює кілька пов’язаних записів, які мають залишатися узгодженими.",
          "Запити можуть повторюватися без повторного застосування бізнес-результату.",
          "Конкурентні зміни, бізнес-історія та технічні інциденти потребують різного опрацювання.",
        ],
        outcome:
          "У результаті система має чіткі межі для підписок, версій планів, доступу, використання, валідації та історії. Транзакційність підтримує узгодженість пов’язаних змін стану; записи бізнес-подій пояснюють доменні дії та виправлення; технічні логи забезпечують діагностику, не підміняючи бізнес-реєстр.",
        metaTitle: "Корпоративні системи та операції",
        metaDescription:
          "Експертиза у транзакційних корпоративних системах, версійних підписках, багаторівневому доступі, історії подій і логуванні.",
      },
    },
  },
  {
    id: "05",
    slug: "education-learning-systems",
    relatedServices: [
      "product-architecture-living-documentation",
      "web-app-development",
      "ai-integration",
    ],
    copy: {
      en: {
        title: "Education & Learning Systems",
        summary:
          "Systems connecting courses, schedules, live classes, access models, broadcast archives, learning activities, and institutional records.",
        hero:
          "We work with education platforms that connect learning administration with live delivery: schedules, classes, participant access, broadcasts organised within the platform, archived sessions, and related learning records.",
        evidence:
          "From 2019 to 2022 we built a learning platform with class scheduling, single-session access and subscriptions, broadcasts organised inside the platform, and an archive of recordings, so access rights, payments, and real-time delivery lived in one system.",
        points: [
          {
            title: "Courses and content",
            description:
              "Programmes, courses, lessons, materials, and archived broadcasts organised into a clear learning structure.",
          },
          {
            title: "Scheduling management",
            description:
              "Classes, time slots, instructors, participant groups, schedule changes, and related states.",
          },
          {
            title: "Live classes",
            description:
              "Scheduled broadcasts created, organised, and accessed through the learning platform itself.",
          },
          {
            title: "Purchasing and access models",
            description:
              "One-time access to a live broadcast or continuing access through a subscription or pass.",
          },
          {
            title: "Learning activity and progress",
            description:
              "Participation, attendance, assignments, assessment, feedback, and progress records.",
          },
          {
            title: "Roles and institutional records",
            description:
              "Distinct actions and information for learners, educators, and administrators.",
          },
        ],
        situations: [
          "Classes require a shared schedule for instructors, groups, and participants.",
          "Live sessions need to be organised and accessed within the learning platform.",
          "Different broadcasts require different access rules.",
          "Users may obtain access to one event or through a subscription or pass.",
          "Recorded broadcasts need to remain available to eligible users as an archive.",
          "Scheduling, access, learning activity, and records are managed in disconnected tools.",
        ],
        outcome:
          "Depending on the agreed scope, the system may connect course content, scheduling, live broadcasts, one-time or subscription-based access rules, session archives, learning activity, and administration. Access models define who may join or revisit learning content without implying ownership of payment-processing infrastructure.",
        metaTitle: "Education & Learning Systems",
        metaDescription:
          "Expertise in schedules, live learning, one-time and subscription access, broadcast archives, courses, and administration.",
      },
      uk: {
        title: "Освітні та навчальні системи",
        summary:
          "Системи, що поєднують курси, розклад, live-заняття, моделі доступу, архіви трансляцій, навчальні активності та інституційні записи.",
        hero:
          "Ми працюємо з освітніми платформами, що поєднують адміністрування навчання з проведенням live-занять: розклад, заняття, доступ учасників, трансляції всередині платформи, архівні записи та пов’язані навчальні дані.",
        evidence:
          "З 2019 до 2022 року ми зробили навчальну платформу з розкладом занять, разовим доступом і абонементами, трансляціями всередині платформи та архівом записів, тож права доступу, платежі й робота в реальному часі жили в одній системі.",
        points: [
          {
            title: "Курси й контент",
            description:
              "Програми, курси, заняття, матеріали та архівні трансляції у зрозумілій навчальній структурі.",
          },
          {
            title: "Керування розкладом",
            description:
              "Заняття, часові слоти, викладачі, групи учасників, зміни розкладу та пов’язані стани.",
          },
          {
            title: "Live-заняття",
            description:
              "Заплановані трансляції, які створюються, організовуються та переглядаються через навчальну платформу.",
          },
          {
            title: "Моделі придбання й доступу",
            description:
              "Разовий доступ до live-трансляції або триваліший доступ за підпискою чи абонементом.",
          },
          {
            title: "Навчальна активність і прогрес",
            description:
              "Участь, відвідуваність, завдання, оцінювання, зворотний зв’язок і записи прогресу.",
          },
          {
            title: "Ролі та інституційні записи",
            description:
              "Окремі дії й дані для учасників, викладачів та адміністраторів.",
          },
        ],
        situations: [
          "Для занять потрібен спільний розклад викладачів, груп та учасників.",
          "Live-сесії потрібно організовувати й переглядати всередині навчальної платформи.",
          "Для різних трансляцій потрібні різні правила доступу.",
          "Користувачі можуть отримувати доступ до події або за підпискою чи абонементом.",
          "Записи трансляцій мають залишатися доступними визначеним користувачам в архіві.",
          "Розклад, доступ, навчальна активність та записи ведуться в розрізнених інструментах.",
        ],
        outcome:
          "Залежно від погодженого обсягу система може поєднувати контент курсів, розклад, live-трансляції, правила разового чи підписного доступу, архів занять, навчальну активність та адміністрування. Моделі доступу визначають, хто може долучитися до заняття або переглянути його пізніше, але не означають наявності власної платіжної інфраструктури.",
        metaTitle: "Освітні та навчальні системи",
        metaDescription:
          "Експертиза у розкладах, live-навчанні, разовому й підписному доступі, архівах трансляцій та адмініструванні.",
      },
    },
  },
];

export function getExpertiseArea(slug: string) {
  return expertiseAreas.find((area) => area.slug === slug);
}
