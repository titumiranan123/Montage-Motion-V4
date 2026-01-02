import { z } from "zod";

export const SectionSchema = z.object({
  section_name: z.enum([
    "short-hero",
    "home-hero",
    "podcast-hero",
    "work",
    "testimonial",
    "pricing",
    "service",
    "process",
    "faq",
    "whychooseus",
    "contact",
    "our-clients",
    "shorts_service",
    "insight",
    "before_after_section",
    "industry",
    "whysaas_video",
  ]),
  visible: z.boolean().default(true),
});

export type SectionItem = z.infer<typeof SectionSchema>;

export const ServiceItemSchema = z.object({
  id: z.string().optional(),
  service_title: z.string().min(1, "Service title is required"),
  service_description: z.string(),
  image: z.string().min(1, "Image URL is required"),
  alt: z.string(),
  icon: z.string().nullable().optional(),
  icon_alt: z.string().nullable().optional(),
  href: z.string().nullable().optional(),
  service_type: z.string().nullable().optional(),
  page_active: z.boolean().default(false),
  available_section: z.array(SectionSchema).nullable().optional(),
});

// TypeScript type for ServiceItem
export type ServiceItem = z.infer<typeof ServiceItemSchema>;

// =====================
// 3️⃣ Page Service / Section Schema
// =====================
export const ServiceSectionSchema = z.object({
  type: z.string(),
  tag: z.string().min(1, "Tag is required"),
  heading_part1: z.string().min(1, "Heading is required"),
  heading_part2: z.string().nullable().optional(),
  paragraph: z.string(),
  services: z
    .array(ServiceItemSchema)
    .min(1, "At least one service item required"),
});

// TypeScript type for full section
export type IServiceSection = z.infer<typeof ServiceSectionSchema>;
export type IServiceItem = z.infer<typeof ServiceItemSchema>;
