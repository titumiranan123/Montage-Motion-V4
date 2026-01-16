/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IFaqSection } from "./faq.interfac";
import { faqItemService } from "./faqitem.service";

const checkFaqSectionExists = async (id: string) => {
  const res = await db.query(`SELECT 1 FROM faq_sections WHERE id = $1`, [id]);
  if (res.rowCount === 0) throw new Error("FAQ section not found");
};

export const faqService = {
  /** ✅ Create FAQ Section with items */
  async createFaqSection(data: IFaqSection) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const sectionResult = await client.query(
        `INSERT INTO faq_sections (
          section_tag,
          section_title,
          section_description,
          contact_image,
          contact_alt,
          contact_heading,
          contact_description,
          contact_name,
          contact_position,
          contact_link,
          is_active
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING *`,
        [
          data.section_tag,
          data.section_title,
          data.section_description,
          data.contact_image,
          data.contact_alt ?? null,
          data.contact_heading,
          data.contact_description ?? null,
          data.contact_name ?? null,
          data.contact_position ?? null,
          data.contact_link ?? null,
          data.is_active ?? true,
        ]
      );

      const sectionId = sectionResult.rows[0].id;

      if (data.faqs?.length) {
        for (const item of data.faqs) {
          await faqItemService.createFaqItem(client, sectionId, item);
        }
      }

      await client.query("COMMIT");
      return sectionResult.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw new Error("Failed to create FAQ section");
    } finally {
      client.release();
    }
  },

  /** ✅ Update FAQ Section + replace items */
  async updateFaqSection(id: string, data: Partial<IFaqSection>) {
    await checkFaqSectionExists(id);
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      await client.query(
        `UPDATE faq_sections SET
          section_tag = COALESCE($1, section_tag),
          section_title = COALESCE($2, section_title),
          section_description = COALESCE($3, section_description),
          contact_image = COALESCE($4, contact_image),
          contact_alt = COALESCE($5, contact_alt),
          contact_heading = COALESCE($6, contact_heading),
          contact_description = COALESCE($7, contact_description),
          contact_name = COALESCE($8, contact_name),
          contact_position = COALESCE($9, contact_position),
          contact_link = COALESCE($10, contact_link),
          is_active = COALESCE($11, is_active),
          updated_at = NOW()
        WHERE id = $12`,
        [
          data.section_tag,
          data.section_title,
          data.section_description,
          data.contact_image,
          data.contact_alt,
          data.contact_heading,
          data.contact_description,
          data.contact_name,
          data.contact_position,
          data.contact_link,
          data.is_active,
          id,
        ]
      );

      if (data.faqs) {
        await client.query(`DELETE FROM faq_items WHERE faq_section_id = $1`, [
          id,
        ]);

        for (const item of data.faqs) {
          await faqItemService.createFaqItem(client, id, item);
        }
      }

      await client.query("COMMIT");
      return { message: "FAQ section updated successfully" };
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw new Error("Failed to update FAQ section");
    } finally {
      client.release();
    }
  },

  /** ✅ Get FAQ Sections (by id or tag) */
  async getFaqSections(filter: { id?: string; section_tag?: string }) {
    let query = `SELECT * FROM faq_sections`;
    const values: any[] = [];
    const conditions: string[] = [];

    if (filter.id) {
      values.push(filter.id);
      conditions.push(`id = $${values.length}`);
    }

    if (filter.section_tag) {
      values.push(filter.section_tag);
      conditions.push(`section_tag = $${values.length}`);
    }

    if (conditions.length) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const result = await db.query(query, values);

    for (const section of result.rows) {
      section.faqs = await faqItemService.getFaqItemsBySectionId(section.id);
    }

    return result.rows;
  },

  /** ✅ Delete FAQ Section */
  async deleteFaqSection(id: string) {
    await checkFaqSectionExists(id);
    const result = await db.query(
      `DELETE FROM faq_sections WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },
};
