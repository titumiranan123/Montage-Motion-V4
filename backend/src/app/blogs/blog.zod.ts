import { z } from "zod";

export const BlogSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  meta_title: z.string().min(3, "Meta title is required"),
  meta_description: z.string().min(10, "Meta description is required"),
  keywords: z.array(z.string()).optional(),
  slug: z.string().optional(),
  short_description: z.string(),
  description: z.string(),
  image: z.string().url(),
  alt: z.string(),
  is_publish: z.boolean().optional().default(false),
  is_feature: z.boolean().optional().default(false),
  position: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type IBlog = z.infer<typeof BlogSchema>;
