# API Keys — управление

Хранение: JSON — источник истины; Redis — обязательное зеркало

## Переменные

- `REDIS_URL=redis://127.0.0.1:6379` (обязательно)
  Путь файла ключей захардкожен: `./storage/pdf/api-keys.json`
- `API_KEYS` — fallback (сырые ключи, через запятую)
- `AUTH_DISABLED` — если `true`, отключает проверку `x-api-key` (для локальных тестов/stress)

## Формат JSON

```json
[
  {
    "keyHash": "<sha256-hex>",
    "last4": "ABCD",
    "owner": "Team A",
    "createdAt": "2025-08-11T10:00:00.000Z",
    "expiresAt": "2025-11-09T10:00:00.000Z",
    "disabled": false
  }
]
```

## Команды

- Генерация ключа:

```
npm run -s keygen -- --owner "Team A" --days 90 --redis $REDIS_URL --json ./storage/pdf/api-keys.json
```

- Бессрочный ключ:

```
npm run -s keygen -- --owner "Partner" --no-expiry --json ./storage/pdf/api-keys.json
```

Примеры получения секретного ключа (stdout) и копирования:

```
# из корня репозитория (без Redis):
npx --yes tsx backend/tools/keygen.ts --owner "Partner" --no-expiry --json backend/storage/pdf/api-keys.json | tee /tmp/partner-key.json
node -e 'console.log(JSON.parse(require("fs").readFileSync("/tmp/partner-key.json","utf8")).key)'
node -e 'console.log(JSON.parse(require("fs").readFileSync("/tmp/partner-key.json","utf8")).key)' | pbcopy

# с Redis:
export REDIS_URL=redis://127.0.0.1:6379
npx --yes tsx backend/tools/keygen.ts --owner "Partner" --no-expiry --redis "$REDIS_URL" --json backend/storage/pdf/api-keys.json | tee /tmp/partner-key.json
node -e 'console.log(JSON.parse(require("fs").readFileSync("/tmp/partner-key.json","utf8")).key)'
```

Выводит JSON с полями `{ owner, key, last4, expiresAt }`. Секрет ключа показывается один раз.

- Список ключей:

```
npm run -s keylist -- --redis $REDIS_URL
# или
npm run -s keylist -- --json ./storage/pdf/api-keys.json
```

- Отзыв ключа:

```
npm run -s keyrevoke -- --key <PASTE_SECRET> --redis $REDIS_URL --json ./storage/pdf/api-keys.json
# или по хэшу
npm run -s keyrevoke -- --keyHash <sha256-hex> --redis $REDIS_URL --json ./storage/pdf/api-keys.json
```

## Синхронизация и проверка в рантайме

При старте сервис синхронизирует Redis из файла (файл — источник истины). Мидлварь `auth` валидирует через Redis (с коротким кэшом 3s). Изменения, внесённые через админ API/CLI, пишутся и в файл, и в Redis.

Для локальных тестов можно временно отключить авторизацию:

```
export AUTH_DISABLED=true
npm --prefix backend run dev
```

В этом режиме `x-api-key` игнорируется, и запросы проходят как тестовые (в логи пишется `****last4` как обычно, а ключ в `req` будет `test-bypass`).

## Безопасность

- В Redis/JSON хранится только `keyHash` и метаданные. Секрет не хранится.
- В логах печатается только `****last4`.
- Не выдавайте постоянные ключи во фронтенд; проксируйте запросы.

## Замечания по Redis

- `REDIS_URL` можно задать через .env или `export REDIS_URL=redis://127.0.0.1:6379`.
- Для локального стенда удобно запустить Redis в Docker:

```
docker run -d --name pdf-redis -p 6379:6379 redis:7-alpine
export REDIS_URL=redis://127.0.0.1:6379
```
