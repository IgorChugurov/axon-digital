import type { Locale } from "@/i18n/config";

export const deliveryCopy = {
  en: {
    eyebrow: "Delivery system",
    title: "Documentation that runs",
    lead: "A product description is not a report filed after the work is done. For us it is the working mechanism of delivery: the interface and the code grow from it, and the checks that protect it are taken from it.",
    problemTitle: "Why documentation usually dies",
    problems: [
      "Written once, a description drifts away from the system within weeks, and nobody trusts it again.",
      "The reasons behind decisions stay in people’s heads and leave when they do.",
      "Regressions are found by users, because nothing walks the product the way a person would.",
    ],
    chainTitle: "One description, one chain",
    chain: [
      {
        title: "Business process",
        description:
          "Before the first screen exists, the process is taken apart: what data lives in it, which nodes change that data, by what rule each change happens, and who may read data, run processing, or change how processing works. Responsibilities are separated into layers at the same time: modelling the data, maintaining it, and using it through an interface.",
      },
      {
        title: "Flow",
        description:
          "Describes the user’s path, the result they receive, and why that result matters to the business — in language a domain expert can verify.",
      },
      {
        title: "Design",
        description:
          "Screens are derived from the flow in two stages: the solution is agreed first, implementation follows only after that.",
      },
      {
        title: "Code",
        description:
          "Frontend and backend are built from the same flow, so they cannot drift into two different readings of one rule.",
      },
      {
        title: "Executable scenario",
        description:
          "The same flow in runnable form: steps of the shape “do this — this must be visible”, plus rules that must always hold.",
      },
    ],
    checksTitle: "Two checks, one source",
    checks: [
      {
        title: "Behaviour",
        description:
          "An agent executes the scenario against the live interface, navigating real screens, then reports the failing step and separates a broken rule from an environment problem.",
      },
      {
        title: "Design",
        description:
          "The implemented screens are compared against the design source. The report lists divergences with exact values — a wrong type size, a colour that is not the specified one, a column hidden by a breakpoint rather than pushed out of view.",
      },
    ],
    fixTitle: "What happens when a check fails",
    fixBody:
      "An engineer directs an agent that holds the failing report, the flow description and the violated rule, and prepares the correction. Merging is a human decision.",
    toolsTitle: "Tools change, the mechanism does not",
    toolsBody:
      "We automate understood steps, not tools. Each step has a defined input, a defined output and a rule for what counts as done, so when a stronger model or runner appears it takes over a step that already exists, and nothing in the process has to be rebuilt. You are not buying our current toolchain; you are buying steps that keep working when the toolchain changes.",
    boundariesTitle: "What the machine never decides",
    boundaries: [
      "Automation updates facts; it does not rewrite decisions. Architecture contracts, recorded decisions and the intended state of the system change only through a person, and anything ambiguous is escalated instead of guessed.",
      "A check that has nothing to compare against says so instead of producing a verdict. This boundary is part of the process, not a matter of good intentions.",
      "Describing a process shows where it repeats itself, but deciding to change the process is yours, not ours.",
    ],
    circuitTitle: "People and agents in one circuit",
    circuitBody:
      "Engineers who also own architecture, a project manager and a designer work alongside permanent agents assigned to documentation, design, frontend, backend and testing. Every routine function has a permanent owner, so people spend their time on decisions rather than on maintaining the process.",
    outcomesTitle: "What this changes for you",
    outcomes: [
      "Regressions surface before your users meet them.",
      "The description of your system stays current, because delivery depends on it.",
      "A new engineer enters the project through documentation rather than through someone’s memory.",
      "A correction does not wait for an engineer to become free.",
    ],
    exampleTitle: "What a scenario looks like",
    exampleLabels: {
      goal: "Goal",
      why: "Why it matters",
      steps: "Steps",
      rules: "Rules that must hold",
    },
    example: {
      goal: "A customer adds a paid option to an active subscription and sees the new price before confirming.",
      why: "A wrong price at confirmation destroys trust in billing and creates support load.",
      steps: [
        "Open the subscription page — current plan and price are visible.",
        "Add the paid option — the recalculated price appears before confirmation.",
        "Confirm — the new option and price are shown on the subscription.",
      ],
      rules: [
        "The price shown before confirmation equals the price charged.",
        "The same option cannot be added twice.",
      ],
    },
    ctaTitle: "Want this level of control on your project?",
    ctaBody:
      "Let’s look at your system and decide which flows should be described and checked first.",
    metaTitle: "Delivery system",
    metaDescription:
      "Flows described as documentation, executed as scenarios and checked against design and behaviour before your users meet a regression.",
  },
  uk: {
    eyebrow: "Система поставки",
    title: "Документація як механізм поставки",
    lead: "Опис продукту — не звіт, який складають після роботи. Для нас це робочий механізм поставки: з нього виростає інтерфейс і код, і з нього ж беруться перевірки, які його захищають.",
    problemTitle: "Чому документація зазвичай вмирає",
    problems: [
      "Написаний одного разу опис за кілька тижнів розходиться із системою, і довіряти йому вже неможливо.",
      "Причини рішень залишаються в головах людей і зникають разом із ними.",
      "Регресії знаходять користувачі, бо ніщо не проходить продукт так, як це робить людина.",
    ],
    chainTitle: "Один опис — один ланцюг",
    chain: [
      {
        title: "Бізнес-процес",
        description:
          "Ще до першого екрана процес розкладається на частини: які дані в ньому живуть, у яких вузлах вони змінюються, за яким правилом відбувається кожна зміна і хто має право читати дані, запускати обробку та змінювати саму обробку. Тоді ж відповідальності розводяться по шарах: моделювання даних, їхнє ведення й користування ними через інтерфейс.",
      },
      {
        title: "Флоу",
        description:
          "Описує шлях користувача, результат, який він отримує, і те, чому цей результат важливий для бізнесу — мовою, яку може перевірити експерт домену.",
      },
      {
        title: "Дизайн",
        description:
          "Екрани постають із флоу у два етапи: спочатку узгоджується рішення, і лише потім з’являється реалізація.",
      },
      {
        title: "Код",
        description:
          "Фронтенд і бекенд будуються з того самого флоу, тому не можуть розійтися у двох різних трактуваннях одного правила.",
      },
      {
        title: "Виконуваний сценарій",
        description:
          "Той самий флоу в придатній до запуску формі: кроки на кшталт «зроби це — має бути видно те» і правила, які мусять справджуватися завжди.",
      },
    ],
    checksTitle: "Дві перевірки, одне джерело",
    checks: [
      {
        title: "Поведінка",
        description:
          "Агент виконує сценарій у живому інтерфейсі, проходячи реальні екрани, і повідомляє крок, на якому сталася помилка, відрізняючи порушене правило від проблеми середовища.",
      },
      {
        title: "Дизайн",
        description:
          "Реалізовані екрани зіставляються з джерелом дизайну. Звіт перелічує розбіжності з точними значеннями — інший кегль, колір, що не відповідає заданому, колонка, схована брейкпойнтом, а не витиснена за межі видимості.",
      },
    ],
    fixTitle: "Що відбувається, коли перевірка падає",
    fixBody:
      "Інженер керує агентом, у якого є звіт про падіння, опис флоу та порушене правило, і той готує виправлення. Рішення про влиття ухвалює людина.",
    toolsTitle: "Інструменти змінюються, механізм — ні",
    toolsBody:
      "Ми автоматизуємо зрозумілі кроки, а не інструменти. У кожного кроку є визначений вхід, визначений вихід і правило, за яким його вважають виконаним, тому щойно з’являється сильніша модель або виконавець, вона переймає крок, який уже існує, і в процесі нічого не доводиться перебудовувати. Ви купуєте не наш поточний набір інструментів, а кроки, які працюють і після його зміни.",
    boundariesTitle: "Чого машина не вирішує",
    boundaries: [
      "Автоматика оновлює факти, але не переписує рішення. Архітектурні контракти, зафіксовані рішення та цільовий стан системи змінює лише людина, а все неоднозначне передається на розгляд, а не вгадується.",
      "Перевірка, якій немає з чим зіставляти, повідомляє про це, а не видає вердикт. Ця межа закладена в процес, а не залишена на добрі наміри.",
      "Опис процесу показує, де він повторює сам себе, але рішення змінювати процес — ваше, не наше.",
    ],
    circuitTitle: "Люди й агенти в одному контурі",
    circuitBody:
      "Інженери, які відповідають і за архітектуру, менеджер проєкту та дизайнер працюють поряд із постійними агентами, закріпленими за документацією, дизайном, фронтендом, бекендом і тестуванням. У кожної рутинної функції є постійний виконавець, тому люди витрачають час на рішення, а не на обслуговування процесу.",
    outcomesTitle: "Що це змінює для вас",
    outcomes: [
      "Регресії виявляються раніше, ніж їх побачать ваші користувачі.",
      "Опис системи залишається актуальним, бо від нього залежить поставка.",
      "Нова людина входить у проєкт через документацію, а не через чиюсь пам’ять.",
      "Виправлення не чекає, поки звільниться розробник.",
    ],
    exampleTitle: "Як виглядає сценарій",
    exampleLabels: {
      goal: "Мета",
      why: "Чому це важливо",
      steps: "Кроки",
      rules: "Правила, які мусять справджуватися",
    },
    example: {
      goal: "Клієнт додає платну опцію до активної підписки й бачить нову ціну ще до підтвердження.",
      why: "Хибна ціна на підтвердженні руйнує довіру до білінгу та створює навантаження на підтримку.",
      steps: [
        "Відкрити сторінку підписки — видно поточний тариф і ціну.",
        "Додати платну опцію — перерахована ціна з’являється до підтвердження.",
        "Підтвердити — нова опція та ціна відображаються в підписці.",
      ],
      rules: [
        "Ціна, показана до підтвердження, дорівнює сумі списання.",
        "Ту саму опцію не можна додати двічі.",
      ],
    },
    ctaTitle: "Хочете такого рівня контролю на своєму проєкті?",
    ctaBody:
      "Подивимося на вашу систему й визначимо, які флоу описати та перевіряти першими.",
    metaTitle: "Система поставки",
    metaDescription:
      "Флоу описані як документація, виконуються як сценарії та перевіряються за дизайном і поведінкою до того, як регресію побачать ваші користувачі.",
  },
} as const;

export type DeliveryCopy = (typeof deliveryCopy)[Locale];
