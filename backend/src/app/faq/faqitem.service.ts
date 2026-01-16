/* eslint-disable @typescript-eslint/no-explicit-any */
import { PoolClient } from "pg";
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";

export const faqItemService = {
  async createFaqItem(
    client: PoolClient,
    sectionId: string,
    item: {
      question: string;
      answer: string;
      is_visible: boolean;
      sort_order?: number;
    }
  ) {
    try {
      const result = await client.query(
        `INSERT INTO faq_items (
          faq_section_id,
          question,
          answer,
          is_visible,
          sort_order
        ) VALUES ($1,$2,$3,$4,$5)
        RETURNING *`,
        [
          sectionId,
          item.question,
          item.answer,
          item.is_visible ?? true,
          item.sort_order ?? 0,
        ]
      );

      return result.rows[0];
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Failed to create FAQ item");
    }
  },

  async updateFaqItem(
    id: string,
    item: {
      question?: string;
      answer?: string;
      is_visible?: boolean;
      sort_order?: number;
    }
  ) {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;

      if (item.question !== undefined) {
        fields.push(`question = $${idx++}`);
        values.push(item.question);
      }
      if (item.answer !== undefined) {
        fields.push(`answer = $${idx++}`);
        values.push(item.answer);
      }
      if (item.is_visible !== undefined) {
        fields.push(`is_visible = $${idx++}`);
        values.push(item.is_visible);
      }
      if (item.sort_order !== undefined) {
        fields.push(`sort_order = $${idx++}`);
        values.push(item.sort_order);
      }

      if (!fields.length) throw new Error("Nothing to update");

      values.push(id);

      const result = await db.query(
        `UPDATE faq_items SET ${fields.join(
          ", "
        )}, updated_at = NOW() WHERE id = $${idx} RETURNING *`,
        values
      );

      return result.rows[0];
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Failed to update FAQ item");
    }
  },

  async deleteFaqItem(id: string) {
    const result = await db.query(
      `DELETE FROM faq_items WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },

  async getFaqItemsBySectionId(sectionId: string) {
    const result = await db.query(
      `SELECT * FROM faq_items 
       WHERE faq_section_id = $1 
       ORDER BY sort_order ASC`,
      [sectionId]
    );
    return result.rows;
  },
};
