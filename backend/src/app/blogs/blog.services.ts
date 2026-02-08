/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { IBlog } from "./blog.zod";

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 100);
}

export const BlogService = {
  /** CREATE BLOG */
  async createBlog(data: IBlog) {
    const slug = generateSlug(data.title);

    // Get the highest current position
    const positionResult = await db.query(
      `SELECT MAX(position) as max FROM blogs`,
    );
    const lastPosition = positionResult.rows[0]?.max || 0;
    const newPosition = lastPosition + 1;

    const result = await db.query(
      `INSERT INTO blogs (
        title, slug, meta_title, meta_description, keywords,
        short_description, description, image, alt,
        is_publish, is_feature, position, read_time, updatedAt,
        whatWillLearn, created_at, updated_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,NOW(),NOW()
      ) RETURNING *`,
      [
        data.title,
        slug,
        data.meta_title,
        data.meta_description,
        data.keywords || [],
        data.short_description,
        data.description,
        data.image,
        data.alt,
        data.is_publish ?? true,
        data.is_feature ?? false,
        newPosition,
        data.read_time || null,
        data.updatedAt || null,
        data.whatWillLearn || [],
      ],
    );

    return result.rows[0] || null;
  },

  /** GET ALL BLOGS */
  async getAllBlogs() {
    const result = await db.query(`SELECT * FROM blogs ORDER BY position ASC`);
    return result.rows;
  },

  /** GET BLOG BY ID */
  async getBlogById(id: string) {
    const result = await db.query(`SELECT * FROM blogs WHERE id = $1`, [id]);
    return result.rows[0] || null;
  },

  /** UPDATE BLOG BY ID */
  async updateBlog(id: string, data: Partial<IBlog>) {
    const existing = await this.getBlogById(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...data,
      slug: data.title ? generateSlug(data.title) : existing.slug,
    };

    const result = await db.query(
      `UPDATE blogs SET
        title = $1,
        slug = $2,
        meta_title = $3,
        meta_description = $4,
        keywords = $5,
        short_description = $6,
        description = $7,
        image = $8,
        alt = $9,
        is_publish = $10,
        is_feature = $11,
        read_time = $12,
        updatedAt = $13,
        whatWillLearn = $14,
        updated_at = NOW()
      WHERE id = $15
      RETURNING *`,
      [
        updated.title,
        updated.slug,
        updated.meta_title,
        updated.meta_description,
        updated.keywords || [],
        updated.short_description,
        updated.description,
        updated.image,
        updated.alt,
        updated.is_publish,
        updated.is_feature,
        updated.read_time || null,
        updated.updatedAt || null,
        updated.whatWillLearn || [],
        id,
      ],
    );

    return result.rows[0] || null;
  },

  /** UPDATE BLOG POSITIONS */
  async updateBlogPosition(blogs: { id: string; position: number }[]) {
    const updates: Promise<any>[] = [];

    for (const blog of blogs) {
      const existing = await db.query(
        `SELECT position FROM blogs WHERE id = $1`,
        [blog.id],
      );
      const currentPosition = existing.rows[0]?.position;

      if (currentPosition !== blog.position) {
        updates.push(
          db.query(`UPDATE blogs SET position = $1 WHERE id = $2`, [
            blog.position,
            blog.id,
          ]),
        );
      }
    }

    await Promise.all(updates);

    const result = await db.query(`SELECT * FROM blogs ORDER BY position ASC`);
    return result.rows;
  },

  /** DELETE BLOG */
  async deleteBlog(id: string) {
    const result = await db.query(
      `DELETE FROM blogs WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0] || null;
  },
};
