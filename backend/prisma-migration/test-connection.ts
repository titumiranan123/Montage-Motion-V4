/**
 * READ-ONLY connection test for the introspected Prisma schema.
 *
 * Run AFTER `npx prisma db pull` and `npx prisma generate`:
 *     npx ts-node test-connection.ts
 *
 * SAFETY: This script performs ONLY reads.
 *   - No create / update / delete / upsert
 *   - No $executeRaw (write path). Only findMany({ take }) and a SELECT-count $queryRaw.
 * It proves the connection works and that Prisma can read the live tables.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Prisma (db pull) names models after table names verbatim (snake_case kept).
// We probe a few known tables from the discovery report, tolerant to naming.
const CANDIDATE_MODELS = [
  "users",
  "blogs",
  "testimonials",
  "members",
  "case_studies",
];

async function main() {
  console.log("→ Connecting to database (read-only test)...");
  await prisma.$connect();
  console.log("✓ $connect() succeeded.\n");

  // 1) Raw, model-name-independent sanity read: count tables in public schema.
  try {
    const rows = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*)::bigint AS count
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `;
    console.log(`✓ public schema base tables: ${rows[0].count.toString()}`);
  } catch (e) {
    console.log("✗ raw table-count query failed:", (e as Error).message);
  }

  // 2) Try a typed findMany on the first candidate model that exists.
  const client = prisma as unknown as Record<string, { findMany: Function }>;
  let read = false;
  for (const model of CANDIDATE_MODELS) {
    const accessor = client[model];
    if (accessor && typeof accessor.findMany === "function") {
      try {
        const sample = await accessor.findMany({ take: 3 });
        console.log(
          `✓ prisma.${model}.findMany({ take: 3 }) → ${sample.length} row(s) read`,
        );
        if (sample.length > 0) {
          console.log(
            `  sample keys: ${Object.keys(sample[0]).slice(0, 8).join(", ")}`,
          );
        }
        read = true;
        break;
      } catch (e) {
        console.log(`  (model '${model}' read failed: ${(e as Error).message})`);
      }
    }
  }
  if (!read) {
    console.log(
      "✗ Could not read via any candidate model. Check model names in schema.prisma.",
    );
  }

  console.log("\n✓ READ-ONLY test complete. No data was modified.");
}

main()
  .catch((e) => {
    console.error("✗ Connection test FAILED:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
