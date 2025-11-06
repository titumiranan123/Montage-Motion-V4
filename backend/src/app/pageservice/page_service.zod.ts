// serviceSection.interface.ts
import { z } from "zod";

export const ServiceItemSchema = z.object({
  service_title: z.string().min(1, "Service title is required"),
  service_description: z.string().optional(),
  image: z.string().min(1, "Image URL is required"),
  alt: z.string().optional(),
});

export const ServiceSectionSchema = z.object({
  type: z.enum([
    "podcast",
    "shorts",
    "thumbnail",
    "saas",
    "talkinghead",
    "home",
  ]),
  tag: z.string().min(1, "Tag is required"),
  heading_part1: z.string().min(1, "Heading  is required"),
  heading_part2: z.string().optional(),
  paragraph: z.string().optional(),
  services: z
    .array(ServiceItemSchema)
    .min(1, "At least one service item required"),
});

export type IServiceSection = z.infer<typeof ServiceSectionSchema>;
export type IServiceItem = z.infer<typeof ServiceItemSchema>;
