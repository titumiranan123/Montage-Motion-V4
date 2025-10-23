import { db } from "../../db/db";

export const siteMapService = {
  async createSitemap(content: string) {
    await db.query(`DELETE FROM site_sitemap`);
    const result = await db.query(
      `INSERT INTO site_sitemap (content) VALUES ($1) RETURNING *`,
      [content ?? ""]
    );
    return result.rows[0];
  },

  async getSitemap() {
    const result = await db.query(`SELECT * FROM site_sitemap LIMIT 1`);
    return result.rows[0];
  },
};
