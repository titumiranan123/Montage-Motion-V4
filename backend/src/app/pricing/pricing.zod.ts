// package.zod.ts
import { z } from "zod";

export const packageFeatureSchema = z.object({
  id: z.string().uuid().optional(),
  feature: z.string().min(1, "Feature name is required"),
  is_active: z.boolean().default(true),
  position: z.number().optional(),
});

export const packageSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Package title is required"),
  description: z.string().optional(),
  currency: z.string().default("USD"),
  price: z.number().positive("Price must be positive"),
  billing_cycle: z.string().optional(),
  ishiden: z.boolean().default(true),
  type: z.string().optional(),
  position: z.number().optional(),
  features: z.array(packageFeatureSchema).optional(),
});
