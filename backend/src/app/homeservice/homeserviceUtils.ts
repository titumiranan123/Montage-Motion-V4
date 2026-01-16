import { PoolClient } from "pg";
import { errorLogger } from "../../logger/logger";
import ApiError from "../../utils/ApiError";

import { IServiceSection, ServiceItem } from "./homeservice.zod";

export async function createSection(client: PoolClient, data: IServiceSection) {
  try {
    const res = await client.query(
      `INSERT INTO service_sections (type, tag, heading_part1, heading_part2, paragraph)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
      [
        data.type,
        data.tag,
        data.heading_part1,
        data.heading_part2,
        data.paragraph,
      ]
    );
    return res.rows[0]?.id;
  } catch (error) {
    new ApiError(404, "", "Section Create failed");
    errorLogger.error(error);
  }
}
export async function createServiceItem(
  client: PoolClient,
  data: ServiceItem[],
  sectionId: string
) {
  try {
    // Get all existing service items for this section
    const existingItems = await client.query(
      `SELECT * FROM home_services WHERE section_id = $1 ORDER BY order_index ASC, created_at ASC`,
      [sectionId]
    );
    const existingItemsMap = new Map(
      existingItems.rows.map((item) => [item.id, item])
    );
    const processedIds = new Set<string>();
    // Process incoming data WITH order_index
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const orderIndex = i; // This preserves the order from frontend

      // Match by ID if provided, otherwise treat as new
      const existing = item.id ? existingItemsMap.get(item.id) : null;

      let result;

      if (!existing) {
        // NEW ITEM - Generate service_type only for new items
        const serviceType = generateServiceType(item.service_title);

        result = await client.query(
          `INSERT INTO home_services (section_id, service_title, service_description, image, alt, href, service_type, icon, icon_alt, order_index)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
          [
            sectionId,
            item.service_title,
            item.service_description,
            item.image,
            item.alt,
            item.href,
            serviceType,
            item.icon,
            item.icon_alt,
            orderIndex,
          ]
        );
      } else {
        // EXISTING ITEM - Update with order_index
        result = await client.query(
          `UPDATE home_services 
           SET service_title = $1,
               service_description = $2,
               image = $3,
               alt = $4,
               href = $5,
               icon = $6,
               icon_alt = $7,
               order_index = $8
           WHERE id = $9
           RETURNING *`,
          [
            item.service_title,
            item.service_description,
            item.image,
            item.alt,
            item.href,
            item.icon,
            item.icon_alt,
            orderIndex,
            existing.id,
          ]
        );
      }
      const serviceItemId = result.rows[0].id;
      processedIds.add(serviceItemId);
      // Handle available sections (keep this part same)
      if (item.available_section && item.available_section.length > 0) {
        await client.query(
          `DELETE FROM service_item_sections WHERE service_item_id = $1`,
          [serviceItemId]
        );
        for (const sec of item.available_section) {
          await client.query(
            `INSERT INTO service_item_sections (service_item_id, section_name, visible)
             VALUES ($1, $2, $3)`,
            [serviceItemId, sec.section_name, sec.visible]
          );
        }
      }
    }

    // Delete items that were not in the incoming data
    const itemsToDelete = existingItems.rows.filter(
      (item) => !processedIds.has(item.id)
    );

    for (const item of itemsToDelete) {
      await client.query(
        `DELETE FROM service_item_sections WHERE service_item_id = $1`,
        [item.id]
      );
      await client.query(`DELETE FROM home_services WHERE id = $1`, [item.id]);
    }
  } catch (error) {
    errorLogger.error(error);
    throw new ApiError(404, "", "Service Item creation/update failed");
  }
}

export function generateServiceType(
  service_title: string,
  format: "kebab" | "snake" = "kebab"
): string {
  if (!service_title) return "";

  // Trim করে lowercase বানানো
  let formatted = service_title.trim().toLowerCase();

  // যেকোনো space বা special character replace করা
  if (format === "kebab") {
    formatted = formatted.replace(/\s+/g, "-"); // kebab-case
  } else {
    formatted = formatted.replace(/\s+/g, "_"); // snake_case
  }

  // Extra character remove
  formatted = formatted.replace(/[^a-z0-9-_]/g, "");

  return formatted;
}
