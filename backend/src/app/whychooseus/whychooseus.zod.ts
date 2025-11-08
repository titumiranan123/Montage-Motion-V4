// serviceSection.interface.ts
import { z } from "zod";

// ✅ Schema for individual "Why Choose Us" items
export const whychooseusItemSchema = z.object({
  title: z.string().min(1, "Service title is required"),
  description: z.string().optional(),
  icon: z.string().min(1, "Image URL is required"),
  alt: z.string().optional(),
  position: z.number().optional(),
});

// ✅ Schema for the full "Why Choose Us" section
export const whychooseusSchema = z.object({
  type: z.enum([
    "podcast",
    "shorts",
    "thumbnail",
    "saas",
    "talkinghead",
    "home",
    "about",
  ]),
  tag: z.string().min(1, "Tag is required"),
  heading_part1: z.string().min(1, "Heading is required"),
  heading_part2: z.string().optional(),
  paragraph: z.string().optional(),
  whychooseus_items: z
    .array(whychooseusItemSchema)
    .min(1, "At least one service item is required"),
});

// ✅ Type definitions
export type IWhychooseusSection = z.infer<typeof whychooseusSchema>;
export type IWhychooseusItem = z.infer<typeof whychooseusItemSchema>;
