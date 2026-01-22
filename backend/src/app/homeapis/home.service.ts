/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { homeService } from "../homeservice/homeservice.service";
import { pricingPageService } from "../pricing/pricing.service";
// import { seoMetaService } from "../seo/seo.service";
import { whychooseusSectionService } from "../whychooseus/whychooseus.service";
import { processService } from "../working_process/process.service";
import { fetchSectionData } from "./utils";
// import { packageFeatureService } from "../pricing/package.service";

export const homeapiServices = {
  async advertsingService(type: string, tables: string[]) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      // header
      const values: any[] = [];
      let query = `
        SELECT 
          ph.*,
          COALESCE(
            json_agg(
              json_build_object(
                'id', hm.id,
                'image_url', hm.image_url,
                'alt', hm.alt,
                'video_url', hm.video_url
              )
            ) FILTER (WHERE hm.id IS NOT NULL), 
          '[]') AS media
        FROM page_headers ph
        LEFT JOIN header_media hm ON ph.id = hm.header_id
      `;

      if (type) {
        query += ` WHERE ph.type = $1`;
        values.push(type);
      }

      query += ` GROUP BY ph.id ORDER BY ph.created_at DESC`;

      const result = await db.query(query, values);
      // const seo = await seoMetaService.getSeoMetaByPage(type);
      const worksService = await client.query(
        `SELECT thumbnail, video_link FROM Works WHERE type = $1 AND is_visible = true ORDER BY position ASC   LIMIT 6`,
        [type],
      );

      const testimonialService = await client.query(
        `SELECT * FROM testimonials WHERE type = $1`,
        [type],
      );
      let brandImages: any[] = [];
      if (tables.includes("brand")) {
        const brand = await client.query(
          `SELECT image, alt, width,height FROM brandimage WHERE type = $1 AND ishide = false ORDER BY sortorder ASC`,
          ["home"],
        );
        brandImages = brand.rows;
      }
      let services: any[] = [];
      if (tables.includes("services")) {
        const result = await homeService.getAllSections({ type });

        services = result.length > 0 ? result[0] : [];
      }
      let process: any[] = [];
      if (tables.includes("process")) {
        const result = await processService.getAllProcesses({ type });
        process = result.length > 0 ? result[0] : [];
      }
      let whychooseus: any[] = [];
      if (tables.includes("whychooseus")) {
        const result = await whychooseusSectionService.getAllSections({
          type,
        });
        whychooseus = result.length > 0 ? result[0] : [];
      }
      let pricing: any[] = [];
      if (tables.includes("pricing")) {
        const result = await pricingPageService.getPagePricePlanByType({
          type,
        });
        // console.log("pricing", result);
        pricing = result;
      }
      let members: any[] = [];
      if (tables.includes("members")) {
        const res = await homeapiServices.aboutService();

        members = res;
      }

      // const pricingService = async () => {
      //   let res;
      //   if (type === "main") {
      //     res = await client.query(`SELECT * FROM packages `);
      //   } else {
      //     res = await client.query(`SELECT * FROM packages WHERE type = $1`, [
      //       type,
      //     ]);
      //   }
      //   logger.info("results", res.rows);
      //   const packages = res.rows;

      //   for (const pkg of packages) {
      //     pkg.features = await packageFeatureService.getFeaturesByPackageId(
      //       pkg.id
      //     );
      //   }

      //   return packages;
      // };

      // const faqService = async () => {
      //   const result = await client.query(
      //     `SELECT id, title, sub_title FROM faqs WHERE type = $1 AND is_visible = true`,
      //     [type]
      //   );

      //   const faq = result.rows[0];
      //   if (!faq) return null;

      //   const faqitem = await client.query(
      //     `SELECT * FROM faq_items WHERE faq_id = $1 ORDER BY position ASC`,
      //     [faq.id]
      //   );

      //   faq.faqs = faqitem.rows;
      //   return faq;
      // };

      // const allFaqs = await faqService();
      // const prices = await pricingService();

      await client.query("COMMIT");
      // console.log("pricing", pricing);
      return {
        header: result.rows[0] || null,
        works: worksService.rows || [],
        testimonial: testimonialService.rows || [],
        brand: brandImages,
        pricing: pricing,
        services: services,
        process: process,
        whychooseus: whychooseus,
        members: members,
        // seo: seo,
        // pricing: prices || [],
      };
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw error;
    } finally {
      client.release();
    }
  },
  // services page
  async servicesData(href: string) {
    const client = await db.connect();
    if (!href) {
      return [];
    }
    try {
      await client.query("BEGIN");
      const itemsRes = await db.query(
        `SELECT id, service_type FROM home_services WHERE href = $1 `,
        [href],
      );
      const sectionsRes = await db.query(
        `SELECT section_name FROM service_item_sections WHERE service_item_id = $1 AND visible = $2`,
        [itemsRes?.rows[0]?.id, true],
      );
      const availableSections = sectionsRes.rows.map((s) => s.section_name);
      // console.log("availableSections", itemsRes?.rows);

      // header
      const sectionsData: any = {};

      for (const section of availableSections) {
        const result = await fetchSectionData(
          section,
          itemsRes?.rows[0]?.service_type,
        );
        if (!sectionsData[result.sectionName]) {
          sectionsData[result.sectionName] = result.data;
        }
      }

      await client.query("COMMIT");
      // console.log("pricing", pricing);
      return sectionsData;
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw error;
    } finally {
      client.release();
    }
  },

  async aboutService() {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      const member = await client.query(
        `SELECT * FROM members ORDER BY position ASC`,
      );
      await client.query("COMMIT");
      return member.rows ?? [];
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw error;
    } finally {
      client.release();
    }
  },

  async getAllHomeBlogs() {
    try {
      const result = await db.query(
        `SELECT title, short_description, description, image, slug, created_at FROM blogs ORDER BY position ASC`,
      );
      return result.rows || [];
    } catch (error) {
      errorLogger.error(error);
      return [];
    }
  },

  async getSingleBlogs(slug: string) {
    try {
      const result = await db.query(
        `SELECT title, short_description, description, image, slug, created_at FROM blogs WHERE slug = $1 ORDER BY position ASC`,
        [slug],
      );
      return result.rows[0] || null;
    } catch (error) {
      errorLogger.error(error);
      return null;
    }
  },
};
