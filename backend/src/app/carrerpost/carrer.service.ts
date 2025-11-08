/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { IJobpost } from "./carrer.interface";

export const careerPageService = {
  /** ✅ Create or update page & its job posts (auto upsert by type) */
  async upsertCareerPage(data: IJobpost) {
    await db.query("BEGIN");
    try {
      // 1️⃣ Check if page exists
      const existingRes = await db.query(
        `SELECT id FROM career_pages WHERE type = $1`,
        [data.type]
      );

      let pageId: string;

      if (existingRes.rowCount) {
        // Update existing page
        pageId = existingRes.rows[0].id;
        await db.query(
          `
          UPDATE career_pages
          SET tag = $1,
              heading_part1 = $2,
              heading_part2 = $3,
              paragraph = $4,
              updated_at = NOW()
          WHERE id = $5
          `,
          [
            data.tag,
            data.heading_part1,
            data.heading_part2,
            data.paragraph,
            pageId,
          ]
        );
      } else {
        // Create new page
        const insertRes = await db.query(
          `
          INSERT INTO career_pages (type, tag, heading_part1, heading_part2, paragraph)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id
          `,
          [
            data.type,
            data.tag,
            data.heading_part1,
            data.heading_part2,
            data.paragraph,
          ]
        );
        pageId = insertRes.rows[0].id;
      }

      // 2️⃣ Get existing job posts for this page
      const existingJobsRes = await db.query(
        `SELECT id FROM job_posts WHERE career_page_id = $1`,
        [pageId]
      );
      const existingJobIds = existingJobsRes.rows.map((r) => r.id);
      const receivedJobIds = data.jobposts
        .filter((j: any) => !!j.id)
        .map((j: any) => j.id);

      // 3️⃣ Delete jobs that are missing in incoming data
      const jobsToDelete = existingJobIds.filter(
        (id) => !receivedJobIds.includes(id)
      );
      if (jobsToDelete.length) {
        await db.query(`DELETE FROM job_posts WHERE id = ANY($1::uuid[])`, [
          jobsToDelete,
        ]);
      }

      // 4️⃣ Upsert jobs
      for (const job of data.jobposts) {
        let jobId = job.id;

        // 🧩 Fix salary (handle both object and string)
        let salaryData = null;
        if (job.salary) {
          if (typeof job.salary === "string") {
            try {
              salaryData = JSON.parse(job.salary);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err: any) {
              salaryData = null;
            }
          } else {
            salaryData = job.salary;
          }
        }

        // ✅ Now salaryData is always a valid JS object or null
        const salaryJson = salaryData ? JSON.stringify(salaryData) : null;

        if (jobId && existingJobIds.includes(jobId)) {
          // Update existing job
          await db.query(
            `
            UPDATE job_posts
            SET
              job_title = $1,
              positions_available = $2,
              deadline = $3,
              description = $4,
              employment_type = $5,
              work_arrangement = $6,
              salary = $7,
              applylink = $8,
              updated_at = NOW()
            WHERE id = $9
            `,
            [
              job.job_title,
              job.positions_available,
              job.deadline,
              job.description,
              job.employment_type,
              job.work_arrangement,
              salaryJson,
              job.applylink,
              jobId,
            ]
          );
        } else {
          // Insert new job
          const insertJob = await db.query(
            `
            INSERT INTO job_posts (
              career_page_id, job_title, positions_available, deadline,
              description, employment_type, work_arrangement, salary, applylink
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING id
            `,
            [
              pageId,
              job.job_title,
              job.positions_available,
              job.deadline,
              job.description,
              job.employment_type,
              job.work_arrangement,
              salaryJson,
              job.applylink,
            ]
          );
          jobId = insertJob.rows[0].id;
        }
      }

      await db.query("COMMIT");

      // 5️⃣ Return the full page with jobs
      const result = await this.getCareerPageByType();
      return result;
    } catch (err) {
      await db.query("ROLLBACK");
      throw err;
    }
  },

  /** ✅ Get full page with all job posts */
  async getCareerPageByType() {
    let baseQuery = `SELECT * FROM career_pages`;
    const values: any[] = [];
    // if (query?.type) {
    //   values.push(query.type);
    //   baseQuery += ` WHERE type = $${values.length}`;
    // }

    baseQuery += ` ORDER BY id ASC`;

    const pageRes = await db.query(baseQuery, values);
    if (!pageRes.rowCount) return [];

    const page = pageRes.rows[0];

    const jobRes = await db.query(
      `SELECT * FROM job_posts WHERE career_page_id = $1 ORDER BY created_at DESC`,
      [page.id]
    );

    page.jobposts = jobRes.rows.map((j) => ({
      ...j,
      salary: j.salary ? j.salary : null,
    }));

    return page;
  },

  /** ✅ Delete entire career page (cascade) */
  async deleteCareerPage(type: string) {
    const res = await db.query(`SELECT id FROM career_pages WHERE type = $1`, [
      type,
    ]);
    if (!res.rowCount) throw new Error("Career page not found");

    const id = res.rows[0].id;
    await db.query(`DELETE FROM career_pages WHERE id = $1`, [id]);
    return {
      message: "Career page and related job posts deleted successfully",
    };
  },

  /** ✅ Delete single job post */
  async deleteSingleJob(id: string) {
    const check = await db.query(`SELECT id FROM job_posts WHERE id = $1`, [
      id,
    ]);
    if (!check.rowCount) throw new Error("Job not found");

    await db.query(`DELETE FROM job_posts WHERE id = $1`, [id]);
    return { message: "Job post deleted successfully" };
  },
};
