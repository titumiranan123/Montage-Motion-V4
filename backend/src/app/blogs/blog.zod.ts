import { z } from "zod";

export const BlogSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "Title is required"),
  meta_title: z.string().min(3, "Meta title is required"),
  meta_description: z.string().min(10, "Meta description is required"),
  keywords: z.array(z.string()).optional().default([]),
  slug: z.string().optional(),
  short_description: z.string().min(10, "Short description is required"),
  description: z.string().min(10, "Description is required"),
  image: z.string().url().optional(),
  alt: z.string().optional(),
  is_publish: z.boolean().optional().default(false),
  is_feature: z.boolean().optional().default(false),
  position: z.number().optional(),
  read_time: z.string().optional(), // new field
  updatedAt: z.string().optional(), // new field for formatted date
  whatWillLearn: z.array(z.string()).optional().default([]), // new field
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type IBlog = z.infer<typeof BlogSchema>;
