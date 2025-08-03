# Система решений для ассистента

## Обзор

Система решений позволяет ассистенту автоматически подбирать и рекомендовать подходящие бизнес-решения клиентам на основе их потребностей. Система включает:

- **Загрузчик решений** - автоматически загружает описания решений из JSON файлов
- **Поисковая система** - находит релевантные решения по ключевым словам
- **Функции ассистента** - позволяют ассистенту работать с решениями
- **Сравнение решений** - помогает клиентам выбрать оптимальный вариант

## Структура файлов

```
src/
├── content/
│   └── solutions/           # JSON файлы с описаниями решений
│       ├── oblikflow-en.json
│       ├── oblikflow-ua.json
│       ├── tvorflow-platform.json
│       └── education-platform.json
├── utils/
│   ├── solutions/
│   │   └── solutionsLoader.ts    # Загрузчик и индексация решений
│   └── assistant/
│       ├── solutionsFunctions.ts # Функции для работы с решениями
│       ├── solutionsToolCallHandler.ts # Обработчик вызовов функций
│       └── functions/            # JSON схемы функций
│           ├── searchSolutions.json
│           ├── getSolutionDetails.json
│           ├── compareSolutions.json
│           ├── getRecommendations.json
│           └── analyzeBusinessCase.json
└── scripts/
    └── updateAssistantFunctions.mjs # Скрипт обновления функций ассистента
```

## Добавление нового решения

### 1. Создание JSON файла

Создайте новый файл в `src/content/solutions/` с именем `solution-name.json`:

```json
{
  "id": "solution-name",
  "slug": "solution-name",
  "language": "en",
  "title": "Solution Title",
  "shortDescription": "Brief description",
  "description": "Detailed description",
  "url": "/solutions/solution-name",
  "image": "/solution-image.png",
  "category": "Category Name",
  "tags": ["tag1", "tag2"],
  "targetAudience": ["audience1", "audience2"],
  "businessChallenges": ["challenge1", "challenge2"],
  "features": ["feature1", "feature2"],
  "architecture": ["arch1", "arch2"],
  "technology": ["tech1", "tech2"],
  "useCases": ["usecase1", "usecase2"],
  "benefits": ["benefit1", "benefit2"],
  "implementationTimeline": {
    "customDevelopment": "timeline description"
  },
  "pricing": {
    "type": "pricing type",
    "model": "pricing model",
    "note": "pricing note"
  },
  "competitors": ["competitor1", "competitor2"],
  "differentiators": ["diff1", "diff2"],
  "successMetrics": ["metric1", "metric2"],
  "integrationCapabilities": ["integration1", "integration2"],
  "securityFeatures": ["security1", "security2"],
  "support": ["support1", "support2"]
}
```

### 2. Обновление системного промпта

Добавьте информацию о новом решении в `prompts/sections/20_business_solutions.txt`:

```bash
npm run update:prompt
```

### 3. Обновление функций ассистента

Обновите функции ассистента:

```bash
npm run update:functions
```

## Доступные функции ассистента

### searchSolutions(query, language?)

Поиск решений по ключевым словам.

**Параметры:**

- `query` (string) - поисковый запрос
- `language` (string, опционально) - язык (en, ua)

**Пример:**

```javascript
searchSolutions("accounting automation", "en");
```

### getSolutionDetails(solutionId)

Получение детальной информации о решении.

**Параметры:**

- `solutionId` (string) - ID решения

**Пример:**

```javascript
getSolutionDetails("oblikflow-en");
```

### compareSolutions(solution1Id, solution2Id)

Сравнение двух решений.

**Параметры:**

- `solution1Id` (string) - ID первого решения
- `solution2Id` (string) - ID второго решения

**Пример:**

```javascript
compareSolutions("oblikflow-en", "tvorflow-platform");
```

### getRecommendations(businessNeeds, industry?, companySize?, language?)

Получение персонализированных рекомендаций.

**Параметры:**

- `businessNeeds` (array) - массив бизнес-потребностей
- `industry` (string, опционально) - отрасль
- `companySize` (string, опционально) - размер компании
- `language` (string, опционально) - язык

**Пример:**

```javascript
getRecommendations(["automation", "accounting"], "finance", "medium", "en");
```

### analyzeBusinessCase(businessChallenge, industry?, companySize?, language?)

Анализ бизнес-кейса и поиск подходящих решений.

**Параметры:**

- `businessChallenge` (string) - описание бизнес-вызова
- `industry` (string, опционально) - отрасль
- `companySize` (string, опционально) - размер компании
- `language` (string, опционально) - язык

**Пример:**

```javascript
analyzeBusinessCase(
  "Need to automate document processing",
  "accounting",
  "large",
  "en"
);
```

## Workflow для ассистента

### 1. Поиск решений

Когда клиент описывает свою потребность, используйте `searchSolutions()`:

```
Клиент: "Мне нужно автоматизировать бухгалтерию"
Ассистент: Использует searchSolutions("accounting automation", "ua")
```

### 2. Детальная информация

Если клиент хочет узнать больше о решении:

```
Клиент: "Расскажите подробнее об OblikFlow"
Ассистент: Использует getSolutionDetails("oblikflow-ua")
```

### 3. Сравнение решений

Если клиент рассматривает несколько вариантов:

```
Клиент: "Как OblikFlow сравнивается с TvorFlow?"
Ассистент: Использует compareSolutions("oblikflow-ua", "tvorflow-platform")
```

### 4. Персонализированные рекомендации

Когда собрано достаточно информации о клиенте:

```
Ассистент: Использует getRecommendations(["accounting", "automation"], "finance", "medium", "ua")
```

### 5. Анализ бизнес-кейса

Для комплексного анализа:

```
Ассистент: Использует analyzeBusinessCase("Automate accounting for 50+ clients", "accounting", "medium", "ua")
```

## Доступные решения

### OblikFlow (oblikflow-en, oblikflow-ua)

- **Категория:** Accounting & Tax Management
- **Описание:** Платформа для автоматизации бухгалтерского учета
- **Целевая аудитория:** Бухгалтерские фирмы, финансовые консультанты

### TvorFlow Platform (tvorflow-platform)

- **Категория:** No-Code Development Platform
- **Описание:** Платформа для быстрой разработки приложений
- **Целевая аудитория:** Стартапы, предприятия, агентства

### Education Platform (education-platform)

- **Категория:** Education & EdTech
- **Описание:** Платформы для онлайн-обучения
- **Целевая аудитория:** Школы, университеты, корпоративные тренеры

## Обновление системы

### Обновление системного промпта

```bash
npm run update:prompt
```

### Обновление функций ассистента

```bash
npm run update:functions
```

### Перезапуск сервера

```bash
npm run dev
```

## Отладка

### Проверка загрузки решений

```javascript
import { solutionsLoader } from "@/utils/solutions/solutionsLoader";

// Получить все решения
const allSolutions = solutionsLoader.getAllSolutions();
console.log("Loaded solutions:", allSolutions.length);

// Поиск решений
const searchResults = solutionsLoader.searchSolutions("accounting");
console.log("Search results:", searchResults);
```

### Проверка функций

```javascript
import { findRelevantSolutions } from "@/utils/assistant/solutionsFunctions";

const result = findRelevantSolutions("accounting automation", "en");
console.log("Function result:", result);
```

## Лучшие практики

1. **Всегда предоставляйте ссылку на детальную страницу** решения
2. **Используйте язык клиента** при поиске решений
3. **Собирайте достаточно информации** перед дачей рекомендаций
4. **Объясняйте различия** между решениями
5. **Предлагайте альтернативы** если основное решение не подходит

## Расширение системы

### Добавление новых полей в решение

1. Обновите интерфейс `Solution` в `solutionsLoader.ts`
2. Добавьте новые поля в JSON файлы решений
3. Обновите функции поиска и сравнения

### Добавление новых функций

1. Создайте JSON схему в `functions/`
2. Добавьте функцию в `solutionsFunctions.ts`
3. Обновите обработчик в `solutionsToolCallHandler.ts`
4. Обновите системный промпт
5. Запустите `updateAssistantFunctions.mjs`
