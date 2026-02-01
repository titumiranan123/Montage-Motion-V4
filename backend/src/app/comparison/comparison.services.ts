/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";

const checkColumnExists = async (id: string) => {
  const res = await db.query(`SELECT 1 FROM comparisons WHERE id=$1`, [id]);
  if (res.rowCount === 0) throw new Error("Comparison column not found");
};

export const comparisonService = {
  /** ✅ Create comparison */
  async createComparison(data: any) {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // Insert comparison first
      const resComparison = await client.query(
        `INSERT INTO comparisons (page, tag, heading_title, paragraph)
         VALUES ($1,$2,$3,$4)
         RETURNING id`,
        [data.page, data.tag, data.heading_title, data.paragraph],
      );

      const comparisonId = resComparison.rows[0].id;

      // Insert columns
      for (const column of data.columns) {
        const resCol = await client.query(
          `INSERT INTO comparison_columns
            (section_id, type, title, image, bonus_title)
           VALUES ($1,$2,$3,$4,$5)
           RETURNING id`,
          [
            comparisonId,
            column.type,
            column.title ?? null,
            column.image ?? null,
            column.bonus_title ?? null,
          ],
        );

        const columnId = resCol.rows[0].id;

        for (const entry of column.entries) {
          if (entry.entry_type === "bonus" && column.type !== "montage") {
            throw new Error("Bonus entries allowed only for montage columns");
          }

          await client.query(
            `INSERT INTO comparison_entries
              (column_id, entry_type, text, position)
             VALUES ($1,$2,$3,$4)`,
            [columnId, entry.entry_type, entry.text, entry.position],
          );
        }
      }

      await client.query("COMMIT");
      return { message: "Comparison created successfully" };
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw new Error("Failed to create comparison");
    } finally {
      client.release();
    }
  },

  /** ✅ Update single column */
  async updateComparison(comparisonId: string, data: any) {
    await checkColumnExists(comparisonId);
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      // Update comparison table
      await client.query(
        `UPDATE comparisons SET
           page = COALESCE($1, page),
           tag = COALESCE($2, tag),
           heading_title = COALESCE($3, heading_title),
           paragraph = COALESCE($4, paragraph)
         WHERE id = $5`,
        [data.page, data.tag, data.heading_title, data.paragraph, comparisonId],
      );

      // Update columns and entries
      for (const column of data.columns) {
        await client.query(
          `UPDATE comparison_columns SET
             type = COALESCE($1, type),
             title = COALESCE($2, title),
             image = COALESCE($3, image),
             bonus_title = COALESCE($4, bonus_title),
             updated_at = NOW()
           WHERE id = $5`,
          [
            column.type,
            column.title,
            column.image,
            column.bonus_title,
            column.id,
          ],
        );

        if (column.entries) {
          await client.query(
            `DELETE FROM comparison_entries WHERE column_id=$1`,
            [column.id],
          );

          // Reinsert entries with sequential positions
          for (let i = 0; i < column.entries.length; i++) {
            const entry = column.entries[i];
            await client.query(
              `INSERT INTO comparison_entries
                 (column_id, entry_type, text, position)
               VALUES ($1, $2, $3, $4)`,
              [column.id, entry.entry_type, entry.text, i + 1],
            );
          }
        }
      }

      await client.query("COMMIT");
      return { message: "Comparison updated successfully" };
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw new Error("Failed to update comparison");
    } finally {
      client.release();
    }
  },
  /** ✅ Get comparisons by page */
  async getComparisons(page?: string) {
    let query = `SELECT * FROM comparisons`;
    const values: any[] = [];

    if (page) {
      query += ` WHERE page = $1`;
      values.push(page);
    }

    const comparisonsRes = await db.query(query, values);
    if (!comparisonsRes.rows.length) return null;

    const results = [];

    for (const cmp of comparisonsRes.rows) {
      const columnsRes = await db.query(
        `SELECT * FROM comparison_columns WHERE section_id=$1 ORDER BY created_at`,
        [cmp.id],
      );

      const columns = [];
      for (const col of columnsRes.rows) {
        const entriesRes = await db.query(
          `SELECT id, entry_type, text, position FROM comparison_entries WHERE column_id=$1 ORDER BY position`,
          [col.id],
        );

        columns.push({
          id: col.id,
          type: col.type,
          title: col.title,
          image: col.image,
          bonus_title: col.bonus_title,
          entries: entriesRes.rows,
        });
      }

      results.push({
        id: cmp.id,
        page: cmp.page,
        tag: cmp.tag,
        heading_title: cmp.heading_title,
        paragraph: cmp.paragraph,
        columns,
      });
    }

    return results;
  },

  /** ✅ Delete column */
  async deleteComparison(columnId: string) {
    await checkColumnExists(columnId);
    const res = await db.query(
      `DELETE FROM comparison_columns WHERE id=$1 RETURNING *`,
      [columnId],
    );
    return res.rows[0];
  },
};
