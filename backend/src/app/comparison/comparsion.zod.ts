import { z } from "zod";

export const comparisonEntrySchema = z.object({
  entry_type: z.enum(["item", "bonus"]),
  text: z.string().min(1),
  position: z.number().int().min(1),
});

export const comparisonColumnSchema = z.object({
  type: z.enum(["montage", "agencies", "freelancers"]),
  title: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  bonus_title: z.string().nullable().optional(),
  entries: z.array(comparisonEntrySchema),
});

export const createComparisonSchema = z.object({
  page: z.string().min(1),
  tag: z.string().min(1),
  heading_title: z.string(),
  paragraph: z.string(),
  columns: z.tuple([
    comparisonColumnSchema,
    comparisonColumnSchema,
    comparisonColumnSchema,
  ]),
});

export const updateComparisonSchema = createComparisonSchema.partial();
