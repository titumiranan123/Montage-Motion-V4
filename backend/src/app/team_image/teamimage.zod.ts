import { z } from "zod";

// Base schema
export const brandImageSchema = z.object({
  id: z.string().uuid().optional().nullable(),

  image: z
    .string()
    .min(1, "Image URL is required")
    .max(512),

  alt: z
    .string()
    .min(1, "Alt text is required")
    .max(512),

  type: z
    .string()
    .min(1, "Type is required")
    .max(50),

  is_hidden: z.boolean().optional(),

  order_index: z.number().int().nonnegative().optional(),

  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});