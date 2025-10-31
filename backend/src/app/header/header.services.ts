/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IPageHeader } from "./header.interface";

export const pageHeaderService = {
  /**
   * Add or update a Page Header with its media items
   */
  async addOrUpdateHeader(data: IPageHeader) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      // 🔍 1️⃣ Check if header of this type already exists
      const existingHeader = await client.query(
        `SELECT id FROM page_headers WHERE type = $1 LIMIT 1`,
        [data.type]
      );

      let headerId: string;

      if (existingHeader.rows.length > 0) {
        // ✅ Update existing header
        const result = await client.query(
          `UPDATE page_headers
           SET page_subtitle = $1,
               page_title = $2,
               description = $3,
               cta_primary_link = $4,
               updated_at = NOW()
           WHERE type = $5
           RETURNING id`,
          [
            data.page_subtitle,
            data.page_title,
            data.description,
            data.cta_primary_link,
            data.type,
          ]
        );
        headerId = result.rows[0].id;

        // 🧹 Clear old media (replace on update)
        await client.query(`DELETE FROM header_media WHERE header_id = $1`, [
          headerId,
        ]);
      } else {
        // ✅ Insert new header
        const insertHeader = await client.query(
          `INSERT INTO page_headers 
           (page_subtitle, page_title, description, cta_primary_link, type, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           RETURNING id`,
          [
            data.page_subtitle,
            data.page_title,
            data.description,
            data.cta_primary_link,
            data.type,
          ]
        );
        headerId = insertHeader.rows[0].id;
      }

      // 🖼️ 2️⃣ Insert related media (if provided)
      if (data.media && data.media.length > 0) {
        for (const item of data.media) {
          await client.query(
            `INSERT INTO header_media (header_id, image_url, alt, video_url, created_at)
             VALUES ($1, $2, $3, $4, NOW())`,
            [headerId, item.image_url, item.alt, item.video_url]
          );
        }
      }

      await client.query("COMMIT");
      return { message: "Header saved successfully", id: headerId };
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw new Error("❌ Failed to process page header.");
    } finally {
      client.release();
    }
  },

  /**
   * Fetch all page headers (optionally filtered by type)
   * Each header includes its media[] array
   */
  async getAllHeaders(type?: string) {
    try {
      const values: any[] = [];
      let query = `
        SELECT 
          ph.*,
          COALESCE(
            json_agg(
              json_build_object(
                'id', hm.id,
                'image_url', hm.image_url,
                'alt', hm.alt,
                'video_url', hm.video_url
              )
            ) FILTER (WHERE hm.id IS NOT NULL), 
          '[]') AS media
        FROM page_headers ph
        LEFT JOIN header_media hm ON ph.id = hm.header_id
      `;

      if (type) {
        query += ` WHERE ph.type = $1`;
        values.push(type);
      }

      query += ` GROUP BY ph.id ORDER BY ph.created_at DESC`;

      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      errorLogger.error(error);
      throw new Error("❌ Failed to fetch page headers.");
    }
  },

  /**
   * Delete a header and all its media
   */
  async deleteHeader(id: string) {
    try {
      await db.query(`DELETE FROM page_headers WHERE id = $1`, [id]);
      return { message: "Header deleted successfully" };
    } catch (error) {
      errorLogger.error(error);
      throw new Error("❌ Failed to delete header.");
    }
  },
};
