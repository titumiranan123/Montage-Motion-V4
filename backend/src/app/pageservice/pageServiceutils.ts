/* eslint-disable @typescript-eslint/no-explicit-any */
import { PoolClient } from "pg";
import { errorLogger } from "../../logger/logger";
import ApiError from "../../utils/ApiError";

import { IServiceSection, ServiceItem } from "./page_service.zod";

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
      ],
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
  sectionId: string,
) {
  try {
    // Get all existing service items for this section
    const existingItems = await client.query(
      `SELECT * FROM service_items WHERE section_id = $1`,
      [sectionId],
    );

    const existingItemsMap = new Map(
      existingItems.rows.map((item) => [item.id, item]),
    );

    const processedIds = new Set<string>();

    // Process incoming data
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const orderIndex = i;

      // Check if item exists
      const existing = item.id ? existingItemsMap.get(item.id) : null;

      let result;

      if (existing) {
        // DELETE existing item first
        await client.query(`DELETE FROM service_items WHERE id = $1`, [
          existing.id,
        ]);

        // Then INSERT new item with same ID
        result = await client.query(
          `INSERT INTO service_items (id, section_id, service_title, service_description, image, alt, href, service_type, icon,
          icon_alt, position, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW()) RETURNING *`,
          [
            existing.id, // Keep the same ID
            sectionId,
            item.service_title,
            item.service_description,
            item.image,
            item.alt,
            item.href,
            null,
            item.icon,
            item.icon_alt,
            orderIndex,
          ],
        );
      } else {
        // NEW ITEM - Insert with new ID
        result = await client.query(
          `INSERT INTO service_items (section_id, service_title, service_description, image, alt, href, service_type, icon,
          icon_alt, position, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) RETURNING *`,
          [
            sectionId,
            item.service_title,
            item.service_description,
            item.image,
            item.alt,
            item.href,
            null,
            item.icon,
            item.icon_alt,
            orderIndex,
          ],
        );
      }

      const serviceItemId = result.rows[0].id;
      processedIds.add(serviceItemId);
    }

    // Delete items that were not in the incoming data
    const incomingIds = data
      .map((item) => item.id)
      .filter((id) => id) as string[];
    const itemsToDelete = existingItems.rows
      .filter((item) => !incomingIds.includes(item.id))
      .map((item) => item.id);

    if (itemsToDelete.length > 0) {
      await client.query(`DELETE FROM service_items WHERE id = ANY($1)`, [
        itemsToDelete,
      ]);
    }
  } catch (error: any) {
    errorLogger.error(error);
    throw new ApiError(404, "", error.message);
  }
}

export function generateServiceType(
  service_title: string,
  format: "kebab" | "snake" = "kebab",
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
