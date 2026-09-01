/**
 * seo-test.ts - READ-ONLY smoke test for seo.service.prisma.ts.
 *
 * Run from the backend project root (needs @prisma/client installed + generated
 * there, and DATABASE_URL in the environment/.env):
 *     npx ts-node src/app/seo/seo-test.ts
 *
 * Calls ONLY read methods so output can be diffed against the old raw-pg service:
 *     getSchema, getSeoMetaByPage, getAllSeoMeta
 * NO write methods (upsertSeoMeta / deleteSeoMetaByPage) are invoked.
 */
import process from "node:process";
import { page_seo } from "@prisma/client";
import { seoMetaService } from "./seo.service.prisma";
import { prisma } from "../../db/prisma";

async function main() {
  const page = process.argv[2] || "home"; // override: ts-node seo-test.ts about

  console.log("-------- getAllSeoMeta() --------");
  const all = await seoMetaService.getAllSeoMeta();
  console.log(`rows: ${all.length}`);
  console.log("page_names:", all.map((r: page_seo) => r.page_name));

  console.log(`\n-------- getSchema("${page}") --------`);
  const schema = await seoMetaService.getSchema(page);
  console.log(schema); // { schema: ... } or undefined

  console.log(`\n-------- getSeoMetaByPage("${page}") --------`);
  const meta = await seoMetaService.getSeoMetaByPage(page);
  console.log(meta); // full row + ogImage, or {} / null

  console.log("[OK] READ-ONLY test complete. No writes performed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
