/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { IWhychooseusSection } from "./whychooseus.zod";

export const whychooseusSectionService = {
  async createOrUpdateSection(data: IWhychooseusSection) {
    const existingRes = await db.query(
      `SELECT * FROM whychooseus_sections WHERE type = $1 LIMIT 1`,
      [data.type]
    );
    const existingSection = existingRes?.rows[0];
    let section;

    if (existingSection) {
      await db.query(
        `UPDATE whychooseus_sections
           SET tag = COALESCE($1, tag),
               heading_part1 = COALESCE($2, heading_part1),
               heading_part2 = COALESCE($3, heading_part2),
               paragraph = COALESCE($4, paragraph),
               updated_at = NOW()
           WHERE type = $5`,
        [
          data.tag,
          data.heading_part1,
          data.heading_part2,
          data.paragraph,
          data.type,
        ]
      );

      const updated = await db.query(
        `SELECT * FROM whychooseus_sections WHERE type = $1`,
        [data.type]
      );
      section = updated.rows[0];

      if (data.whychooseus_items && data.whychooseus_items.length > 0) {
        await db.query(
          `DELETE FROM whychooseus_items WHERE whychooseus_id = $1`,
          [section.id]
        );

        for (const item of data.whychooseus_items) {
          await db.query(
            `INSERT INTO whychooseus_items (whychooseus_id, title, description, icon, alt, position)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              section.id,
              item.title,
              item.description,
              item.icon,
              item.alt,
              item.position ?? 0,
            ]
          );
        }
      }
    } else {
      // new whychoose us
      const sectionRes = await db.query(
        `INSERT INTO whychooseus_sections (type, tag, heading_part1, heading_part2, paragraph)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          data.type,
          data.tag,
          data.heading_part1,
          data.heading_part2,
          data.paragraph,
        ]
      );
      section = sectionRes.rows[0];

      for (const item of data.whychooseus_items || []) {
        await db.query(
          `INSERT INTO whychooseus_items (whychooseus_id, title, description, icon, alt, position)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            section.id,
            item.title,
            item.description,
            item.icon,
            item.alt,
            item.position ?? 0,
          ]
        );
      }
    }

    return await whychooseusSectionService.getSectionById(section.id);
  },

  async getAllSections(query: { type?: string }) {
    let baseQuery = `SELECT * FROM whychooseus_sections`;
    const conditions: string[] = [];
    const values: any[] = [];

    if (query.type) {
      values.push(query.type);
      conditions.push(`type = $${values.length}`);
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join(" AND ");
    }

    baseQuery += ` ORDER BY id ASC`;

    const sectionsRes = await db.query(baseQuery, values);
    const sections = [];

    for (const section of sectionsRes.rows) {
      const itemsRes = await db.query(
        `SELECT * FROM whychooseus_items WHERE whychooseus_id = $1 ORDER BY position ASC`,
        [section.id]
      );
      sections.push({ ...section, whychooseus_items: itemsRes.rows });
    }

    return sections;
  },

  async getSectionById(id: string) {
    const sectionRes = await db.query(
      `SELECT * FROM whychooseus_sections WHERE id = $1`,
      [id]
    );
    if (!sectionRes.rows[0]) return null;

    const itemsRes = await db.query(
      `SELECT * FROM whychooseus_items WHERE whychooseus_id = $1 ORDER BY position ASC`,
      [id]
    );

    return { ...sectionRes.rows[0], whychooseus_items: itemsRes.rows };
  },

  async updateSection(id: string, data: Partial<IWhychooseusSection>) {
    const existing = await whychooseusSectionService.getSectionById(id);
    if (!existing) throw new Error("Why Choose Us section not found");

    await db.query(
      `UPDATE whychooseus_sections
       SET type = $1, tag = $2, heading_part1 = $3, heading_part2 = $4, paragraph = $5, updated_at = NOW()
       WHERE id = $6`,
      [
        data.type ?? existing.type,
        data.tag ?? existing.tag,
        data.heading_part1 ?? existing.heading_part1,
        data.heading_part2 ?? existing.heading_part2,
        data.paragraph ?? existing.paragraph,
        id,
      ]
    );

    if (data.whychooseus_items?.length) {
      await db.query(
        `DELETE FROM whychooseus_items WHERE whychooseus_id = $1`,
        [id]
      );
      for (const item of data.whychooseus_items) {
        await db.query(
          `INSERT INTO whychooseus_items (whychooseus_id, title, description, icon, alt, position)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            id,
            item.title,
            item.description,
            item.icon,
            item.alt,
            item.position ?? 0,
          ]
        );
      }
    }

    return await whychooseusSectionService.getSectionById(id);
  },

  async deleteSection(id: string) {
    await db.query(`DELETE FROM whychooseus_items WHERE whychooseus_id = $1`, [
      id,
    ]);
    const result = await db.query(
      `DELETE FROM whychooseus_sections WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  },
};
