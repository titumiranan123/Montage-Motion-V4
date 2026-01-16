import { z } from "zod";

/**
 * faq_items table schema
 */
export const faqItemSchema = z.object({
  id: z.string().uuid().optional(),

  faq_section_id: z.string().uuid().optional(),

  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),

  sort_order: z.number().int().optional(),
  is_visible: z.boolean().default(true),
});

/**
 * faq_sections table schema
 */
export const faqSectionSchema = z.object({
  id: z.string().uuid().optional(),

  section_tag: z.string().min(1, "Section tag is required"),
  section_title: z.string().min(1, "Section title is required"),
  section_description: z.string().min(1, "Section description is required"),

  contact_image: z.string().min(1, "Contact image is required"),
  contact_alt: z.string().optional(),

  contact_heading: z.string().min(1, "Contact heading is required"),
  contact_description: z.string().optional(),

  contact_name: z.string().optional(),
  contact_position: z.string().optional(),
  contact_link: z.string().optional(),

  is_active: z.boolean().default(true),

  faqs: z.array(faqItemSchema).optional(),
});
