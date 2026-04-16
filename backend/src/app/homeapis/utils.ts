import { db } from "../../db/db";
import { comparisonService } from "../comparison/comparison.services";
import { faqService } from "../faq/faq.services";
import { pageHeaderService } from "../header/header.services";
import { getSectionByPage } from "../insight/insight.services";
import { serviceSectionService } from "../pageservice/page_service.service";
import { pricingPageService } from "../pricing/pricing.service";
import { whychooseusSectionService } from "../whychooseus/whychooseus.service";
import { VideosService } from "../work/workservice";
import { processService } from "../working_process/process.service";
// import your SECTION_NAMES array

// Helper function to fetch data for each section
export const fetchSectionData = async (sectionName: string, type: string) => {
  switch (sectionName) {
    case "short_hero":
    case "home_hero":
    case "podcast_hero": {
      const header = await pageHeaderService.getAllHeaders(type);
      return { sectionName, data: header?.[0] || null };
    }

    case "our_clients": {
      const brand = await db.query(
        `SELECT image, alt, width,height FROM brandimage WHERE type = $1 AND ishide = false ORDER BY sortorder ASC`,
        ["home"],
      );

      return { sectionName, data: brand.rows || null };
    }

    case "work": {
      const works = await VideosService.getAllVideosForServicespage({
        type,
        limit: 6,
      });
      return { sectionName, data: works.length < 0 ? works : null };
    }

    case "service": {
      const result = await serviceSectionService.getAllSections({ type });
      return { sectionName, data: result.length > 0 ? result : null };
    }

    case "testimonial": {
      const testimonials = await db.query(
        `SELECT * FROM testimonials WHERE type = $1`,
        ["home"],
      );
      return {
        sectionName,
        data: testimonials.rows.length < 0 ? testimonials.rows : null,
      };
    }

    case "pricing": {
      const result = await pricingPageService.getPagePricePlanByType({ type });
      return { sectionName, data: result.length > 0 ? result : null };
    }

    case "process": {
      const processResult = await processService.getAllProcesses({ type });
      return {
        sectionName,
        data: processResult.length > 0 ? processResult[0] : null,
      };
    }

    case "whychooseus": {
      const whychooseusResult = await whychooseusSectionService.getAllSections({
        type,
      });
      return {
        sectionName,
        data: whychooseusResult.length > 0 ? whychooseusResult[0] : null,
      };
    }
    case "comparison": {
      const result = await comparisonService.getComparisons(type as string);
      return { sectionName, data: result || null };
    }
    case "insight": {
      const result = await getSectionByPage(type as string);
      return { sectionName, data: result.length > 0 ? result[0] : null };
    }
    case "faq": {
      const result = await faqService.getFaqSections({ page: type });

      return { sectionName, data: result.length > 0 ? result[0] : null };
    }

    case "contact": {
      const result = true;
      return { sectionName, data: result };
    }

    default:
      return { sectionName, data: null };
  }
};
