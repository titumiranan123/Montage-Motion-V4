import { db } from "../../db/db";
import { ProcessSchema } from "./process.interface";

export const processService = {
  // ✅ CREATE process with its steps
  async createProcess(data: ProcessSchema) {
    // Check if a process already exists for given type
    const existingRes = await db.query(
      `SELECT * FROM processes WHERE type = $1 LIMIT 1`,
      [data.type]
    );

    const existingProcess = existingRes.rows[0];
    let process;

    if (!existingProcess) {
      // Insert new process
      const processRes = await db.query(
        `INSERT INTO processes (type, tag, heading_part1, heading_part2, paragraph, image, alt)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          data.type,
          data.tag,
          data.heading_part1,
          data.heading_part2,
          data.paragraph,
          data.image,
          data.alt,
        ]
      );

      process = processRes.rows[0];

      // Insert related steps (if provided)
      if (data.process_steps?.length) {
        for (const step of data.process_steps) {
          await db.query(
            `INSERT INTO process_steps (process_id, icon, alt, title, description, isHiden)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              process.id,
              step.icon,
              step.alt,
              step.title,
              step.description,
              step.isHiden ?? false,
            ]
          );
        }
      }
    } else {
      // Update existing process if fields provided
      await db.query(
        `UPDATE processes 
         SET tag = COALESCE($1, tag),
             heading_part1 = COALESCE($2, heading_part1),
             heading_part2 = COALESCE($3, heading_part2),
             paragraph = COALESCE($4, paragraph),
             image = COALESCE($5, image),
             alt = COALESCE($6, alt),
             updated_at = NOW()
         WHERE type = $7`,
        [
          data.tag,
          data.heading_part1,
          data.heading_part2,
          data.paragraph,
          data.type,
          data.image,
          data.alt,
        ]
      );

      // Reload updated process
      const updated = await db.query(
        `SELECT * FROM processes WHERE type = $1`,
        [data.type]
      );
      process = updated.rows[0];

      // Replace existing steps (if new ones provided)
      if (data.process_steps?.length) {
        await db.query(`DELETE FROM process_steps WHERE process_id = $1`, [
          process.id,
        ]);

        for (const step of data.process_steps) {
          await db.query(
            `INSERT INTO process_steps (process_id, icon, alt, title, description, isHiden)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              process.id,
              step.icon,
              step.alt,
              step.title,
              step.description,
              step.isHiden ?? false,
            ]
          );
        }
      }
    }

    return await processService.getProcessById(process.id);
  },

  // ✅ GET all processes with their steps
  async getAllProcesses(query: { type?: string }) {
    let baseQuery = `SELECT * FROM processes`;
    const conditions: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any[] = [];

    if (query.type) {
      values.push(query.type);
      conditions.push(`type = $${values.length}`);
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join(" AND ");
    }

    baseQuery += ` ORDER BY created_at ASC`;

    const processesRes = await db.query(baseQuery, values);

    const processes = [];
    for (const process of processesRes.rows) {
      const stepsRes = await db.query(
        `SELECT * FROM process_steps WHERE process_id = $1 ORDER BY title ASC`,
        [process.id]
      );
      processes.push({ ...process, process_steps: stepsRes.rows });
    }

    return processes;
  },

  // ✅ GET single process by id
  async getProcessById(id: string) {
    const processRes = await db.query(`SELECT * FROM processes WHERE id = $1`, [
      id,
    ]);
    if (!processRes.rows[0]) return null;

    const stepsRes = await db.query(
      `SELECT * FROM process_steps WHERE process_id = $1 ORDER BY title ASC`,
      [id]
    );

    return { ...processRes.rows[0], process_steps: stepsRes.rows };
  },

  // ✅ UPDATE process and steps
  async updateProcess(id: string, data: Partial<ProcessSchema>) {
    const existing = await processService.getProcessById(id);
    if (!existing) throw new Error("Process not found");

    await db.query(
      `UPDATE processes
       SET type = $1,
           tag = $2,
           heading_part1 = $3,
           heading_part2 = $4,
           paragraph = $5,
           image = $6,
           alt = $7,
           updated_at = NOW()
       WHERE id = $8`,
      [
        data.type ?? existing.type,
        data.tag ?? existing.tag,
        data.heading_part1 ?? existing.heading_part1,
        data.heading_part2 ?? existing.heading_part2,
        data.paragraph ?? existing.paragraph,
        data.image ?? existing.image,
        data.alt ?? existing.alt,
        id,
      ]
    );

    if (data.process_steps?.length) {
      await db.query(`DELETE FROM process_steps WHERE process_id = $1`, [id]);
      for (const step of data.process_steps) {
        await db.query(
          `INSERT INTO process_steps (process_id, icon, alt, title, description, isHiden)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            id,
            step.icon,
            step.alt,
            step.title,
            step.description,
            step.isHiden ?? false,
          ]
        );
      }
    }

    return await processService.getProcessById(id);
  },

  // ✅ DELETE process (cascade removes steps automatically)
  async deleteProcess(id: string) {
    const result = await db.query(
      `DELETE FROM processes WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  },
};
