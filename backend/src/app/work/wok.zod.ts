import { z } from "zod";
export const workHeader = z.object({
  type: z.string(),
  tag: z.string().min(1, "Tag is required"),
  heading_part1: z.string().min(1, "Heading is required"),
  heading_part2: z.string().optional(),
  paragraph: z.string().optional(),
});
export const VideoSchema = z.object({
  id: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  video_link: z.string().nullable().optional(),
  isVisible: z.boolean().optional(),
  isFeature: z.boolean().optional(),
  position: z.number().optional(),
  type: z.string(),
});

// export Type from Schema
export type VideoSchemaType = z.infer<typeof VideoSchema>;
export type IWorkHeader = z.infer<typeof workHeader>;
