import { z } from "zod";

export const VideoSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  video_link: z.string().optional(),
  isVisible: z.boolean().optional(),
  isFeature: z.boolean().optional(),
  position: z.number().optional(),
  type: z.enum([
    "home",
    "shorts",
    "talkinghead",
    "podcast",
    "thumbnail",
    "saas",
    "about",
  ]),
});

// export Type from Schema
export type VideoSchemaType = z.infer<typeof VideoSchema>;
