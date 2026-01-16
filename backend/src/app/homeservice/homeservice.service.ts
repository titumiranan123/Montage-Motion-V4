/* eslint-disable @typescript-eslint/no-explicit-any */
// serviceSection.service.ts

import { db } from "../../db/db";
import { IServiceSection } from "./homeservice.zod";

import { createSection, createServiceItem } from "./homeserviceUtils";

export const homeService = {
  async createOrUpdateSection(data: IServiceSection) {
    const client = await db.connect();

    try {
      await client.query("BEGIN");
      // finding existing service section
      const existingRes = await client.query(
        `SELECT * FROM service_sections WHERE type = $1 LIMIT 1`,
        [data.type]
      );
      let section = existingRes.rows[0];
      if (section) {
        await client.query(
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

        const updated = await client.query(
          `SELECT * FROM service_sections WHERE type = $1`,
          [data.type]
        );
        section = updated.rows[0];
      } else {
        const sectionId = await createSection(client, data);
        const created = await client.query(
          `SELECT * FROM service_sections WHERE id = $1`,
          [sectionId]
        );
        section = created.rows[0];
      }

      if (data.services?.length) {
        await createServiceItem(client, data.services, section.id);
      }
      await client.query("COMMIT");
      return section;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
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
        `SELECT * FROM home_services WHERE section_id = $1 ORDER BY order_index ASC`,
        [section.id]
      );

      const services = [];

      for (const item of itemsRes.rows) {
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
        `SELECT service_title, service_type , href FROM home_services WHERE section_id = $1 ORDER BY order_index ASC`,
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
        `SELECT * FROM home_services WHERE section_id = $1 ORDER BY order_index ASC`,
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
  async deleteSection(id: number) {
    // 1️⃣ Delete related home_services first
    await db.query(`DELETE FROM home_services WHERE section_id = $1`, [id]);
    // 2️⃣ Then delete the section itself
    const result = await db.query(
      `DELETE FROM service_sections WHERE id = $1 RETURNING *`,
      [id]
    );

    return result.rows[0] || null;
  },
};
