/**
 * verify-schema.js — checks the introspected schema.prisma against the
 * discovery report expectations. Run AFTER `npx prisma db pull`:
 *
 *     node verify-schema.js
 *
 * Pure static analysis of prisma/schema.prisma — no DB connection, no writes.
 * Reports: table coverage, exception columns, @map coverage, UUID PK defaults,
 * Json / String[] columns, and relation (foreign-key) detection.
 */
const fs = require("fs");
const path = require("path");

const SCHEMA = path.join(__dirname, "prisma", "schema.prisma");
if (!fs.existsSync(SCHEMA)) {
  console.error("schema.prisma not found. Run `npx prisma db pull` first.");
  process.exit(1);
}
const src = fs.readFileSync(SCHEMA, "utf8");

// ---- expected tables from the discovery report (~40) ----
const EXPECTED_TABLES = [
  "users", "user_login_history", "user_dynamic_data",
  "blogs", "brandimage",
  "career_pages", "job_posts",
  "case_studies",
  "comparisons", "comparison_columns", "comparison_entries",
  "contacts",
  "faq_sections", "faq_items",
  "page_headers", "header_media",
  "service_sections", "home_services", "service_items", "service_item_sections",
  "industry_section", "industry_tabs", "industry_tab_points",
  "insight_section", "steps",
  "members",
  "ourstory", "ourstory_steps",
  "page_price_plans", "packages", "package_features",
  "seo_meta",
  "site_robots", "site_sitemap",
  "team_images",
  "testimonials",
  "whychooseus_sections", "whychooseus_items",
  "work_header", "works",
  "processes", "process_steps",
];

// exception columns that should stay camelCase (they are camelCase IN the DB,
// so Prisma should NOT add @map for them — field name == column name)
const CAMEL_EXCEPTIONS = [
  { table: "blogs", col: "updatedAt" },
  { table: "blogs", col: "whatWillLearn" },
  { table: "contacts", col: "interestIn" },
  { table: "processes", col: "isHiden" },
  { table: "process_steps", col: "isHiden" },
];

// parse model blocks: capture model name, optional @@map, and body
const models = {};
const modelRe = /model\s+(\w+)\s*\{([\s\S]*?)\n\}/g;
let m;
while ((m = modelRe.exec(src))) {
  const [, name, body] = m;
  const mapMatch = body.match(/@@map\("([^"]+)"\)/);
  models[name] = { body, dbTable: mapMatch ? mapMatch[1] : name };
}

const dbTables = Object.values(models).map((x) => x.dbTable);
const line = (s) => console.log(s);

line("═══════════════════════════════════════════════════════");
line(" PRISMA SCHEMA VERIFICATION  (vs discovery report)");
line("═══════════════════════════════════════════════════════\n");

// 1) table coverage
line(`1) TABLE COVERAGE  — models found: ${Object.keys(models).length}`);
const missing = EXPECTED_TABLES.filter((t) => !dbTables.includes(t));
const extra = dbTables.filter((t) => !EXPECTED_TABLES.includes(t));
line(`   expected ${EXPECTED_TABLES.length} tables`);
if (missing.length) line(`   ✗ MISSING: ${missing.join(", ")}`);
else line(`   ✓ all expected tables present`);
if (extra.length) line(`   ⚠ EXTRA (in DB, not in report): ${extra.join(", ")}`);
line("");

// helper: find model whose dbTable == table
const modelFor = (table) =>
  Object.entries(models).find(([, v]) => v.dbTable === table);

// 2) camelCase exception columns — should exist WITHOUT @map
line("2) CAMELCASE EXCEPTION COLUMNS (should have NO @map)");
for (const { table, col } of CAMEL_EXCEPTIONS) {
  const entry = modelFor(table);
  if (!entry) { line(`   ? ${table}.${col}: model missing`); continue; }
  const body = entry[1].body;
  const hasField = new RegExp(`\\n\\s*${col}\\s`).test(body);
  const hasMapForCol =
    new RegExp(`${col}[\\s\\S]*?@map\\("${col}"\\)`).test(body) === false;
  if (hasField) line(`   ✓ ${table}.${col} present as camelCase field`);
  else line(`   ✗ ${table}.${col} NOT found (check introspected name)`);
}
line("");

// 3) @map coverage (snake_case columns mapped to camelCase fields — optional)
line("3) @map USAGE");
const mapCount = (src.match(/@map\("/g) || []).length;
const atatMapCount = (src.match(/@@map\("/g) || []).length;
line(`   field-level @map(...)  : ${mapCount}`);
line(`   model-level @@map(...) : ${atatMapCount}`);
line(`   (Prisma auto-adds @@map for every table; field @map only if you`);
line(`    later choose to camelCase field names — not required to work.)`);
line("");

// 4) UUID PK defaults
line("4) UUID PRIMARY KEY DEFAULTS (gen_random_uuid / dbgenerated)");
let pkOk = 0, pkTotal = 0;
for (const [name, v] of Object.entries(models)) {
  const idLine = v.body.split("\n").find((l) => /^\s*id\s+/.test(l));
  if (!idLine) continue;
  pkTotal++;
  if (/@id/.test(idLine) &&
      (/dbgenerated\("gen_random_uuid/.test(idLine) || /@default\(uuid/.test(idLine) || /@default\(dbgenerated/.test(idLine))) {
    pkOk++;
  } else {
    line(`   ⚠ ${name}: id present but default not gen_random_uuid → ${idLine.trim()}`);
  }
}
line(`   ✓ ${pkOk}/${pkTotal} models have UUID id with a generated default`);
line("");

// 5) JSON and array columns
line("5) JSON + ARRAY COLUMNS");
const jsonCols = (src.match(/^\s*\w+\s+Json/gm) || []).length;
const arrCols = (src.match(/^\s*\w+\s+\w+\[\]/gm) || []).length;
line(`   Json fields  : ${jsonCols}   (report expects: job_posts.salary, insight steps.items, case_studies hero_stats/metrics/challenge_items/solution_phases/testimonials)`);
line(`   Array fields : ${arrCols}   (report expects: blogs.whatWillLearn, blogs.keywords, case_studies.tag_slugs, case_studies.client_tags)`);
line("");

// 6) relations / foreign keys
line("6) RELATIONS (foreign keys detected)");
const relCount = (src.match(/@relation\(/g) || []).length;
line(`   @relation(...) occurrences: ${relCount}`);
line(`   expected FK parent→child chains (report):`);
line(`     users→(user_login_history,user_dynamic_data); career_pages→job_posts;`);
line(`     comparisons→comparison_columns→comparison_entries; faq_sections→faq_items;`);
line(`     page_headers→header_media; service_sections→(home_services|service_items)→service_item_sections;`);
line(`     industry_section→industry_tabs→industry_tab_points; insight_section→steps;`);
line(`     ourstory→ourstory_steps; page_price_plans→packages→package_features;`);
line(`     whychooseus_sections→whychooseus_items; processes→process_steps.`);
line(`   NOTE: 'works' has NO FK to work_header (joined by 'type' in code) — expect no relation there.`);
line("");

line("═══════════════════════════════════════════════════════");
line(" Review any ✗ or ⚠ lines above before touching services.");
line("═══════════════════════════════════════════════════════");
