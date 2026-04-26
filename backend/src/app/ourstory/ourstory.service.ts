/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { StorySchema } from "./ourstory.interface";

export const ourstoryService = {
  // UPSERT (create বা update by type)
  async upsertStory(data: StorySchema) {
    const existingRes = await db.query(
      `SELECT * FROM ourstory WHERE type = $1 LIMIT 1`,
      [data.type],
    );
    let story = existingRes.rows[0];

    // CREATE
    if (!story) {
      const res = await db.query(
        `INSERT INTO ourstory
        (type, tag, heading_part1, heading_part2, paragraph, image, alt)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
        [
          data.type,
          data.tag,
          data.heading_part1,
          data.heading_part2,
          data.paragraph,
          data.image,
          data.alt,
        ],
      );
      story = res.rows[0];
    }

    // UPDATE
    else {
      await db.query(
        `UPDATE ourstory SET
          tag=$1,
          heading_part1=$2,
          heading_part2=$3,
          paragraph=$4,
          image=$5,
          alt=$6,
          updated_at=NOW()
        WHERE id=$7`,
        [
          data.tag,
          data.heading_part1,
          data.heading_part2,
          data.paragraph,
          data.image,
          data.alt,
          story.id,
        ],
      );
    }

    // STEPS replace
    if (data.ourstory_steps?.length) {
      await db.query(`DELETE FROM ourstory_steps WHERE story_id=$1`, [
        story.id,
      ]);

      for (const step of data.ourstory_steps) {
        await db.query(
          `INSERT INTO ourstory_steps
          (story_id,  image, alt, title, description, is_hidden, order_index)
          VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [
            story.id,
            step.image,
            step.alt,
            step.title,
            step.description,
            step.is_hidden ?? false,
            step.order_index ?? 0,
          ],
        );
      }
    }

    return this.getStoryById(story.id);
  },

  async getAllStories(query: { type?: string }) {
    let sql = `SELECT * FROM ourstory`;
    const values: any[] = [];

    if (query.type) {
      values.push(query.type);
      sql += ` WHERE type=$1`;
    }

    sql += ` ORDER BY created_at ASC`;

    const res = await db.query(sql, values);

    const result = [];
    for (const story of res.rows) {
      const steps = await db.query(
        `SELECT * FROM ourstory_steps 
         WHERE story_id=$1 
         ORDER BY order_index ASC`,
        [story.id],
      );

      result.push({ ...story, ourstory_steps: steps.rows });
    }

    return result;
  },

  async getStoryById(id: string) {
    const res = await db.query(
      `SELECT * FROM ourstory WHERE id=$1`,
      [id],
    );

    if (!res.rows[0]) return null;

    const steps = await db.query(
      `SELECT * FROM ourstory_steps 
       WHERE story_id=$1 
       ORDER BY order_index ASC`,
      [id],
    );

    return { ...res.rows[0], steps: steps.rows };
  },

  async updateStory(id: string, data: Partial<StorySchema>) {
    const existing = await this.getStoryById(id);
    if (!existing) throw new Error("Story not found");

    await db.query(
      `UPDATE ourstory SET
        type=$1,
        tag=$2,
        heading_part1=$3,
        heading_part2=$4,
        paragraph=$5,
        image=$6,
        alt=$7,
        updated_at=NOW()
      WHERE id=$8`,
      [
        data.type ?? existing.type,
        data.tag ?? existing.tag,
        data.heading_part1 ?? existing.heading_part1,
        data.heading_part2 ?? existing.heading_part2,
        data.paragraph ?? existing.paragraph,
        data.image ?? existing.image,
        data.alt ?? existing.alt,
        id,
      ],
    );

    if (data.ourstory_steps?.length) {
      await db.query(`DELETE FROM ourstory_steps WHERE story_id=$1`, [id]);

      for (const step of data.ourstory_steps) {
        await db.query(
          `INSERT INTO ourstory_steps
          (story_id, image, alt, title, description, is_hidden, order_index)
          VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [
            id,
      
            step.image,
            step.alt,
            step.title,
            step.description,
            step.is_hidden ?? false,
            step.order_index ?? 0,
          ],
        );
      }
    }

    return this.getStoryById(id);
  },

  async deleteStory(id: string) {
    const res = await db.query(
      `DELETE FROM ourstory WHERE id=$1 RETURNING *`,
      [id],
    );
    return res.rows[0] || null;
  },
};