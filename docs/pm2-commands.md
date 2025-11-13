# Команды для работы с PM2 на удаленном сервере

## Подключение к серверу

```bash
ssh root@31.220.80.11
```

## Основные команды PM2

### Просмотр списка процессов

```bash
pm2 list
```

Показывает все запущенные процессы с их статусом (online, stopped, errored).

### Просмотр детальной информации о процессе

```bash
# Для pdf-service
pm2 describe pdf-service

# Для keysui
pm2 describe keysui
```

Показывает:
- Статус процесса
- PID
- Рабочую директорию
- Команду запуска
- Переменные окружения
- Использование памяти и CPU
- Время работы

### Просмотр логов в реальном времени

```bash
# Логи pdf-service
pm2 logs pdf-service

# Логи keysui
pm2 logs keysui

# Логи всех процессов
pm2 logs

# Последние N строк (без следования)
pm2 logs pdf-service --lines 100 --nostream

# Только ошибки
pm2 logs pdf-service --err

# Только стандартный вывод
pm2 logs pdf-service --out
```

### Просмотр логов из файлов

```bash
# Путь к логам PM2
cd ~/.pm2/logs

# Список файлов логов
ls -lah

# Просмотр логов pdf-service
tail -f ~/.pm2/logs/pdf-service-out.log    # стандартный вывод
tail -f ~/.pm2/logs/pdf-service-error.log  # ошибки

# Просмотр логов keysui
tail -f ~/.pm2/logs/keysui-out.log
tail -f ~/.pm2/logs/keysui-error.log

# Последние 100 строк
tail -n 100 ~/.pm2/logs/pdf-service-error.log
```

### Управление процессами

```bash
# Перезапуск процесса
pm2 restart pdf-service
pm2 restart keysui

# Перезагрузка (zero-downtime)
pm2 reload pdf-service

# Остановка
pm2 stop pdf-service

# Удаление из PM2
pm2 delete pdf-service

# Остановка всех процессов
pm2 stop all

# Перезапуск всех процессов
pm2 restart all
```

### Мониторинг

```bash
# Мониторинг в реальном времени (CPU, память)
pm2 monit

# Статус процессов
pm2 status

# Информация об использовании ресурсов
pm2 show pdf-service
```

### Сохранение конфигурации

```bash
# Сохранить текущую конфигурацию PM2
pm2 save

# Настроить автозапуск при перезагрузке сервера
pm2 startup
# (выполнить команду, которую покажет PM2)
```

## Полезные команды для диагностики

### Проверка, запущен ли процесс

```bash
# Проверить статус
pm2 list | grep pdf-service

# Проверить, слушает ли порт (для backend обычно 3001)
netstat -tulpn | grep 3001
# или
ss -tulpn | grep 3001

# Проверить процессы Node.js
ps aux | grep node
```

### Просмотр переменных окружения

```bash
# В PM2
pm2 env 0  # где 0 - это ID процесса из pm2 list

# Или через describe
pm2 describe pdf-service | grep -A 20 "env"
```

### Очистка логов

```bash
# Очистить все логи PM2
pm2 flush

# Очистить логи конкретного процесса
pm2 flush pdf-service
```

## Быстрые команды для диагностики проблем

```bash
# Полная диагностика pdf-service
echo "=== PM2 Status ===" && \
pm2 list && \
echo -e "\n=== Process Info ===" && \
pm2 describe pdf-service && \
echo -e "\n=== Last 50 lines of logs ===" && \
pm2 logs pdf-service --lines 50 --nostream && \
echo -e "\n=== Process tree ===" && \
ps auxf | grep pdf-service

# Проверка портов
echo "=== Listening ports ===" && \
netstat -tulpn | grep -E "(3001|5175)"

# Проверка использования ресурсов
echo "=== Resource usage ===" && \
pm2 monit --no-interaction
```

## Просмотр логов через journalctl (если PM2 настроен как systemd service)

```bash
# Если PM2 запущен как systemd service
journalctl -u pm2-root -f

# Или для конкретного процесса
journalctl -u pm2-pdf-service -f
```

## Экспорт логов для анализа

```bash
# Сохранить логи в файл
pm2 logs pdf-service --lines 1000 --nostream > /tmp/pdf-service-logs.txt

# Скачать файл на локальную машину (с другой сессии терминала)
scp root@31.220.80.11:/tmp/pdf-service-logs.txt ./
```

