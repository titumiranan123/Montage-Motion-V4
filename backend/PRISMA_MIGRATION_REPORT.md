# Prisma Migration — Project Report

> Backend project analysis for planning a migration from **raw `pg` + SQL** to **Prisma ORM**.
> Goal: keep routes / controllers / business logic unchanged; replace **only the DB layer** (service files).
> Prepared so this report can be handed to another AI to build the actual migration plan.

---

## 0. TL;DR (Migration-critical facts)

| Fact | Value |
|---|---|
| Language / runtime | TypeScript + Node.js (CommonJS) |
| Web framework | Express 4 |
| Current DB access | `pg` (node-postgres) `Pool`, raw SQL |
| Query style | **Parameterized (`$1, $2 …`)** everywhere — ~701 placeholders. Safe, no string interpolation of user input |
| DB | PostgreSQL |
| Tables (from `.sql` files) | **~40 tables** across 20 schema files |
| PK convention | `UUID DEFAULT gen_random_uuid()` on every table |
| Column naming | **snake_case** in DB (a few exceptions: `updatedAt`, `whatWillLearn` in `blogs`) |
| Timestamps | mostly `created_at` / `updated_at` (`TIMESTAMP` or `TIMESTAMPTZ`) |
| Service files | 28 files doing raw SQL — **this is the only layer to rewrite** |
| Endpoints | ~132 across 28 route files |
| Migration tool today | **None** — `.sql` files are hand-written DDL references, never run by a tool |
| ORM today | **None** |
| Validation | Zod (per-module `*.zod.ts`) — unaffected by migration |

**Migration strategy implication:** Because every query is already parameterized and isolated inside `*.service*.ts` files, Prisma can be introduced by (a) generating a `schema.prisma` from the existing DB via `prisma db pull` (introspection), then (b) rewriting service functions one module at a time to use `PrismaClient`, leaving routes/controllers/Zod untouched. The aggregator service (`home.service.ts`) is the highest-risk file.

---

## 1. PROJECT STRUCTURE

### Root
```
backend/
├── .env                      # secrets (DB creds, JWT, R2, SMTP, Redis) — see §2
├── .gitignore
├── .husky/                   # git hooks (pre-commit → lint-staged)
├── README.md
├── backend.zip               # stray archive in repo (ignore)
├── eslint.config.mjs
├── logs/winston/{error,success}/   # Winston daily-rotate log output
├── package.json
├── package-lock.json
├── yarn.lock                 # NOTE: both npm & yarn lockfiles present
├── tsconfig.json
└── src/
```

### `src/` structure
```
src/
├── app.ts                    # ⭐ ENTRY POINT (Express app + bootstrap)
├── main.route.ts             # mounts all feature routers under /api
├── config/
│   └── index.ts              # reads process.env → exported config object
├── db/
│   └── db.ts                 # ⭐ pg Pool (the DB layer to replace)
├── logger/
│   └── logger.ts             # Winston logger + errorLogger
├── midleware/                # (sic — misspelled folder, kept as-is)
│   ├── asyncHandler.ts       # wraps async controllers, forwards errors
│   ├── authMidleware.ts      # JWT verify + role guard  →  auth(...roles)
│   ├── globalErrorHandler.ts # central error handler (ApiError + ZodError)
│   ├── invalideroute.ts      # 404 handler
│   ├── jwtHelper.ts          # jwt.verify wrapper
│   └── validate.ts           # validate(zodSchema) middleware
├── r2objectConfig/           # Cloudflare R2 (S3-compatible) file storage
│   ├── getUploadUrl.ts
│   ├── multerupload.ts       # multer memoryStorage, 500MB limit
│   └── r2.ts                 # S3Client + uploadToR2 / deleteFromR2ByUrl
├── utils/
│   ├── ApiError.ts           # custom error class (statusCode, code, message)
│   ├── checkUser.ts          # SELECT 1 FROM users WHERE email  (uses pg)
│   ├── errorCode.ts
│   ├── errorHelper.ts        # (empty)
│   ├── generateVerificationCode.ts
│   ├── requireRole.ts        # duplicate/older auth middleware (unused)
│   ├── responseHandler.ts    # standard JSON response shape
│   └── sendVerificationEmail.ts   # nodemailer (gmail)
└── app/                      # ⭐ feature modules (see §3)
    ├── auth/  blogs/  brand_images/  carrerpost/  case-study/
    ├── comparison/  contact/  faq/  header/  homeapis/  homeservice/
    ├── industry/  insight/  member/  ourstory/  pageservice/  pricing/
    ├── robots/  seo/  sitemap/  team_image/  testimonial/  upload/
    ├── video-upload/  website/  whychooseus/  work/  working_process/
```

### Feature-module pattern (very consistent)
Each folder under `src/app/<feature>/` typically contains:
- `*.route(s).ts` — Express `Router`
- `*.controller(s).ts` — **thin** controllers wrapped in `asyncHandler`
- `*.service(s).ts` — **raw SQL lives here** (the migration target)
- `*.zod.ts` — Zod validation schema
- `*.interface.ts` / `*.type.ts` — TS types
- `*.sql` / `db.sql` — hand-written DDL reference (not run by any tool)

### Entry point
**`src/app.ts`** is the entry point.
- Creates the Express app, configures CORS (allowlist: `*.montagemotion.com`, `localhost:3000/5000/5001`), `cookie-parser`, JSON/urlencoded/text body parsers (10 MB), a dev request logger, health routes (`GET /`, `GET /api/cors-test`), mounts `mainRoute`, then `invalidateRoute` (404) and `globalErrorHandler`.
- Bootstraps the server only when run directly: `if (require.main === module) { app.listen(config.port) }` — so `app` is exported (test-friendly). **There is no separate `server.ts` / `index.ts`.**
- Dev run command targets this file: `ts-node-dev … ./src/app.ts`.

---

## 2. DATABASE CONNECTION

### pg client setup — file: `src/db/db.ts`
```ts
import { Pool } from "pg";
import { errorLogger, logger } from "../logger/logger";
import config from "../config";

export const db = new Pool({
  host: config.db_hostname,
  port: 5436,                       // ⚠ HARDCODED — ignores config.db_port / env DB_PORT
  user: config.db_user,
  password: config.db_password,
  database: config.db_name,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

db.on("error", (err) => { errorLogger.error(err); reconnect(); });
// reconnect(): retries db.connect() after 5s
// SIGINT handler: await db.end()
```
- Exported singleton `db` (a `pg.Pool`) is imported directly by every service and by `utils/checkUser.ts`.
- Services use both `db.query(...)` (pool) and `db.connect()` → `client.query(...)` with `BEGIN/COMMIT/ROLLBACK` for transactions.

### pg library used
- **`pg` (node-postgres)** — `"pg": "^8.14.1"`, types `@types/pg`.
- No `pg-promise`, no `Sequelize`, no `TypeORM`, no `knex`, no `Prisma` currently.

### Config indirection — file: `src/config/index.ts`
```ts
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECREATE,   // (sic — misspelled env key)
  nodeEnv: process.env.NODE_ENV,
  r2accesskeyId: process.env.R2_ACCESS_KEY_ID,
  r2secretaccesskey: process.env.R2_SECRET_ACCESS_KEY,
  r2endpoint: process.env.R2_ENDPOINT,
  r2accountid: process.env.R2_ACCOUNT_ID,
  db_hostname: process.env.DB_HOST_NAME,
  db_port: process.env.DB_PORT,           // read but NOT used by db.ts
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  app_password: process.env.APP_PASS,
  app_gmail: process.env.APP_GMAIL,
};
```

### `.env` variable names (KEY NAMES ONLY — no values)
```
PORT
NODE_ENV
JWT_SECREATE                 # note misspelling; code reads this exact key
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_ENDPOINT
R2_ACCOUNT_ID
APP_PASS
APP_GMAIL
DB_USER
DB_PASSWORD
DB_NAME
DB_PORT
DB_HOST_NAME
REDIS_HOST
REDIS_PORT
REDIS_PASSWORD
```

**⚠ Prisma-relevant notes:**
- There is **no `DATABASE_URL`** today. Prisma requires a single connection URL — you'll need to add one, e.g.
  `DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST_NAME}:${DB_PORT}/${DB_NAME}"`.
- The live pool uses **port 5436** (hardcoded), while `.env`'s `DB_PORT` is a separate value — confirm which port Prisma should target (see §10).
- `REDIS_*` keys exist but `connect-redis` is a dependency **not wired into `app.ts`** (no active Redis usage found).
- ⚠ **Hardcoded secrets**: `src/r2objectConfig/r2.ts` contains R2 access key + secret literally in source (not migration-related, but flag for cleanup/rotation).

---

## 3. SERVICE / DB LAYER FILES (the migration target)

All raw SQL lives in these files. **Query style is parameterized (`$1, $2 …`) throughout** — the only dynamic SQL fragments are safe structural pieces (WHERE-clause builders in `case-study` and `insight`), and their values are still passed as parameter arrays. Counts below are approximate keyword occurrences (a single function may run several queries; some SELECT counts include subqueries / `json_agg`).

| # | Service file | Fns | SELECT | INSERT | UPDATE | DELETE | Notes |
|---|---|---:|---:|---:|---:|---:|---|
| 1 | `auth/auth.services.ts` | 7 | 5 | 3 | 5 | 3 | `createUser, verifyToken, login, allUsers, makeAdmin, logUserLogin, deleteUser`. Uses transactions; bcrypt; JWT. Touches `users`, `user_dynamic_data`, `user_login_history` |
| 2 | `blogs/blog.services.ts` | 6 | 5 | 1 | 4 | 1 | `createBlog, getAllBlogs, getBlogById, updateBlog, updateBlogPosition, deleteBlog` |
| 3 | `brand_images/brandimage.service.ts` | 6 | 3 | 1 | 3 | 1 | `createBrandImage, getAllBrandImage, getBrandImageById, updateBrandImage, deleteBrandImage, updateVideosPositions` |
| 4 | `carrerpost/carrer.service.ts` | 4 | 6 | 2 | 5 | 3 | `upsertCareerPage, getCareerPageByType, deleteCareerPage, deleteSingleJob`. Parent/child: `career_pages` + `job_posts` |
| 5 | `case-study/caseStudy.service.ts` | 8 | 4 | 1 | 2 | 1 | **function-style exports** (`export async function …`): `createCaseStudy, getCaseStudyById, getCaseStudyBySlug, listCaseStudies, updateCaseStudy, deleteCaseStudy, publishCaseStudy`. Dynamic WHERE + dynamic UPDATE field builder (values still parameterized) |
| 6 | `comparison/comparison.services.ts` | 4 | 4 | 4 | 6 | 2 | `createComparison, updateComparison, getComparisons, deleteComparison`. 3 related tables |
| 7 | `contact/contact.services.ts` | 3 | 2 | 1 | 0 | 1 | `createContact, getAllContact, deleteContactById` |
| 8 | `faq/faq.services.ts` | 4 | 2 | 1 | 3 | 2 | `createFaqSection, updateFaqSection, getFaqSections, deleteFaqSection` |
| 9 | `faq/faqitem.service.ts` | 4 | 1 | 1 | 2 | 1 | `createFaqItem, updateFaqItem, deleteFaqItem, getFaqItemsBySectionId` |
| 10 | `header/header.services.ts` | 3 | 2 | 2 | 3 | 2 | `addOrUpdateHeader, getAllHeaders, deleteHeader`. `page_headers` + `header_media` |
| 11 | `homeapis/home.service.ts` | 6 | 9 | 0 | 0 | 0 | ⭐ **AGGREGATOR (highest risk).** `advertsingService, servicesData, aboutService, carrerService, getAllHomeBlogs, getSingleBlogs`. Calls many other services + raw joins with `json_agg`/`json_build_object`; dynamic section inclusion via `?table=` list |
| 12 | `homeservice/homeservice.service.ts` | 5 | 10 | 0 | 1 | 2 | `createOrUpdateSection, getAllSections, getAllSectionsType, getAllTypepageSection, deleteSection`. Uses `service_sections`, `home_services`, `service_item_sections` |
| 13 | `industry/industry.services.ts` | 4 | 5 | 5 | 5 | 2 | `createSection, updateSection, getSections, deleteSection`. 3 related tables |
| 14 | `insight/insight.services.ts` | 4 | 0* | 3 | 1 | 2 | **function-style**: `createSectionWithSteps, getSectionByPage, updateSectionById, deleteSectionById` (*SELECTs via `RETURNING`/joins not keyword-counted). `insight_section` + `steps` (JSONB) |
| 15 | `member/member.service.ts` | 6 | 5 | 1 | 2 | 1 | `createMember, getAllMembers, getMembersById, updateMember, deleteMember, updateMemberPosition` |
| 16 | `ourstory/ourstory.service.ts` | 5 | 5 | 3 | 3 | 3 | `upsertStory, getAllStories, getStoryById, updateStory, deleteStory`. `ourstory` + `ourstory_steps` |
| 17 | `pageservice/page_service.service.ts` | 3 | 6 | 0 | 2 | 2 | `createOrUpdateSection, getAllSections, deleteSection`. `service_sections`, `service_items`, `service_item_sections` |
| 18 | `pricing/pricing.service.ts` | 4 | 7 | 3 | 5 | 4 | `upsertPagePricePlan, getPagePricePlanByType, deletePagePricePlan, deleteSinglePackage`. 3 related tables (`page_price_plans`→`packages`→`package_features`) |
| 19 | `robots/robots.service.ts` | 2 | 1 | 1 | 0 | 1 | `createRobot, getRobot`. `site_robots` |
| 20 | `seo/seo.service.ts` | 5 | 5 | 1 | 1 | 1 | `upsertSeoMeta, getSchema, getSeoMetaByPage, getAllSeoMeta, deleteSeoMetaByPage`. `seo_meta` |
| 21 | `sitemap/sitemap.service.ts` | 3 | 3 | 1 | 0 | 1 | `createSitemap, getSitemap, getSitemapforAdmin`. `site_sitemap` |
| 22 | `team_image/teamimage.service.ts` | 6 | 3 | 1 | 3 | 1 | `createBrandImage, getAllBrandImage, getBrandImageById, updateBrandImage, deleteBrandImage, updateImagePositions`. `team_images` |
| 23 | `testimonial/testimonial.services.ts` | 6 | 3 | 1 | 3 | 1 | `addTestimonial, getAllTestimonial, getTestimonialById, updateTestimonialPositions, updateTestimonial, deleteTestimonialById` |
| 24 | `video-upload/video.services.ts` | 0 | 0 | 0 | 0 | 0 | No DB access (empty/stub — upload only) |
| 25 | `website/web.service.ts` | 0 | 3 | 0 | 0 | 0 | Dashboard overview — 3 `SELECT COUNT`-style aggregations (not `async`-method style) |
| 26 | `whychooseus/whychooseus.service.ts` | 5 | 6 | 4 | 2 | 4 | `createOrUpdateSection, getAllSections, getSectionById, updateSection, deleteSection`. `whychooseus_sections` + `whychooseus_items` |
| 27 | `work/workservice.ts` | 10 | 9 | 2 | 8 | 1 | `addVideo, addHeader, getAllVideos, getAllVideosForSite, getAllVideosforWebsite, getAllVideosForServicespage, getVideosById, updateVideo, deleteVideo, updateVideosPositions`. `work_header` + `works` |
| 28 | `working_process/process.service.ts` | 5 | 6 | 4 | 4 | 3 | `createProcess, getAllProcesses, getProcessById, updateProcess, deleteProcess`. `processes` + `process_steps` |

**Two export conventions coexist** (relevant for how you rewrite them):
- Most files: a single exported object literal, e.g. `export const authService = { async createUser() {…}, … }`.
- `case-study/` and `insight/` use standalone `export async function …`.

**Transaction pattern:** many services use `const client = await db.connect(); client.query("BEGIN") … "COMMIT"/"ROLLBACK"; client.release()`. In Prisma these map to `prisma.$transaction([...])` or interactive `prisma.$transaction(async (tx) => {…})`.

**Special SQL to watch when porting to Prisma:**
- `json_agg` / `json_build_object` aggregation (esp. `home.service.ts`, `header`) → Prisma nested `include` / `select`, or keep as `$queryRaw`.
- JSONB columns (`case_studies`, `job_posts.salary`, `insight/steps.items`, `case_studies.hero_stats/metrics/…`) → Prisma `Json` type.
- Array columns (`blogs.whatWillLearn`, `blogs.keywords`, `case_studies.tag_slugs`, `client_tags`) → Prisma `String[]`.
- Dynamic WHERE/UPDATE builders (`case-study`, partial-update patterns) → Prisma's object-based `where`/`data` handle these natively.
- `ON CONFLICT` / upsert semantics (`upsert*` functions) → Prisma `upsert()`.

---

## 4. DATABASE SCHEMA (from `.sql` DDL files + code)

**Conventions across the DB:**
- Every table PK: `id UUID PRIMARY KEY DEFAULT gen_random_uuid()` (needs `pgcrypto`; `header/db.sql` creates the extension).
- Timestamps: **snake_case** `created_at` / `updated_at`, type `TIMESTAMP` or `TIMESTAMPTZ`/`TIMESTAMP WITH TIME ZONE` (mixed across tables).
- Column naming: **snake_case** in DB, with a few camelCase exceptions in `blogs` (`updatedAt`, `whatWillLearn`) and `contacts` (`interestIn`), and `processes.isHiden` / `process_steps.isHiden`.
- FKs consistently use `ON DELETE CASCADE`.

> ⚠ Two schema oddities Prisma introspection will surface (decide before `db pull`):
> - `service_sections` + `service_item_sections` are **defined twice** (in `homeservice/service.sql` and `pageservice/service.sql`) with a differing child FK target (`home_services` vs `service_items`). Only one real table exists per name in the DB — confirm the actual live shape.
> - `site_robots` / `site_sitemap` DDL is duplicated in both `robots/sitemap.sql` and `sitemap/sitemap.sql`.
> - `seo/seo.sql` uses `ON UPDATE CURRENT_TIMESTAMP` (MySQL-ism, not valid Postgres) and references a `page_seo` table in an `ALTER` — likely stale; the code uses `seo_meta`.
> - `working_process/proccess.sql` declares `order_index NUMBER` (`NUMBER` isn't a Postgres type — likely `INTEGER` in the live DB).

### Tables and key columns

**Auth (3 tables, related)**
- `users`(id, name, email UNIQUE, password, role default `'user'`, verified bool, created_at, updated_at)
- `user_login_history`(id, **user_id → users.id CASCADE**, device, browser, ip_address, login_time, location, is_successful)
- `user_dynamic_data`(id, **user_id → users.id CASCADE**, reset_password_token, reset_password_expire_at, verification_token, verification_token_expires_at, updated_at)

**blogs**(id, title, slug UNIQUE, short_description, description, image, alt, is_publish, is_feature, position, read_time, `updatedAt` TEXT, `whatWillLearn` TEXT[], meta_title, meta_description, keywords TEXT[], created_at, updated_at)

**brandimage**(id, image, alt, width, height, ishide bool, type, created_at, updated_at)

**Career (2 tables, related)**
- `career_pages`(id, type UNIQUE, tag, heading_part1, heading_part2, paragraph, created_at, updated_at)
- `job_posts`(id, **career_page_id → career_pages.id CASCADE**, job_title, positions_available, deadline, description, employment_type, work_arrangement, `salary` JSONB, applylink, created_at, updated_at)

**case_studies**(id, slug UNIQUE, type, status default `'draft'`, title, description, image_url, image_alt, client_name, client_logo, client_industry, client_domain, client_employees INT, client_desc, challenge_intro, solution_intro, outcome_desc, outcome_video, meta_title, meta_desc, meta_keywords, calendly_url, `tag_slugs` TEXT[], `client_tags` TEXT[], `hero_stats` JSONB, `metrics` JSONB, `challenge_items` JSONB, `solution_phases` JSONB, `testimonials` JSONB, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)

**Comparison (3 tables, related)**
- `comparisons`(id, page UNIQUE, tag, heading_title, paragraph)
- `comparison_columns`(id, **section_id → comparisons.id CASCADE**, type CHECK in ('montage','agencies','freelancers'), title, image, bonus_title, created_at, updated_at)
- `comparison_entries`(id, **column_id → comparison_columns.id CASCADE**, entry_type CHECK in ('item','bonus'), text, position, UNIQUE(column_id, entry_type, position))

**contacts**(id, name, email, message, `interestIn`, created_at TZ, updated_at TZ)

**FAQ (2 tables, related)**
- `faq_sections`(id, type UNIQUE, section_tag, section_title, section_description, contact_image, contact_alt, contact_heading, contact_description, contact_name, contact_position, contact_link, is_active, created_at, updated_at)
- `faq_items`(id, **faq_section_id → faq_sections.id CASCADE**, question, answer, sort_order, is_visible, created_at, updated_at)

**Header (2 tables, related)**
- `page_headers`(id, type UNIQUE, page_subtitle, page_title, description, cta_primary_link, created_at TZ, updated_at TZ)
- `header_media`(id, **header_id → page_headers.id CASCADE**, image_url, alt, video_url, created_at TZ, updated_at TZ)

**Home/Page service (3 tables, related — see duplicate-definition caveat above)**
- `service_sections`(id, type UNIQUE, tag, heading_part1, heading_part2, paragraph, created_at, updated_at)
- `home_services`(id, **section_id → service_sections.id CASCADE**, service_title, service_type, page_active, service_description, image, alt, icon, icon_alt, href, order_index, created_at, updated_at)  ← used by homeservice
- `service_items`(id, **section_id → service_sections.id CASCADE**, service_title, service_type, page_active, service_description, image, alt, icon, icon_alt, href, position, created_at, updated_at)  ← used by pageservice
- `service_item_sections`(id, **service_item_id → (home_services | service_items).id CASCADE**, section_name, visible)

**Industry (3 tables, related)**
- `industry_section`(id, page UNIQUE, tag, heading_title, paragraph, created_at)
- `industry_tabs`(id, **section_id → industry_section.id CASCADE**, tab_key, title, description, image, cta_label, cta_link, position, created_at, updated_at)
- `industry_tab_points`(id, **tab_id → industry_tabs.id CASCADE**, point, position, created_at)

**Insight (2 tables, related)**
- `insight_section`(id, page UNIQUE, tag, heading_title, paragraph)
- `steps`(id, **section_id → insight_section.id CASCADE**, title, heading, description, image, `items` JSONB, created_at, updated_at)

**members**(id, name, designation, photourl, alt, position, created_at TZ, updated_at TZ)

**Our Story (2 tables, related)**
- `ourstory`(id, type, tag, heading_part1, heading_part2, paragraph, image, alt, created_at, updated_at)
- `ourstory_steps`(id, **story_id → ourstory.id CASCADE**, image, icon, icon_alt, alt, title, description, order_index, is_hidden) + index `idx_story_steps_order(story_id, order_index)`

**Pricing (3 tables, related)**
- `page_price_plans`(id, type, tag, heading_part1, heading_part2, paragraph, created_at, updated_at) + UNIQUE index on `type`
- `packages`(id, **page_price_plan_id → page_price_plans.id CASCADE**, name, description, currency default 'USD', price NUMERIC(10,2), billing_cycle, is_hidden, position, created_at, updated_at)
- `package_features`(id, **package_id → packages.id CASCADE**, feature, is_active, position, created_at, updated_at)

**seo_meta**(id, page_name, meta_title, meta_description, meta_keywords, canonical_url, meta_robots, schema, twitter_card_type, created_at, updated_at)  — see caveat re: `ON UPDATE` / `page_seo`

**site_robots**(id, content, updated_at, updated_by)
**site_sitemap**(id, content, updated_at, updated_by)

**team_images**(id, type UNIQUE, image, alt, order_index, is_hidden, created_at, updated_at)

**testimonials**(id, name, designation, message, image, thumbnail, video_message, category, position, type CHECK in ('main','shorts','talking','podcast','graphic','advertising','website'), created_at TZ, updated_at TZ)

**Why Choose Us (2 tables, related)**
- `whychooseus_sections`(id, type UNIQUE, tag, heading_part1, heading_part2, paragraph, created_at, updated_at)
- `whychooseus_items`(id, **whychooseus_id → whychooseus_sections.id CASCADE**, title, description, icon, alt, position, created_at, updated_at)

**Work (2 tables)**
- `work_header`(id, type UNIQUE, tag, heading_part1, heading_part2, paragraph, created_at, updated_at)
- `works`(id, title, description, thumbnail, video_link, is_visible, is_feature, position, type, sub_type, created_at TZ, updated_at TZ)  — (no explicit FK to work_header; joined by `type` in code)

**Working Process (2 tables, related)**
- `processes`(id, type UNIQUE, tag, heading_part1, heading_part2, paragraph, image, alt, created_at, updated_at)
- `process_steps`(id, **process_id → processes.id CASCADE**, image, icon_alt, icon, alt, title, description, order_index, isHiden)

**Relations summary (parent → child, all `ON DELETE CASCADE`):**
users→(user_login_history, user_dynamic_data); career_pages→job_posts; comparisons→comparison_columns→comparison_entries; faq_sections→faq_items; page_headers→header_media; service_sections→(home_services|service_items)→service_item_sections; industry_section→industry_tabs→industry_tab_points; insight_section→steps; ourstory→ourstory_steps; page_price_plans→packages→package_features; whychooseus_sections→whychooseus_items; processes→process_steps.

---

## 5. ROUTES & CONTROLLERS

- **Route files:** 28 (one per feature module). All mounted in `src/main.route.ts` under the `/api` prefix (some with sub-prefixes like `/api/pricing`, `/api/our-service`, `/api/comparison`, `/api/case-studies`, etc.).
- **Total endpoints:** **~132** across all verbs (`GET`/`POST`/`PUT`/`PATCH`/`DELETE`). Verb spread ≈ GET 15+, POST 15+, PUT 2, PATCH 6, DELETE 7 within the base `router.` set, plus files using differently-named router vars (`route`, `ourstoryRouter`, `workingProcess`, `dashboardRoute`).
- **Controller pattern:** **thin controllers.** Controllers are wrapped in `asyncHandler`, pull `req.body`/`req.params`/`req.query`, call the matching `service` function, and return via `responseHandler(res, status, success, message, data)`. **All DB/business logic lives in the service layer** — which is exactly why the Prisma migration is cleanly scoped to services.
- **Auth on routes:** role protection applied inline via `auth("ADMIN", "MODARATOR")` middleware on mutating/admin routes; public GETs (site data) are unprotected.
- Mixed route param conventions: most CRUD uses `/:id`; public site reads use query params (`?type=`, `?table=a,b,c`, `?slug=`).

**Migration impact:** None expected in routes/controllers — they don't touch SQL. Only the imported `service` functions change internally.

---

## 6. VALIDATION

- **Zod**, version `"zod": "^4.1.12"` (Zod v4).
- Per-module schema files named `*.zod.ts` (e.g. `auth.zod.ts`, `blog.zod.ts`, `pricing.zod.ts`, `comparsion.zod.ts` [sic], `wok.zod.ts` [sic], `caseStudy.zod.ts`). A couple modules put types in `*.type.ts` / `*.interface.ts`.
- Applied via `validate(schema)` middleware (`src/midleware/validate.ts`) on routes, and `ZodError` is handled centrally in `globalErrorHandler`.
- **Unaffected by the migration** — Zod validates request bodies before the service layer.

---

## 7. MIGRATIONS FOLDER

- **No migrations folder. No migration tool.** No `node-pg-migrate`, `knex`, `db-migrate`, `Sequelize`, `TypeORM`, `Flyway`, etc.
- The `.sql` files scattered inside each feature folder (`db.sql`, `user.sql`, `<feature>.sql`, etc.) are **hand-written DDL references only** — they are not executed by any tooling and are not version-tracked migrations. Several are duplicated/stale (see §4 caveats).
- **Prisma implication:** the schema of record is the **live database**, not these files. Recommended path is `prisma db pull` (introspection) to generate `schema.prisma`, then `prisma migrate` going forward. Treat the `.sql` files as informational only and reconcile them against the introspected schema.

---

## 8. PACKAGE.JSON

**Scripts:**
```json
"build":          "tsc",
"start":          "node ./dist/app.js",
"dev":            "ts-node-dev --respawn --transpile-only  ./src/app.ts",
"lint:check":     "eslint . --ext .js,.ts",
"prettier:check": "prettier --ignore-path .gitignore --check \"**/*.+(js|ts)\"",
"prettier:fix":   "prettier --ignore-path .gitignore --write \"**/*.+(js|ts)\"",
"lint-staged":    "lint-staged",
"prepare":        "husky"
```
- ⚠ **No `migrate` / `db` / `seed` scripts** — you'll add `prisma migrate`, `prisma generate`, `prisma db pull`, etc.
- `lint-staged` runs eslint + prettier on staged `src/**/*.{js,ts,jsx,tsx}` (via Husky pre-commit).

**dependencies:**
```
@aws-sdk/client-s3           ^3.787.0
@aws-sdk/lib-storage         ^3.787.0
@aws-sdk/s3-request-presigner ^3.817.0
axios                        ^1.10.0
bcryptjs                     ^3.0.2
connect-redis                ^8.0.3      (present, not actively wired)
cookie-parser                ^1.4.7
cors                         ^2.8.5
dotenv                       ^16.4.7
express                      ^4.21.2
http-status                  ^2.1.0
jsonwebtoken                 ^9.0.2
multer                       ^1.4.5-lts.2
nodemailer                   ^8.0.1
pg                           ^8.14.1     ← DB driver to be replaced/retained-under-Prisma
react-player                 ^3.3.3      (odd for a backend; unused server-side)
ts-node-dev                  ^2.0.0
ua-parser-js                 ^2.0.3
winston                      ^3.17.0
winston-daily-rotate-file    ^5.0.0
zod                          ^4.1.12
```

**devDependencies:**
```
@eslint/js ^9.26.0, @types/cookie-parser ^1.4.8, @types/cors ^2.8.17,
@types/express ^5.0.1, @types/express-session ^1.18.1, @types/jsonwebtoken ^9.0.9,
@types/multer ^1.4.12, @types/nodemailer ^6.4.17, @types/pg ^8.11.11,
eslint ^9.26.0, globals ^16.0.0, husky ^9.1.7, lint-staged ^15.5.1,
prettier 3.5.3, typescript ^5.8.2, typescript-eslint ^8.31.1
```
- **`@prisma/client` + `prisma` are NOT installed** — must be added (`prisma` as devDep, `@prisma/client` as dep).
- Both `package-lock.json` and `yarn.lock` exist — pick one package manager for the migration to avoid drift.

---

## 9. TYPESCRIPT CONFIG (`tsconfig.json`)

Key active settings:
```
target:            "es2016"
module:            "commonjs"
rootDir:           "./src"
outDir:            "./dist"
esModuleInterop:   true
strict:            true
```
Not set (commented out): `moduleResolution`, `baseUrl`, `paths` (**no path aliases** — imports are all relative), `resolveJsonModule`, `experimentalDecorators`, `emitDecoratorMetadata`.

**Prisma implications:**
- CommonJS + `esModuleInterop` + `strict` are all fully compatible with `@prisma/client`. No decorators needed (Prisma is code-gen, not decorator-based).
- `strict: true` means the generated Prisma types will be enforced — a plus for catching mismatches during service rewrites, but expect to fix `any`-typed spots (several services use `/* eslint-disable @typescript-eslint/no-explicit-any */`).
- No path aliases to reconcile.

---

## 10. RUNNING DB INSTANCE (host/port — no credentials)

- Connection is configured for a PostgreSQL server via env-driven host + the **hardcoded port `5436`** in `src/db/db.ts` (`user`, `password`, `database`, `host` come from `.env` → `config`).
- On boot, `db.ts` logs `📦 Connected to PostgreSQL` and has an auto-reconnect (5s) + graceful `SIGINT` shutdown, implying it's expected to connect to a **live/running instance**.
- A **commented-out block** in `db.ts` shows a prior Docker-style config: `host: "landing_page_db"`, `port: 5432`, `database: "landingpage"`, user `postgres` — suggesting the DB historically ran as a Docker service named `landing_page_db` on the default Postgres port `5432`.
- `.env` also defines `DB_HOST_NAME` and `DB_PORT` (values not shown here) plus `REDIS_HOST` / `REDIS_PORT`.

**⚠ Action item for the migration plan:** reconcile the port. The live pool dials **5436** (hardcoded) while `.env`'s `DB_PORT` is separate and unused by the pool. Prisma's `DATABASE_URL` must point at whichever port actually serves the live data — verify this before running `prisma db pull`, or introspection will hit the wrong/empty DB.

---

## Appendix — Recommended migration sequence (for the downstream planner)

1. **Add Prisma**: install `prisma` (dev) + `@prisma/client`; add `DATABASE_URL` to `.env` built from existing `DB_*` vars (confirm port — §10).
2. **Introspect the live DB**: `prisma db pull` → generates `schema.prisma` from the source of truth (not the stale `.sql` files). Manually map: JSONB→`Json`, `TEXT[]`→`String[]`, CHECK constraints→optionally Prisma enums, `gen_random_uuid()`→`@default(dbgenerated("gen_random_uuid()"))` or `@default(uuid())`.
3. **Reconcile schema oddities** flagged in §4 (duplicate `service_sections`/`service_item_sections` FK target, duplicate robots/sitemap DDL, `seo_meta` vs `page_seo`, `NUMBER` type).
4. **Introduce a shared `prisma` client** (e.g. `src/db/prisma.ts`) alongside the existing `db` pool so migration can happen module-by-module without a big-bang cutover.
5. **Rewrite services one module at a time**, lowest-risk first (leaf CRUD: `contact`, `robots`, `sitemap`, `member`, `testimonial`, `brand_images`, `team_image`), keeping function signatures identical so controllers don't change. Map transactions → `prisma.$transaction`; upserts → `prisma.upsert`; `json_agg` joins → nested `include`.
6. **Do `homeapis/home.service.ts` last** — it's the aggregator that composes many services and uses raw `json_agg`; consider keeping parts as `prisma.$queryRaw` initially.
7. **Verify** each rewritten module against the old behavior (response shape must match `responseHandler` output; the public site depends on exact field names).
8. Retire the `pg` `Pool` once all services are ported (or keep it only for any intentionally-raw queries).
