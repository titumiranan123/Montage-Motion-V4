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
    const blogResult = await db.query(`SELECT slug, created_at FROM blogs`);
    const blogEntries = blogResult?.rows;

    let blogUrlsXml = "";
    const baseUrl = "https://montagemotion.com/blog/";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogEntries.forEach((blog: any) => {
      const lastmodDate = new Date(blog.created_at).toISOString().split("T")[0];
      blogUrlsXml += `
    <url>
      <loc>${baseUrl}${blog.slug}</loc>
      <lastmod>${lastmodDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>`;
    });
    return result?.rows[0]?.content + "\n" + blogUrlsXml;
  },
};
