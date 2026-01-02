import { db } from "../../db/db";
import { pageHeaderService } from "../header/header.services";

// Helper function to fetch data for each section
export const fetchSectionData = async (sectionName: string, type: string) => {
  switch (sectionName) {
    case "short-hero": {
      const header = await pageHeaderService.getAllHeaders(type as string);
      return { sectionName, data: header || null };
    }

    case "work": {
      const works = await db.query(
        `SELECT thumbnail, video_link FROM Works WHERE type = $1 AND is_visible = true ORDER BY position ASC LIMIT 6`,
        [type]
      );
      return { sectionName, data: works.rows || [] };
    }

    case "testimonial": {
      const testimonials = await db.query(
        `SELECT * FROM testimonials WHERE type = $1`,
        ["home"]
      );
      return { sectionName, data: testimonials.rows || [] };
    }

    // case "faq": {
    //   const faqRes = await db.query(
    //     `SELECT id, title, sub_title FROM faqs WHERE type = $1 AND is_visible = true`,
    //     [type]
    //   );
    //   const faq = faqRes.rows[0];
    //   if (!faq) return { sectionName, data: null };
    //   const faqItems = await db.query(
    //     `SELECT * FROM faq_items WHERE faq_id = $1 ORDER BY position ASC`,
    //     [faq.id]
    //   );
    //   faq.faqs = faqItems.rows;
    //   return { sectionName, data: faq };
    // }

    // case "process": {
    //   const processResult = await processService.getAllProcesses({ type });
    //   return {
    //     sectionName,
    //     data: processResult.length > 0 ? processResult[0] : [],
    //   };
    // }

    // case "whychooseus": {
    //   const whychooseusResult = await whychooseusSectionService.getAllSections({
    //     type,
    //   });
    //   return {
    //     sectionName,
    //     data: whychooseusResult.length > 0 ? whychooseusResult[0] : [],
    //   };
    // }

    // case "common_contact":
    //   return { sectionName, data: {} };

    default:
      return { sectionName, data: null };
  }
};
