import { db } from "../../db/db";
import { BrandImageService } from "../brand_images/brandimage.service";
import { comparisonService } from "../comparison/comparison.services";
import { faqService } from "../faq/faq.services";
import { pageHeaderService } from "../header/header.services";
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
      const result = await BrandImageService.getAllBrandImage("home");
      return { sectionName, data: result?.[0] || null };
    }

    case "work": {
      const works = await VideosService.getAllVideosForSite({ type, limit: 6 });
      return { sectionName, data: works || [] };
    }

    case "service": {
      const result = await serviceSectionService.getAllSections({ type });
      return { sectionName, data: result || [] };
    }

    case "testimonial": {
      const testimonials = await db.query(
        `SELECT * FROM testimonials WHERE type = $1`,
        ["home"],
      );
      return { sectionName, data: testimonials.rows || [] };
    }

    case "pricing": {
      const result = await pricingPageService.getPagePricePlanByType({ type });
      return { sectionName, data: result || [] };
    }

    case "process": {
      const processResult = await processService.getAllProcesses({ type });
      return { sectionName, data: processResult[0] || [] };
    }

    case "whychooseus": {
      const whychooseusResult = await whychooseusSectionService.getAllSections({
        type,
      });
      return { sectionName, data: whychooseusResult[0] || [] };
    }
    case "comparison": {
      const result = await comparisonService.getComparisons(type as string);
      return { sectionName, data: result || [] };
    }
    case "faq": {
      const result = await faqService.getFaqSections({ page: type });

      return { sectionName, data: result[0] || [] };
    }

    case "contact": {
      const result = true;
      return { sectionName, data: result };
    }

    default:
      return { sectionName, data: null };
  }
};
