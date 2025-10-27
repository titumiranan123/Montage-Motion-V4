import { db } from "../../db/db";
import { IBrandImage } from "./brandimage.interface";

export const BrandImageService = {
  async createBaranImage(data: IBrandImage) {
    const result = await db.query(
      `INSERT INTO brand_images (image,ishide,type) VALUES ($1,$2,$3) RETURNING * `,
      [data.image, data.ishide ?? true, data.type]
    );
    return result.rows[0];
  },
  async getAllBrandImage(type?: string) {
    let query = `SELECT * FROM brand_images`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any[] = [];
    if (type) {
      query += `WHERE type = $1`;
      params.push(type);
    }
    query += `ORDER BY id ASC`;
    const result = await db.query(query, params);
    return result.rows;
  },
  async getBrandImageById(id: string) {
    const result = await db.query(`SELECT * FROM brand_images WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  },
  async updateBrandImage(id: string, data: Partial<IBrandImage>) {
    const existing = await BrandImageService.getBrandImageById(id);
    if (!existing) throw new Error("Brand image not found");

    const updated = { ...existing, ...data };
    const result = await db.query(
      `UPDATE brand_images
       SET image = $1, ishide = $2, type = $3
       WHERE id = $4
       RETURNING *`,
      [updated.image, updated.ishide, updated.type, id]
    );
    return result.rows[0];
  },

  async deleteBrandImage(id: string) {
    const result = await db.query(
      `DELETE FROM brand_images WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  },
};
