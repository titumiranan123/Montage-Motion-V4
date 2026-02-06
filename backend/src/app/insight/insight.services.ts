/* eslint-disable @typescript-eslint/no-explicit-any */

import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";

export async function createSectionWithSteps(data: any) {
  const { page, tag, heading_title, paragraph, steps } = data;
  const client = await db.connect();
  try {
    const sectionRes = await client.query(
      `
    INSERT INTO insight_section (page, tag, heading_title, paragraph)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [page, tag, heading_title, paragraph],
    );

    const section = sectionRes.rows[0];

    const insertedSteps = [];
    for (const s of steps) {
      const stepRes = await client.query(
        `
      INSERT INTO steps (section_id, step_order, title, heading, description,image, items)
      VALUES ($1, $2, $3, $4, $5, $6,$7)
      RETURNING *
      `,
        [
          section.id,
          s.step_order,
          s.title,
          s.heading,
          s.description,
          s.image,
          JSON.stringify(s.items),
        ],
      );
      insertedSteps.push(stepRes.rows[0]);
    }
    await client.query("COMMIT");
    return { ...section, steps: insertedSteps };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function getSectionByPage(page: string) {
  const res = await db.query(
    `
    SELECT
      s.id,
      s.page,
      s.tag,
      s.heading_title,
      s.paragraph,
      json_agg(
        json_build_object(
          'id', st.id,
          'step_order', st.step_order,
          'title', st.title,
          'heading', st.heading,
          'description', st.description,
          'image', st.image,
          'items', st.items
        ) ORDER BY st.step_order
      ) AS steps
    FROM insight_section s
    LEFT JOIN steps st ON st.section_id = s.id
    WHERE s.page = $1
    GROUP BY s.id
    `,
    [page],
  );

  return res.rows;
}

export async function updateSectionById(sectionId: string, data: any) {
  const { heading_title, tag, paragraph, steps } = data;
  const client = await db.connect();
  try {
    await client.query(
      `
      UPDATE insight_section
      SET heading_title = $1,
          paragraph = $2,
          tag = $3
      WHERE id = $4
      `,
      [heading_title, paragraph, tag, data?.id],
    );

    // 2️⃣ Delete existing steps
    await client.query(`DELETE FROM steps WHERE section_id = $1`, [sectionId]);

    // 3️⃣ Insert new steps one by one
    for (const s of steps) {
      await client.query(
        `
        INSERT INTO steps (section_id, step_order, title, heading, description,image, items)
        VALUES ($1, $2, $3, $4, $5, $6,$7)
        `,
        [
          sectionId,
          s.step_order,
          s.title,
          s.heading,
          s.description,
          s.image,
          JSON.stringify(s.items),
        ],
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    client.query("ROLLBACK");
    errorLogger.error(error);
  } finally {
    client.release();
  }
}

export async function deleteSectionById(sectionId: string) {
  await db.query(`DELETE FROM insight_section WHERE id = $1`, [sectionId]);
}
