/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IBrandImage } from "./teamimage.interface";

export const BrandImageService = {
  async createBrandImage(data: IBrandImage) {
    try {
      const last = await db.query(
        `SELECT order_index 
         FROM team_images 
         WHERE type = $1 
         ORDER BY order_index DESC 
         LIMIT 1`,
        [data.type]
      );

      const newPosition =
        last.rows.length > 0 ? Number(last.rows[0].order_index) + 1 : 1;

      const result = await db.query(
        `INSERT INTO team_images (image, alt, is_hidden, type, order_index)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          data.image,
          data.alt,
          data.is_hidden ?? false,
          data.type,
          newPosition,
        ]
      );

      return result.rows[0];
    } catch (error: any) {
      errorLogger.error(error);
      throw error;
    }
  },

  async getAllBrandImage(type?: string) {
    let query = `SELECT * FROM team_images`;
    const params: any[] = [];

    if (type) {
      query += ` WHERE type = $1`;
      params.push(type);
    }

    query += ` ORDER BY order_index ASC`;

    const result = await db.query(query, params);
    return result.rows;
  },

  async getBrandImageById(id: string) {
    const result = await db.query(
      `SELECT * FROM team_images WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async updateBrandImage(id: string, data: Partial<IBrandImage>) {
    const existing = await BrandImageService.getBrandImageById(id);
    if (!existing) throw new Error("Brand image not found");

    const updated = { ...existing, ...data };

    const result = await db.query(
      `UPDATE team_images
       SET image = $1,
           alt = $2,
           is_hidden = $3,
           type = $4,
           updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [
        updated.image,
        updated.alt,
        updated.is_hidden ?? false,
        updated.type,
        id,
      ]
    );

    return result.rows[0];
  },

  async deleteBrandImage(id: string) {
    const result = await db.query(
      `DELETE FROM team_images WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  },

  async updateImagePositions(data: Partial<IBrandImage>[]) {
    try {
      const client = await db.connect();

      try {
        await client.query("BEGIN");

        const grouped: Record<string, Partial<IBrandImage>[]> = {};

        for (const item of data) {
          if (!item.type || !item.id) continue;

          if (!grouped[item.type]) grouped[item.type] = [];
          grouped[item.type].push(item);
        }

        for (const type in grouped) {
          const group = grouped[type];

          group.sort(
            (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
          );

          for (let i = 0; i < group.length; i++) {
            await client.query(
              `UPDATE team_images 
               SET order_index = $1 
               WHERE id = $2`,
              [i + 1, group[i].id]
            );
          }
        }

        await client.query("COMMIT");
        return data;
      } catch (error) {
        await client.query("ROLLBACK");
        errorLogger.error("Update Image Positions Error:", error);
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
      errorLogger.error("DB Connection Error:", error);
      throw error;
    }
  },
};