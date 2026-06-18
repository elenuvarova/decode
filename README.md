# Full-Stack Template

A minimal React + Express + Sequelize starter that deploys for free on Render. It uses SQLite locally (no database to install) and switches automatically to Render's managed Postgres in production — the same codebase, no code changes needed.

## Stack

- **Frontend:** React 18 + Vite 5 (JavaScript)
- **Backend:** Node.js + Express, ES modules
- **Database:** Sequelize ORM — SQLite locally, PostgreSQL on Render (auto-detected from `DATABASE_URL`)
- **Deploy:** Render free tier (free web service + free Postgres), provisioned via `render.yaml` Blueprint

## Project structure

```
.
├── backend/
│   ├── package.json
│   ├── server.js
│   └── db.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── styles.css
├── Dockerfile
├── render.yaml
├── .env.example
└── .gitignore
```

## Local development

No database to install — SQLite is built in and created automatically on first run.

**Terminal 1 — backend:**

```bash
cd backend
npm install
npm run dev
```

**Terminal 2 — frontend:**

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The frontend proxies `/api` requests to the backend on port 3001.

## Deploy to Render

1. Push this repo to GitHub.
2. In Render: **New → Blueprint** → connect your repo.
3. Render reads `render.yaml` and provisions a free web service and a free Postgres database automatically. `DATABASE_URL` is wired in without any manual copy/paste.

**Free-tier notes:**
- The web service sleeps after ~15 minutes of inactivity; expect a ~30s cold start on the first request.
- Render's free Postgres databases expire after 30 days — export your data or upgrade before then.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/hello` | Returns a greeting message |
| GET | `/api/health` | Checks DB connectivity; returns `{ status, db }` |
| GET | `*` | Serves the React frontend (production only) |
