## Нагрузочный тест PDF-сервиса

Этот документ описывает запуск и параметры нагрузочного теста, а также интерпретацию результатов.

### Термины

- N_CONCURRENCY: число параллельных клиентов в тестовом скрипте (сколько воркеров одновременно выполняют submit → poll → download).
- CONCURRENCY (бэкенд): сколько PDF одновременно рендерятся внутри сервиса.
- RATE_LIMIT_QPM: лимит запросов в минуту на API-ключ (rate limit на уровне middleware).
- MAX_QUEUE: максимально допустимая длина очереди задач.
- SUBMIT_MAX_RETRIES: число повторов сабмита при ответах 429/503.

### Подготовка бэкенда

Рекомендуемые флаги для теста:

```
TEST_FIXED_CONTENT=true                 # подставить фиксированный HTML/CSS
TEST_ARTIFICIAL_DELAY_MS=2000           # искусственная задержка рендера (2s)
API_KEYS=dev_local_key                  # список валидных ключей
AUTH_DISABLED=true                      # отключить проверку x-api-key для локального теста
ACCESS_LOG_DISABLED=true                # не писать лог доступа во время теста
RATE_LIMIT_QPM=10000                    # убрать влияние rate limit на тест
CONCURRENCY=2                           # степень параллелизма рендера
MAX_QUEUE=200                           # глубина очереди задач
```

Запуск:

```
cd backend
npm i
TEST_FIXED_CONTENT=true TEST_ARTIFICIAL_DELAY_MS=2000 API_KEYS=dev_local_key RATE_LIMIT_QPM=10000 AUTH_DISABLED=true ACCESS_LOG_DISABLED=true npm run dev
```

Проверка:

```
curl http://localhost:3001/health
```

### Запуск нагрузочного скрипта

Параметры окружения (значения по умолчанию в скрипте):

- N_REQUESTS: количество задач (по умолчанию 200)
- N_CONCURRENCY: число параллельных воркеров (по умолчанию = 4×CPU)
- BASE_URL: адрес сервиса (по умолчанию http://localhost:3001)
- API_KEY: API-ключ (по умолчанию dev_local_key)
- STATUS_INTERVAL_MS: интервал опроса статуса (по умолчанию 300)
- STATUS_TIMEOUT_MS: таймаут ожидания готовности (по умолчанию 60000)
- SUBMIT_MAX_RETRIES: число повторов сабмита при 429/503 (по умолчанию 30)

Примеры:

```
N_REQUESTS=50 N_CONCURRENCY=10 API_KEY=dev_local_key BASE_URL=http://localhost:3001 npm run -s stress

N_REQUESTS=300 N_CONCURRENCY=50 API_KEY=dev_local_key BASE_URL=http://localhost:3001 SUBMIT_MAX_RETRIES=200 npm run -s stress
```

### Отчёт

Скрипт печатает:

- submitted / submitFailed — успешно отправленные и провалившиеся сабмиты
- completed / errored / timedOut — итоги обработки задач
- downloaded / downloadFailed — итоги скачиваний PDF
- Duration / Submit RPS — общее время и скорость сабмита

### Типичные ситуации и настройка

- Много 429 (rate limit): увеличить RATE_LIMIT_QPM на бэкенде либо уменьшить N_CONCURRENCY; оставить SUBMIT_MAX_RETRIES > 0.
- Много 503 (busy/queue): уменьшить N_CONCURRENCY или увеличить MAX_QUEUE/CONCURRENCY на бэкенде.
- Долгие ожидания статуса: увеличить STATUS_TIMEOUT_MS.

### Безопасность API ключа

Клиентский сценарий (браузер) отправляет заголовок x-api-key. Любой, кто может открыть приложение и сеть браузера, увидит этот заголовок. Рекомендуется держать API-ключ на стороне вашего бэкенда-прокси и выдавать фронтенду краткоживущие токены/сессионные ключи или проксировать запросы.
