import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { SeoMeta } from "./seo.interface";

export const seoMetaService = {
  async upsertSeoMeta(data: SeoMeta) {
    const result = await db.query(
      `
      INSERT INTO page_seo (
        page_name, meta_title, meta_description, meta_keywords,
        canonical_url, twitter_card_type, meta_robots, "schema"
      )
      VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8
      )
      ON CONFLICT (page_name) DO UPDATE SET
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        meta_keywords = EXCLUDED.meta_keywords,
        canonical_url = EXCLUDED.canonical_url,
        twitter_card_type = EXCLUDED.twitter_card_type,
        meta_robots = EXCLUDED.meta_robots,
        "schema" = EXCLUDED."schema",
        updated_at = NOW()
      RETURNING *;
      `,
      [
        data.page_name,
        data.meta_title,
        data.meta_description,
        data.meta_keywords,
        data.canonical_url,
        data.twitter_card_type,
        data.meta_robots,
        data.schema,
      ]
    );

    return result.rows[0];
  },

  async getSeoMetaByPage(pageName: string) {
    try {
      const workResult = await db.query(
        `SELECT thumbnail FROM works WHERE type = $1 LIMIT 1 `,
        ["main"]
      );
      // console.log(workResult.rows[0]);
      const result = await db.query(
        `SELECT * FROM page_seo WHERE page_name = $1 LIMIT 1`,
        [pageName]
      );
      const mergeData = {
        ...result.rows[0],
        ogImage: workResult?.rows[0]?.thumbnail,
      };
      return mergeData || null;
    } catch (error) {
      errorLogger.error(error);
      return [];
    }
  },

  async getAllSeoMeta() {
    const result = await db.query(`SELECT * FROM page_seo`);
    return result.rows;
  },

  async deleteSeoMetaByPage(pageName: string) {
    const result = await db.query(
      `DELETE FROM page_seo WHERE page_name = $1 RETURNING *`,
      [pageName]
    );
    return result.rows[0] || null;
  },
};
