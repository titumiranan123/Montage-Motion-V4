import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";

export const webservice = async () => {
  try {
    // Get testimonial count
    const testimonialResult = await db.query(
      `SELECT COUNT(*) FROM testimonials`,
    );
    const testimonialCount = parseInt(testimonialResult.rows[0].count);

    // Get full works count
    const fullWorksResult = await db.query(
      `SELECT COUNT(*) FROM works WHERE type = $1`,
      ["full"],
    );
    const fullWorksCount = parseInt(fullWorksResult.rows[0].count);

    // Get shorts works count
    const shortsWorksResult = await db.query(
      `SELECT COUNT(*) FROM works WHERE type = $1`,
      ["shorts"],
    );
    const shortsWorksCount = parseInt(shortsWorksResult.rows[0].count);

    return {
      testimonialCount,
      fullWorksCount,
      shortsWorksCount,
    };
  } catch (error) {
    errorLogger.error("Error fetching counts:", error);
    throw error;
  }
};
