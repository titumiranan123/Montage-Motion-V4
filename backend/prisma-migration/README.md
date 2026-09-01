# Prisma Migration — Introspection Workspace (RUNBOOK)

Isolated workspace to introspect the **live** montagemotion Postgres DB into a
`schema.prisma`, verify it against the discovery report, and read-test the
Prisma client. **Your original `backend/src/` is not touched.** No service files
are modified here — that's the next phase.

> ⚠️ **Why you run these commands, not me:** the environment I'm running in has
> no outbound network — the npm registry is policy-blocked (HTTP 403) and the DB
> host `88.222.245.20:5436` is unreachable through the sandbox proxy. So
> `npm install`, `prisma db pull`, `prisma generate`, and the live read-test must
> run on **your machine** (or any host that can reach the DB). Everything is
> pre-wired so it's just a few commands.

---

## Hard rules (do not violate)

- ✅ Only `prisma db pull` (introspection) — reads existing DB, changes nothing.
- ❌ **Never** run `prisma migrate ...` — it would create/apply new migrations against production. There is deliberately **no `migrate` script**.
- ✅ Keep existing column names exactly as in the DB (no renames).
- ✅ Live DB is the source of truth (not the stale `.sql` files).

---

## Step 0 — Port verification (DONE ✓)

Resolved by config, no connection needed:

| Source | Port |
|---|---|
| `backend/src/db/db.ts` (line 18, hardcoded) | **5436** |
| `backend/.env` active `DB_PORT` | **5436** |
| commented-out old block (`# DB_PORT=5432`, `host: landing_page_db`) | 5432 — **dead/legacy Docker config, ignore** |

**Conclusion: `5436` is correct. There is NO mismatch in the active config.**
The earlier report's "mismatch" flag was a false alarm from only seeing key
names; with values visible, the pool port (5436) and `.env` `DB_PORT` (5436)
agree. Host = `88.222.245.20`, DB = `montagedb2026`, user = `montdev2026`.

---

## Step 1 — Install (run locally)

```bash
cd backend/prisma-migration
npm install
```

Installs `prisma`, `@prisma/client`, `ts-node`, `typescript`, `@types/node`.

> `prisma init` is effectively already done: `prisma/schema.prisma` (datasource +
> generator) and `.env` (DATABASE_URL) are pre-created. No need to run it. If you
> prefer to run `npx prisma init` yourself, do it in an empty dir — it won't
> overwrite these.

## Step 2 — DATABASE_URL (DONE ✓ — in `.env`)

```
DATABASE_URL="postgresql://montdev2026:Montage2026@88.222.245.20:5436/montagedb2026?schema=public"
```
Built from the active `DB_*` values. Password has no URL-reserved chars, so no
percent-encoding was needed. If you ever rotate the password to include
`@ : / ? # [ ] %`, percent-encode it.

## Step 3 — Introspect (run locally)

```bash
npx prisma db pull
```
Populates `prisma/schema.prisma` with ~40 models from the live DB — tables,
columns, types, PK/FK relations, all auto-detected. Optionally tidy formatting:
```bash
npx prisma format
```

## Step 4 — Verify against the discovery report (run locally)

```bash
node verify-schema.js
```
Static analysis of `schema.prisma`. Checks and prints:
- all 40 expected tables present (+ flags missing/extra)
- camelCase exception columns kept as-is (`blogs.updatedAt`, `blogs.whatWillLearn`, `contacts.interestIn`, `processes.isHiden`, `process_steps.isHiden`)
- `@map` / `@@map` counts
- UUID `id` with a generated default on every model
- `Json` and `String[]` column counts (vs expected JSONB / TEXT[] columns)
- `@relation` (foreign-key) count + the expected parent→child chains

Review any `✗` or `⚠` lines. See "What to expect" below.

## Step 5 — Generate client + READ-ONLY test (run locally)

```bash
npx prisma generate
npx ts-node test-connection.ts
```
`test-connection.ts` does **reads only** — a `SELECT COUNT` of public tables and
a `findMany({ take: 3 })` on the first available table. **No write/update/delete.**

---

## What to expect from introspection (so nothing surprises you)

- **Model names = table names verbatim** (snake_case kept), e.g. `model users`, `model case_studies`. Prisma adds `@@map("...")` automatically. Field names default to the exact column names (snake_case stays snake_case) — this satisfies "no renames." You can *optionally* camelCase field names later with field-level `@map("col_name")`, but it's **not required** for the client to work, and the migration rule says keep names as-is, so the safe default is to leave them.
- **camelCase exception columns** already camelCase in the DB will appear as camelCase fields with **no** `@map` — correct.
- **UUID PKs**: expect `id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid` on every model.
- **JSONB** → `Json`; **TEXT[]** → `String[]`; **NUMERIC(10,2)** (`packages.price`) → `Decimal @db.Decimal(10, 2)`; `TIMESTAMPTZ` → `DateTime @db.Timestamptz`.
- **Relations**: every `ON DELETE CASCADE` FK becomes a `@relation`. Expect the chains listed in the report. **`works` has no FK to `work_header`** (joined by `type` in code) — so **no relation there is correct, not a bug.**
- **Likely warnings from `db pull` (all expected, not blockers):**
  - The two `service_*` duplicate DDLs in the `.sql` files don't matter — introspection reflects whatever single real table exists in the live DB. Confirm the actual `service_item_sections.service_item_id` FK target (`home_services` vs `service_items`) matches what you see.
  - `working_process` `.sql` said `order_index NUMBER` — the live column is really `INTEGER`/`NUMERIC`; introspection shows the real type.
  - `seo_meta` — `.sql` had a MySQL-ism `ON UPDATE CURRENT_TIMESTAMP` and referenced `page_seo`; the live table is `seo_meta`. Introspection uses the live table.
  - Prisma may warn about tables **without a unique/primary key** (if any exist, e.g. some child tables) — it comments them out. If a table you need is missing from the models, that's the cause: check the `///` comments at the top of `schema.prisma`.

---

## Files in this folder

| File | Purpose |
|---|---|
| `prisma/schema.prisma` | datasource + generator; `db pull` fills in models |
| `.env` | `DATABASE_URL` (git-ignored) |
| `package.json` | deps + scripts (`db:pull`, `generate`, `test:read`) — **no migrate** |
| `tsconfig.json` | for the TS test script |
| `verify-schema.js` | auto-checks schema vs discovery report |
| `test-connection.ts` | READ-ONLY client test |
| `.gitignore` | ignores `.env` + `node_modules` |

Once verification is clean, the next phase (rewriting service files to use Prisma,
one module at a time) can begin — nothing in `backend/src/` has been changed yet.
