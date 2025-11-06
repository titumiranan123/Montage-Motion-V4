/* eslint-disable @typescript-eslint/no-explicit-any */
// serviceSection.service.ts

import { db } from "../../db/db";
import { IServiceSection } from "./page_service.zod";

export const serviceSectionService = {
  async createOrUpdateSection(data: IServiceSection) {
    // 1️⃣ Check if section with same type exists
    const existingRes = await db.query(
      `SELECT * FROM service_sections WHERE type = $1 LIMIT 1`,
      [data.type]
    );
    const existingSection = existingRes?.rows[0];

    let section;

    // 2️⃣ If section exists — decide what to update
    if (existingSection) {
      // If heading/tag/paragraph provided → update section info
      if (
        data.tag ||
        (data.heading_part1 && data.heading_part2) ||
        data.paragraph
      ) {
        await db.query(
          `UPDATE service_sections
           SET tag = COALESCE($1, tag),
               heading_part1 = COALESCE($2, heading_part1),
               heading_part2 = COALESCE($3, heading_part2),
               paragraph = COALESCE($4, paragraph)
           WHERE type = $5`,
          [
            data.tag,
            data.heading_part1,
            data.heading_part2,
            data.paragraph,
            data.type,
          ]
        );
      }

      // Update variable to latest version
      const updated = await db.query(
        `SELECT * FROM service_sections WHERE type = $1`,
        [data.type]
      );
      section = updated.rows[0];

      // 3️⃣ If service items provided → replace old ones with new ones
      if (data.services && data.services.length > 0) {
        await db.query(`DELETE FROM service_items WHERE section_id = $1`, [
          section.id,
        ]);

        for (const item of data.services) {
          await db.query(
            `INSERT INTO service_items (section_id, service_title, service_description, image, alt)
             VALUES ($1, $2, $3, $4, $5)`,
            [
              section.id,
              item.service_title,
              item.service_description,
              item.image,
              item.alt,
            ]
          );
        }
      }
    } else {
      // 4️⃣ If section doesn’t exist → create new
      const sectionRes = await db.query(
        `INSERT INTO service_sections (type, tag, heading_part1, heading_part2, paragraph)
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

      for (const item of data.services || []) {
        await db.query(
          `INSERT INTO service_items (section_id, service_title, service_description, image, alt)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            section.id,
            item.service_title,
            item.service_description,
            item.image,
            item.alt,
          ]
        );
      }
    }

    // 5️⃣ Return final section data
    return await serviceSectionService.getSectionById(section.id);
  },
  async getAllSections(query: { type?: string }) {
    let baseQuery = `SELECT * FROM service_sections`;
    const conditions: string[] = [];
    const values: any[] = [];

    if (query.type) {
      values.push(query.type);
      conditions.push(`type = $${values.length}`);
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join(" AND ");
    }

    baseQuery += ` ORDER BY id ASC `;

    const sectionsRes = await db.query(baseQuery, values);
    const sections = [];

    for (const section of sectionsRes.rows) {
      const itemsRes = await db.query(
        `SELECT * FROM service_items WHERE section_id = $1 ORDER BY id ASC`,
        [section.id]
      );
      sections.push({ ...section, services: itemsRes.rows });
    }

    return sections;
  },

  async getSectionById(id: number) {
    const sectionRes = await db.query(
      `SELECT * FROM service_sections WHERE id = $1`,
      [id]
    );
    if (!sectionRes.rows[0]) return null;

    const itemsRes = await db.query(
      `SELECT * FROM service_items WHERE section_id = $1 ORDER BY id ASC`,
      [id]
    );

    return { ...sectionRes.rows[0], services: itemsRes.rows };
  },

  async updateSection(id: number, data: Partial<IServiceSection>) {
    const existing = await serviceSectionService.getSectionById(id);
    if (!existing) throw new Error("Service section not found");

    await db.query(
      `UPDATE service_sections
       SET type = $1, tag = $2, heading_part1 = $3, heading_part2 = $4, paragraph = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [
        data.type ?? existing.type,
        data.tag ?? existing.tag,
        existing.heading_part1,
        existing.heading_part2,
        data.paragraph ?? existing.paragraph,
        id,
      ]
    );

    // Update service items (replace for simplicity)
    if (data.services?.length) {
      await db.query(`DELETE FROM service_items WHERE section_id = $1`, [id]);
      for (const item of data.services) {
        await db.query(
          `INSERT INTO service_items (section_id, service_title, service_description, image, alt)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            id,
            item.service_title,
            item.service_description,
            item.image,
            item.alt,
          ]
        );
      }
    }

    return await serviceSectionService.getSectionById(id);
  },

  async deleteSection(id: number) {
    // 1️⃣ Delete related service_items first
    await db.query(`DELETE FROM service_items WHERE section_id = $1`, [id]);
    // 2️⃣ Then delete the section itself
    const result = await db.query(
      `DELETE FROM service_sections WHERE id = $1 RETURNING *`,
      [id]
    );

    return result.rows[0] || null;
  },
};
