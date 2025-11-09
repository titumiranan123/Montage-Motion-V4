/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { IPagePricePlan } from "./pricing.interface";

export const pricingPageService = {
  /** ✅ Create or update page price plan (auto upsert by type) */
  async upsertPagePricePlan(data: IPagePricePlan) {
    await db.query("BEGIN");

    try {
      // 1️⃣ Check if a page with this type already exists
      const existingRes = await db.query(
        `SELECT id FROM page_price_plans WHERE type = $1`,
        [data.type]
      );

      let pageId: string;

      if (existingRes.rowCount) {
        // 2️⃣ Update existing page
        pageId = existingRes.rows[0].id;
        await db.query(
          `
          UPDATE page_price_plans
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
        // 3️⃣ Create new page
        const insertRes = await db.query(
          `
          INSERT INTO page_price_plans (type, tag, heading_part1, heading_part2, paragraph)
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

      // 4️⃣ Get existing packages for this page
      const existingPackagesRes = await db.query(
        `SELECT id FROM packages WHERE page_price_plan_id = $1`,
        [pageId]
      );
      const existingPackageIds = existingPackagesRes.rows.map((r) => r.id);

      const receivedPackageIds = data.packages
        .filter((p) => !!p.id)
        .map((p) => p.id);

      // 5️⃣ Delete packages that are missing in incoming data
      const packagesToDelete = existingPackageIds.filter(
        (id) => !receivedPackageIds.includes(id)
      );

      if (packagesToDelete.length) {
        await db.query(`DELETE FROM packages WHERE id = ANY($1::uuid[])`, [
          packagesToDelete,
        ]);
      }

      // 6️⃣ Upsert each package
      for (const [pkgIndex, pkg] of data.packages.entries()) {
        let packageId = pkg.id;

        if (packageId && existingPackageIds.includes(packageId)) {
          // Update package
          await db.query(
            `
            UPDATE packages
            SET name = $1,
                description = $2,
                currency = $3,
                price = $4,
                billing_cycle = $5,
                is_hidden = $6,
        
                position = $7,
                updated_at = NOW()
            WHERE id = $8
            `,
            [
              pkg.name,
              pkg.description,
              pkg.currency,
              pkg.price,
              pkg.billing_cycle,
              pkg.ishiden ?? false,

              pkg.position ?? pkgIndex + 1,
              packageId,
            ]
          );

          // Replace features
          await db.query(`DELETE FROM package_features WHERE package_id = $1`, [
            packageId,
          ]);
        } else {
          // Insert new package
          const pkgRes = await db.query(
            `
            INSERT INTO packages (
              page_price_plan_id, name, description, currency, price,
              billing_cycle, is_hidden, position
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
            `,
            [
              pageId,
              pkg.name,
              pkg.description,
              pkg.currency,
              pkg.price,
              pkg.billing_cycle,
              pkg.ishiden ?? false,

              pkg.position ?? pkgIndex + 1,
            ]
          );
          packageId = pkgRes.rows[0].id;
        }

        // Insert features for package
        if (pkg.features?.length) {
          for (const [fIndex, feature] of pkg.features.entries()) {
            const isActive =
              typeof feature.is_active === "string"
                ? feature.is_active === "true"
                : (feature.is_active ?? true);

            await db.query(
              `
              INSERT INTO package_features (package_id, feature, is_active, position)
              VALUES ($1, $2, $3, $4)
              `,
              [
                packageId,
                feature.feature,
                isActive,
                feature.position ?? fIndex + 1,
              ]
            );
          }
        }
      }

      await db.query("COMMIT");

      // 7️⃣ Return the full updated page with all packages & features
      const result = await this.getPagePricePlanByType({ type: data.type });
      return result;
    } catch (err) {
      await db.query("ROLLBACK");
      throw err;
    }
  },

  /** ✅ Get full page with packages & features */
  async getPagePricePlanByType(query: { type: string }) {
    let baseQuery = `SELECT * FROM page_price_plans `;
    const conditions: string[] = [];
    const values: any[] = [];

    if (query?.type) {
      values.push(query?.type);
      conditions.push(` type = $${values.length}`);
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join(" AND ");
    }

    baseQuery += ` ORDER BY id ASC `;

    const pageRes = await db.query(baseQuery, values);

    if (!pageRes.rowCount) return [];

    const page = pageRes.rows[0];
    const pkgRes = await db.query(
      `SELECT * FROM packages WHERE page_price_plan_id = $1 ORDER BY position ASC`,
      [page.id]
    );

    for (const pkg of pkgRes.rows) {
      const featRes = await db.query(
        `SELECT * FROM package_features WHERE package_id = $1 ORDER BY position ASC`,
        [pkg.id]
      );
      pkg.features = featRes.rows;
    }

    page.packages = pkgRes.rows;

    return page;
  },
  /** ✅ Delete entire page (cascade) */
  async deletePagePricePlan(type: string) {
    const res = await db.query(
      `SELECT id FROM page_price_plans WHERE type = $1`,
      [type]
    );
    if (!res.rowCount) throw new Error("Page not found");

    const id = res.rows[0].id;
    await db.query(`DELETE FROM page_price_plans WHERE id = $1`, [id]); // cascade deletes packages & features
    return { message: "Page and all related packages deleted successfully" };
  },

  /** ✅ Delete single package (cascade its features) */
  async deleteSinglePackage(id: string) {
    const check = await db.query(`SELECT id FROM packages WHERE id = $1`, [id]);
    if (!check.rowCount) throw new Error("Package not found");

    await db.query(`DELETE FROM packages WHERE id = $1`, [id]);
    return { message: "Package and its features deleted successfully" };
  },
};
