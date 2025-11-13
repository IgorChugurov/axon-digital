# Keys Admin UI

Environment variables:

- `VITE_ADMIN_TOKEN` — admin token to send in `X-Admin-Token`
- `VITE_BACKEND_URL` — backend base URL, e.g. `http://localhost:3001`

Run:

```
npm i
npm run dev --workspace=keysUI
```

Production (pm2 serve):

```
cd keysUI
export VITE_BACKEND_URL=http://localhost:3001
export VITE_ADMIN_TOKEN=<ADMIN_TOKEN>
npm i
npm run build
pm2 serve dist 5175 --name keysui --spa
pm2 save
```
