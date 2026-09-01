"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Prisma (db pull) names models after table names verbatim (snake_case kept).
// We probe a few known tables from the discovery report, tolerant to naming.
const CANDIDATE_MODELS = [
    "users",
    "blogs",
    "testimonials",
    "members",
    "case_studies",
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("→ Connecting to database (read-only test)...");
        yield prisma.$connect();
        console.log("✓ $connect() succeeded.\n");
        // 1) Raw, model-name-independent sanity read: count tables in public schema.
        try {
            const rows = yield prisma.$queryRaw `
      SELECT COUNT(*)::bigint AS count
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `;
            console.log(`✓ public schema base tables: ${rows[0].count.toString()}`);
        }
        catch (e) {
            console.log("✗ raw table-count query failed:", e.message);
        }
        // 2) Try a typed findMany on the first candidate model that exists.
        const client = prisma;
        let read = false;
        for (const model of CANDIDATE_MODELS) {
            const accessor = client[model];
            if (accessor && typeof accessor.findMany === "function") {
                try {
                    const sample = yield accessor.findMany({ take: 3 });
                    console.log(`✓ prisma.${model}.findMany({ take: 3 }) → ${sample.length} row(s) read`);
                    if (sample.length > 0) {
                        console.log(`  sample keys: ${Object.keys(sample[0]).slice(0, 8).join(", ")}`);
                    }
                    read = true;
                    break;
                }
                catch (e) {
                    console.log(`  (model '${model}' read failed: ${e.message})`);
                }
            }
        }
        if (!read) {
            console.log("✗ Could not read via any candidate model. Check model names in schema.prisma.");
        }
        console.log("\n✓ READ-ONLY test complete. No data was modified.");
    });
}
main()
    .catch((e) => {
    console.error("✗ Connection test FAILED:", e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
