# AGENTS.md

## Cursor Cloud specific instructions

### Product

Single **Case Study API** (Express + Mongoose): `POST /api/case-study` filters records in MongoDB by date range and sum of `counts`. See `README.md` for request/response shape.

### Services

| Service | Required for | Default |
|---------|----------------|---------|
| Node.js API | Dev / manual E2E | `PORT=3000` |
| MongoDB | Live API (not `npm test`) | `mongodb://127.0.0.1:27017` |

`npm test` mocks the DB layer; no MongoDB process needed for tests.

### MongoDB (manual start)

This VM has no systemd. MongoDB is **not** started by the update script. If `mongod` is not running:

```bash
mkdir -p ~/mongodb-data
mongod --dbpath ~/mongodb-data --bind_ip 127.0.0.1 --port 27017
```

Use a user-writable `--dbpath` (e.g. `~/mongodb-data`). `/var/lib/mongodb` is owned by the `mongodb` user and will fail with permission errors if started as a normal user.

Copy `.env.example` to `.env` and set `MONGO_CONNECTION_URI` and `DB_NAME` (e.g. `case_study`). The API connects on boot via `MongoProvider.init()` in `index.js`.

### Commands (from repo root)

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Lint | `npm run lint` |
| Test | `npm test` |
| Dev server | `npm run dev` |
| Production | `npm start` |

### Hello-world check

With MongoDB running, API up, and sample data in the `records` collection:

```bash
curl --location --request POST 'http://localhost:3000/api/case-study' \
  --header 'Content-Type: application/json' \
  --data-raw '{"startDate":"2015-05-10","endDate":"2015-05-18","minCount":20,"maxCount":80}'
```

Expect `code: 0` and a `records` array when matching documents exist.
