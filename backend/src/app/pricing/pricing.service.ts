/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { packageFeatureService } from "./package.service";
import { IPackage } from "./pricing.interface";

export const packageService = {
  /** Create a new package with auto-position and feature insert */
  async createPackage(data: IPackage) {
    const positionResult = await db.query(
      `SELECT COALESCE(MAX(position), 0) as max FROM packages`
    );
    const newPosition = positionResult.rows[0].max + 1;

    const result = await db.query(
      `INSERT INTO packages (title, description, currency, price, billing_cycle, is_visible, type, position)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        data.title,
        data.description,
        data.currency,
        data.price,
        data.billing_cycle,
        data.is_visible,
        data.type,
        newPosition,
      ]
    );

    const packageId = result.rows[0].id;

    // Insert related features
    if (data.features?.length) {
      for (const feature of data.features) {
        await packageFeatureService.addFeature(packageId, {
          ...feature,
          is_active:
            typeof feature.is_active === "string"
              ? feature.is_active === "true"
              : feature.is_active,
        });
      }
    }

    return result.rows[0];
  },

  /** Retrieve all visible packages with optional filters */
  async getAllPackages(filter?: { type?: string; id?: string }) {
    const conditions: string[] = [`is_visible = true`];
    const values: any[] = [];

    if (filter?.type) {
      conditions.push(`type = $${conditions.length + 1}`);
      values.push(filter.type);
    }

    if (filter?.id) {
      conditions.push(`id = $${conditions.length + 1}`);
      values.push(filter.id);
    }

    const baseQuery = `
      SELECT * FROM packages 
      ${conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""} 
      ORDER BY position ASC
    `;

    const pkgRes = await db.query(baseQuery, values);

    for (const pkg of pkgRes.rows) {
      pkg.features = await packageFeatureService.getFeaturesByPackageId(pkg.id);
    }

    return pkgRes.rows;
  },

  /** Retrieve a single package by ID with its features */
  async getPackageById(id: string) {
    const res = await db.query(`SELECT * FROM packages WHERE id = $1`, [id]);
    if (!res.rowCount) throw new Error("Package not found");

    const features = await packageFeatureService.getFeaturesByPackageId(id);
    return { ...res.rows[0], features };
  },

  /** Update an existing package */
  async updatePackage(id: string, data: Partial<IPackage>) {
    const existing = await this.getPackageById(id);
    const updated = { ...existing, ...data };

    await db.query(
      `UPDATE packages 
       SET title = $1,
           description = $2,
           currency = $3,
           price = $4,
           billing_cycle = $5,
           is_visible = $6,
           type = $7
       WHERE id = $8`,
      [
        updated.title,
        updated.description,
        updated.currency,
        updated.price,
        updated.billing_cycle,
        updated.is_visible,
        updated.type,
        id,
      ]
    );

    // Replace all features if provided
    if (data.features) {
      await packageFeatureService.replaceAllFeatures(
        id,
        data.features.map((f) => ({
          ...f,
          is_active:
            typeof f.is_active === "string"
              ? f.is_active === "true"
              : f.is_active,
        }))
      );
    }

    return this.getPackageById(id);
  },

  /** Delete a package (and its features if needed) */
  async deletePackage(id: string) {
    await this.getPackageById(id); // ensure existence
    await db.query(`DELETE FROM packages WHERE id = $1`, [id]);
    return { message: "Package deleted" };
  },

  /** Update multiple package positions (drag & drop reorder) */
  async updatePackagePositions(packages: { id: string; position: number }[]) {
    const updates = packages.map((pkg) =>
      db.query(`UPDATE packages SET position = $1 WHERE id = $2`, [
        pkg.position,
        pkg.id,
      ])
    );
    await Promise.all(updates);
    return { message: "Positions updated successfully" };
  },
};
