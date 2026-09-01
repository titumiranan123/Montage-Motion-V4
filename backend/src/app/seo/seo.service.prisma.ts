/**
 * seo.service.prisma.ts — Prisma re-implementation of seo.service.ts (POC).
 *
 * The original raw-pg service (seo.service.ts) is left UNCHANGED. This file is a
 * drop-in replacement candidate: same object name (`seoMetaService`), same method
 * names, same signatures, same return shapes — so no controller change is needed
 * when we later switch the import.
 *
 * Live table: page_seo → Prisma model `page_seo`. Column `schema` is a normal field.
 */
import { Prisma } from "@prisma/client";
import { prisma } from "../../db/prisma";
import { errorLogger } from "../../logger/logger";
import { SeoMeta } from "./seo.interface";

export const seoMetaService = {
  // Raw: INSERT ... ON CONFLICT (page_name) DO UPDATE ... RETURNING *
  // Prisma: upsert on the unique `page_name`. On update, bump updated_at like the SQL did.
  async upsertSeoMeta(data: SeoMeta) {
    const result = await prisma.page_seo.upsert({
      where: { page_name: data.page_name },
      create: {
        page_name: data.page_name,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        meta_keywords: data.meta_keywords,
        canonical_url: data.canonical_url,
        twitter_card_type: data.twitter_card_type,
        meta_robots: data.meta_robots,
        schema: data.schema,
      },
      update: {
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        meta_keywords: data.meta_keywords,
        canonical_url: data.canonical_url,
        twitter_card_type: data.twitter_card_type,
        meta_robots: data.meta_robots,
        schema: data.schema,
        updated_at: new Date(), // mirrors `updated_at = NOW()` in the ON CONFLICT branch
      },
    });

    return result; // RETURNING * → full row
  },

  // Raw: SELECT schema FROM page_seo WHERE page_name = $1 LIMIT 1  → rows[0] (or undefined)
  // Prisma: findUnique + select. Convert null → undefined to match rows[0] semantics exactly.
  async getSchema(page: string) {
    const result = await prisma.page_seo.findUnique({
      where: { page_name: page },
      select: { schema: true },
    });
    return result === null ? undefined : result;
  },

  // Raw: fetch works.thumbnail (type='main') + full page_seo row, merge with ogImage.
  //      try/catch returns [] on error.
  async getSeoMetaByPage(pageName: string) {
    try {
      // for og image
      const workResult = await prisma.works.findFirst({
        where: { type: "main" },
        select: { thumbnail: true },
      });

      const result = await prisma.page_seo.findUnique({
        where: { page_name: pageName },
      });

      const mergeData = {
        ...result, // spreading null/undefined yields {} — same as raw rows[0] being undefined
        ogImage: workResult?.thumbnail,
      };
      return mergeData || null;
    } catch (error) {
      errorLogger.error(error);
      return [];
    }
  },

  // Raw: SELECT * FROM page_seo  → all rows
  async getAllSeoMeta() {
    const result = await prisma.page_seo.findMany();
    return result;
  },

  // Raw: DELETE ... WHERE page_name = $1 RETURNING *  → rows[0] || null
  // Prisma delete throws P2025 when the row is absent; raw pg returned null instead.
  // Catch P2025 → null to preserve the original "not found → null" contract.
  async deleteSeoMetaByPage(pageName: string) {
    try {
      const result = await prisma.page_seo.delete({
        where: { page_name: pageName },
      });
      return result; // deleted row, like RETURNING *
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return null;
      }
      throw error;
    }
  },
};
