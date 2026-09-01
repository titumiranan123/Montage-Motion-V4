/**
 * check-constraints.js — READ-ONLY. Extracts all CHECK constraints from the
 * public schema of the live DB using prisma-migration/.env DATABASE_URL.
 *
 *     node check-constraints.js
 *
 * Uses pg directly (no Prisma needed). SELECT only — no writes.
 */
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

// load DATABASE_URL from .env (no dotenv dependency required)
const envPath = path.join(__dirname, ".env");
const env = fs.readFileSync(envPath, "utf8");
const m = env.match(/DATABASE_URL\s*=\s*"?([^"\n]+)"?/);
if (!m) { console.error("DATABASE_URL not found in .env"); process.exit(1); }
const connectionString = m[1].trim();

const SQL = `
SELECT rel.relname AS table_name, con.conname,
       pg_get_constraintdef(con.oid) AS definition
FROM pg_constraint con
JOIN pg_class rel ON rel.oid = con.conrelid
JOIN pg_namespace ns ON ns.oid = rel.relnamespace
WHERE con.contype = 'c' AND ns.nspname = 'public'
ORDER BY rel.relname;
`;

(async () => {
  const client = new Client({ connectionString });
  await client.connect();
  const { rows } = await client.query(SQL);
  console.log(`\nCHECK constraints in public schema: ${rows.length}\n`);
  for (const r of rows) {
    console.log(`• ${r.table_name}  [${r.conname}]`);
    console.log(`    ${r.definition}\n`);
  }
  await client.end();
})().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
