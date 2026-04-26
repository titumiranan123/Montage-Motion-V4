import { z } from "zod";

export const StoryStepZod = z.object({
  icon: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  icon_alt: z.string().optional(),
  alt: z.string().optional(),
  order_index: z.number().default(0),
  is_hidden: z.boolean().default(false),
});

export const StorySchemaZod = z.object({
  type: z.enum([
    "podcast",
    "shorts",
    "thumbnail",
    "saas",
    "home",
    "talkinghead",
  ]),
  tag: z.string().min(1),
  heading_part1: z.string().min(1),
  heading_part2: z.string().optional(),
  paragraph: z.string().optional(),
  image: z.string().optional(),
  alt: z.string().optional(),
  steps: z.array(StoryStepZod).min(1, "At least one step required"),
});

export type StoryInput = z.infer<typeof StorySchemaZod>;