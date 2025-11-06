/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IBrandImage } from "./brandimage.interface";

export const BrandImageService = {
  async createBrandImage(data: IBrandImage) {
    try {
      const last = await db.query(
        `SELECT sortOrder FROM brandimage WHERE type = $1 ORDER BY sortOrder DESC LIMIT 1`,
        [data.type]
      );
      console.log(last.rows[0]);
      const newPosition =
        last.rows.length > 0 ? Number(last.rows[0].sortorder) + 1 : 1;
      console.log(newPosition);
      const result = await db.query(
        `INSERT INTO brandimage (image, alt, ishide, type,width, height,sortorder)
         VALUES ($1, $2, $3, $4,$5, $6, $7)
         RETURNING *`,
        [
          data.image,
          data.alt,
          data.ishide ?? false,
          data.type,
          data.width,
          data.height,
          Number(newPosition),
        ]
      );
      return result.rows[0];
    } catch (error: any) {
      errorLogger.error(error);
      throw error;
    }
  },

  async getAllBrandImage(type?: string) {
    let query = `SELECT * FROM brandimage`;
    const params: any[] = [];

    if (type) {
      query += ` WHERE type = $1`;
      params.push(type);
    }

    query += ` ORDER BY id ASC`;

    const result = await db.query(query, params);
    return result.rows;
  },

  async getBrandImageById(id: string) {
    const result = await db.query(`SELECT * FROM brandimage WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  },

  async updateBrandImage(id: string, data: Partial<IBrandImage>) {
    const existing = await BrandImageService.getBrandImageById(id);
    if (!existing) throw new Error("Brand image not found");

    const updated = { ...existing, ...data };
    const result = await db.query(
      `UPDATE brandimage
       SET image = $1, ishide = $2, type = $3, alt = $4 , width= $5 ,height = $6
       WHERE id = $7
       RETURNING *`,
      [
        updated.image,
        updated.ishide ?? false,
        updated.type,
        updated.alt,
        updated.width,
        updated.height,
        id,
      ]
    );
    return result.rows[0];
  },

  async deleteBrandImage(id: string) {
    const result = await db.query(
      `DELETE FROM brandimage WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  },
  async updateVideosPositions(data: Partial<IBrandImage>[]) {
    try {
      const client = await db.connect();
      try {
        await client.query("BEGIN");

        // Group videos by type
        const grouped: Record<string, Partial<IBrandImage>[]> = {};
        for (const brand of data) {
          if (!brand.type || !brand.id) continue;
          if (!grouped[brand.type]) grouped[brand.type] = [];
          grouped[brand.type].push(brand);
        }

        for (const type in grouped) {
          const group = grouped[type];

          group.sort((a, b) => (a.sortorder ?? 0) - (b.sortorder ?? 0));

          for (let i = 0; i < group.length; i++) {
            const newPosition = i + 1;
            await client.query(
              `UPDATE brandimage SET position = $1 WHERE id = $2`,
              [newPosition, group[i].id]
            );
          }
        }

        await client.query("COMMIT");
        return data;
      } catch (error) {
        await client.query("ROLLBACK");
        errorLogger.error("Update Video Positions Error:", error);
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
