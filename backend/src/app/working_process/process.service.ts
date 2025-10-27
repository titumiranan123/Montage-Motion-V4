import { db } from "../../db/db";
import { ProcessSchema } from "./process.interface";

export const processService = {
  // ✅ CREATE process with steps
  async createProcess(data: ProcessSchema) {
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

    const process = processRes.rows[0];

    // Insert related steps
    if (data.process_steps?.length) {
      for (const step of data.process_steps) {
        await db.query(
          `INSERT INTO process_steps (process_id, icon, title, description, isHiden)
           VALUES ($1, $2, $3, $4, $5)`,
          [process.id, step.icon, step.title, step.description, step.isHiden]
        );
      }
    }

    return await processService.getProcessById(process.id);
  },

  // ✅ GET all processes with steps
  async getAllProcesses() {
    const processesRes = await db.query(
      `SELECT * FROM processes ORDER BY created_at DESC`
    );

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

  // ✅ UPDATE process and its steps
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

    // Replace process steps if provided
    if (data.process_steps?.length) {
      await db.query(`DELETE FROM process_steps WHERE process_id = $1`, [id]);
      for (const step of data.process_steps) {
        await db.query(
          `INSERT INTO process_steps (process_id, icon, title, description, isHiden)
           VALUES ($1, $2, $3, $4, $5)`,
          [id, step.icon, step.title, step.description, step.isHiden]
        );
      }
    }

    return await processService.getProcessById(id);
  },

  // ✅ DELETE process (cascade removes steps)
  async deleteProcess(id: string) {
    const result = await db.query(
      `DELETE FROM processes WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  },
};
