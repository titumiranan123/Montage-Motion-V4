/* eslint-disable @typescript-eslint/no-explicit-any */
// serviceSection.service.ts

import { db } from "../../db/db";
import { IServiceSection } from "./page_service.zod";

import { createSection, createServiceItem } from "./pageServiceutils";

export const serviceSectionService = {
  async createOrUpdateSection(data: IServiceSection) {
    const client = await db.connect();
    // 1️⃣ Check if section with same type exists
    const existingRes = await client.query(
      `SELECT * FROM service_sections WHERE type = $1 LIMIT 1`,
      [data.type]
    );
    const existingSection = existingRes?.rows[0];

    let section;

    // 2️⃣ If section exists — decide what to update
    if (existingSection) {
      // console.log(existingSection, "existingSection");
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
        await createServiceItem(client, data?.services, section.id, data.type);
      }
    } else {
      // 4️⃣ If section doesn’t exist → create new
      const sectionId = await createSection(client, data);
      await createServiceItem(client, data?.services, sectionId, data.type);
    }

    // 5️⃣ Return final section data
    return;
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

    baseQuery += ` ORDER BY id ASC`;

    const sectionsRes = await db.query(baseQuery, values);
    const sections = [];

    for (const section of sectionsRes.rows) {
      const itemsRes = await db.query(
        `SELECT * FROM service_items WHERE section_id = $1 ORDER BY position ASC`,
        [section.id]
      );

      const services = [];

      for (const item of itemsRes.rows) {
        // 🔹 প্রতিটি service item এর available_section আনো
        const availableSectionsRes = await db.query(
          `SELECT section_name, visible FROM service_item_sections WHERE service_item_id = $1`,
          [item.id]
        );

        services.push({
          ...item,
          available_section: availableSectionsRes.rows,
        });
      }

      sections.push({
        ...section,
        services,
      });
    }
    return sections;
  },
  async getAllSectionsType() {
    const baseQuery = `SELECT id FROM service_sections WHERE type = $1 `;

    const sectionsRes = await db.query(baseQuery, ["home"]);
    let sectionsType;
    for (const section of sectionsRes.rows) {
      const itemsRes = await db.query(
        `SELECT service_title, service_type , href FROM service_items WHERE section_id = $1 ORDER BY position ASC`,
        [section.id]
      );
      // const siplified = Object.values(itemsRes.rows).map(
      //   (item) => item.service_type
      // );
      sectionsType = [
        { service_title: "Home", service_type: "home" },
        ...itemsRes.rows,
      ];
    }
    return sectionsType;
  },
  async getAllTypepageSection() {
    const baseQuery = `SELECT id FROM service_sections WHERE type = $1 `;

    const sectionsRes = await db.query(baseQuery, ["home"]);
    let sectionsType;
    for (const section of sectionsRes.rows) {
      const itemsRes = await db.query(
        `SELECT * FROM service_items WHERE section_id = $1 ORDER BY position ASC`,
        [section.id]
      );
      // const siplified = Object.values(itemsRes.rows).map(
      //   (item) => item.service_type
      // );
      sectionsType = [
        { service_title: "Home", service_type: "home" },
        ...itemsRes.rows,
      ];
    }
    return sectionsType;
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
