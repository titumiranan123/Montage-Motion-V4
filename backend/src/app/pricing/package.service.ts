/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";

interface FeatureInput {
  feature: string;
  is_active: boolean;
  position: number;
}

export const packageFeatureService = {
  /** ➕ Add a new feature under a specific package */
  async addFeature(packageId: string, feature: FeatureInput) {
    const positionResult = await db.query(
      `SELECT COALESCE(MAX(position), 0) AS max 
       FROM package_features 
       WHERE package_id = $1`,
      [packageId]
    );

    const newPosition = positionResult.rows[0].max + 1;

    await db.query(
      `INSERT INTO package_features (package_id, feature, is_active, position) 
       VALUES ($1, $2, $3, $4)`,
      [packageId, feature.feature, feature.is_active, newPosition]
    );
  },

  /** ✏️ Update an existing feature by its ID */
  async updateFeature(featureId: string, feature: Partial<FeatureInput>) {
    const keys = Object.keys(feature);
    const values = Object.values(feature);

    if (!keys.length) return; // nothing to update

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const query = `UPDATE package_features SET ${setClause} WHERE id = $${
      keys.length + 1
    }`;

    await db.query(query, [...values, featureId]);
  },

  /** ❌ Delete a single feature */
  async deleteFeature(featureId: string) {
    await db.query(`DELETE FROM package_features WHERE id = $1`, [featureId]);
  },

  /** 📦 Get all active features for a given package */
  async getFeaturesByPackageId(packageId: string) {
    const res = await db.query(
      `SELECT id, feature, is_active, position 
       FROM package_features 
       WHERE package_id = $1 
       ORDER BY position ASC`,
      [packageId]
    );
    return res.rows;
  },

  /** 🔁 Replace all features for a package (useful when updating a package) */
  async replaceAllFeatures(packageId: string, features: FeatureInput[]) {
    await db.query(`DELETE FROM package_features WHERE package_id = $1`, [
      packageId,
    ]);

    for (const feature of features) {
      await this.addFeature(packageId, feature);
    }
  },

  /** ↕️ Update the order (position) of multiple features in a package */
  async updateFeaturePositions(
    packageId: string,
    features: { id: string; position: number }[]
  ) {
    const updates: Promise<any>[] = [];

    for (const feat of features) {
      const existing = await db.query(
        `SELECT position FROM package_features 
         WHERE id = $1 AND package_id = $2`,
        [feat.id, packageId]
      );

      const currentPosition = existing.rows[0]?.position;
      if (currentPosition !== feat.position) {
        updates.push(
          db.query(`UPDATE package_features SET position = $1 WHERE id = $2`, [
            feat.position,
            feat.id,
          ])
        );
      }
    }

    await Promise.all(updates);
    return { message: "Feature positions updated successfully" };
  },
};
