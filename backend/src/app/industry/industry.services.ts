/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";

import { errorLogger } from "../../logger/logger";

const checkSectionExists = async (id: string) => {
  const res = await db.query(`SELECT 1 FROM industry_section WHERE id = $1`, [
    id,
  ]);
  if (res.rowCount === 0) throw new Error("Section not found");
};

export const industryTabsService = {
  /** Create a Section with Tabs and Points */
  async createSection(data: any) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      const existingSection = await client.query(
        `SELECT id FROM industry_section WHERE page = $1 LIMIT 1`,
        [data.page],
      );

      if (existingSection) {
        this.updateSection(data.section_id, data);
      } else {
        // create section
        const sectionRes = await client.query(
          `INSERT INTO industry_section (page, tag, heading_title, paragraph)
           VALUES ($1,$2,$3,$4) RETURNING id`,
          [
            data.page,
            data.tag,
            data.heading_title ?? null,
            data.paragraph ?? null,
          ],
        );
        const sectionId = sectionRes.rows[0].id;

        // create tabs
        for (const tab of data.tabs) {
          const tabRes = await client.query(
            `INSERT INTO industry_tabs 
            (section_id, tab_key, title, description, image, cta_label, cta_link, position)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
            [
              sectionId,
              tab.tab_key,
              tab.title,
              tab.description,
              tab.image,
              tab.cta.label,
              tab.cta.link,
              tab.position,
            ],
          );

          const tabId = tabRes.rows[0].id;

          for (const point of tab.offer_points) {
            await client.query(
              `INSERT INTO industry_tab_points (tab_id, point, position)
             VALUES ($1,$2,$3)`,
              [tabId, point.text, point.position],
            );
          }
        }
      }
      await client.query("COMMIT");
      return { message: "Section created successfully" };
    } catch (err) {
      await client.query("ROLLBACK");
      errorLogger.error(err);
      throw new Error("Failed to create section");
    } finally {
      client.release();
    }
  },
  /** Update Section + optional Tabs */
  async updateSection(sectionId: string, data: any) {
    await checkSectionExists(sectionId);
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      await client.query(
        `UPDATE industry_section SET
        heading_title = COALESCE($1, heading_title),
        paragraph = COALESCE($2, paragraph)
       WHERE id = $3`,
        [data.heading_title, data.paragraph, sectionId],
      );

      if (data.tabs) {
        for (const tab of data.tabs) {
          // check if tab exists
          const tabRes = await client.query(
            `SELECT id FROM industry_tabs WHERE section_id = $1 AND tab_key = $2`,
            [sectionId, tab.tab_key],
          );

          let tabId: string;

          if (tabRes?.rowCount && tabRes?.rowCount > 0) {
            // update existing tab
            tabId = tabRes.rows[0].id;
            await client.query(
              `UPDATE industry_tabs SET
              title = $1,
              description = $2,
              image = $3,
              cta_label = $4,
              cta_link = $5,
              position = $6,
              updated_at = NOW()
             WHERE id = $7`,
              [
                tab.title,
                tab.description,
                tab.image,
                tab.cta.label,
                tab.cta.link,
                tab.position,
                tabId,
              ],
            );

            // delete old points
            await client.query(
              `DELETE FROM industry_tab_points WHERE tab_id = $1`,
              [tabId],
            );
          } else {
            // create new tab
            const newTabRes = await client.query(
              `INSERT INTO industry_tabs
              (section_id, tab_key, title, description, image, cta_label, cta_link, position)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
             RETURNING id`,
              [
                sectionId,
                tab.tab_key,
                tab.title,
                tab.description,
                tab.image,
                tab.cta.label,
                tab.cta.link,
                tab.position,
              ],
            );
            tabId = newTabRes.rows[0].id;
          }

          // insert points
          for (const point of tab.offer_points) {
            await client.query(
              `INSERT INTO industry_tab_points (tab_id, point, position) VALUES ($1,$2,$3)`,
              [tabId, point.text, point.position],
            );
          }
        }
      }

      await client.query("COMMIT");
      return { message: "Section updated successfully" };
    } catch (err) {
      await client.query("ROLLBACK");
      errorLogger.error(err);
      throw new Error("Failed to update section");
    } finally {
      client.release();
    }
  },
  /** Get Sections with Tabs and Points */
  async getSections(page?: string) {
    const values: any[] = [];
    let whereClause = "";

    if (page) {
      values.push(page);
      whereClause = "WHERE page = $1";
    }

    /** -------------------------
     *  QUERY 1: SECTIONS
     *  (same page+tag collapse)
     *  ------------------------*/
    const sectionQuery = `
      SELECT DISTINCT ON (page, tag)
        id,
        page,
        tag,
        heading_title,
        paragraph
      FROM industry_section
      ${whereClause}
      ORDER BY page, tag, created_at DESC;
    `;

    const sectionRes = await db.query(sectionQuery, values);
    const sections = sectionRes.rows;

    if (!sections.length) return [];

    /** -------------------------
     *  QUERY 2: TABS + POINTS
     *  ------------------------*/
    const sectionIds = sections.map((s) => s.id);

    const tabQuery = `
      SELECT
        t.section_id,
        json_agg(
          json_build_object(
            'id', t.id,
            'tab_key', t.tab_key,
            'title', t.title,
            'description', t.description,
            'image', t.image,
            'cta', json_build_object(
              'label', t.cta_label,
              'link', t.cta_link
            ),
            'position', t.position,
            'offer_points', COALESCE((
              SELECT json_agg(
                json_build_object(
                  'text', p.point,
                  'position', p.position
                )
                ORDER BY p.position
              )
              FROM industry_tab_points p
              WHERE p.tab_id = t.id
            ), '[]')
          )
          ORDER BY t.position
        ) AS tabs
      FROM industry_tabs t
      WHERE t.section_id = ANY($1)
      GROUP BY t.section_id;
    `;

    const tabRes = await db.query(tabQuery, [sectionIds]);

    /** -------------------------
     *  MERGE DATA
     *  ------------------------*/
    const tabMap = new Map<string, any[]>();
    tabRes.rows.forEach((row) => {
      tabMap.set(row.section_id, row.tabs);
    });

    return sections.map((section) => ({
      section_id: section.id,
      page: section.page,
      tag: section.tag,
      heading_title: section.heading_title,
      paragraph: section.paragraph,
      tabs: tabMap.get(section.id) ?? [],
    }));
  },

  /** Delete section (cascade deletes tabs and points) */
  async deleteSection(sectionId: string) {
    await checkSectionExists(sectionId);
    const res = await db.query(
      `DELETE FROM industry_section WHERE id = $1 RETURNING *`,
      [sectionId],
    );
    return res.rows[0];
  },
};
