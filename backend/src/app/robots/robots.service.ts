import { db } from "../../db/db";

export const robotsService = {
  async createRobot(data: string) {
    await db.query(`DELETE FROM site_robots`);
    const result = await db.query(
      `INSERT INTO site_robots (content) VALUES($1) `,
      [data ?? ""]
    );
    return result.rows[0];
  },
  async getRobot() {
    const result = await db.query(`SELECT * FROM  site_robots `);
    return result.rows[0];
  },
};
