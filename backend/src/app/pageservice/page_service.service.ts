// serviceSection.service.ts

import { db } from "../../db/db";
import { IServiceSection } from "./page_service.zod";

export const serviceSectionService = {
  async createSection(data: IServiceSection) {
    // Insert section
    const sectionRes = await db.query(
      `INSERT INTO service_sections (type, tag, heading_part1, heading_part2, paragraph)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [data.type, data.tag, data.heading[0], data.heading[1], data.paragraph]
    );
    const section = sectionRes.rows[0];

    // Insert service items
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

    return await serviceSectionService.getSectionById(section.id);
  },

  async getAllSections() {
    const sectionsRes = await db.query(
      `SELECT * FROM service_sections ORDER BY id ASC`
    );
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
        data.heading?.[0] ?? existing.heading_part1,
        data.heading?.[1] ?? existing.heading_part2,
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
    const result = await db.query(
      `DELETE FROM service_sections WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  },
};
