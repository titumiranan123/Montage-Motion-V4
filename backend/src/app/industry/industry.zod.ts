import { z } from "zod";

// single point
export const offerPointSchema = z.object({
  text: z.string().min(1),
  position: z.number().int().min(1),
});

// CTA
export const ctaSchema = z.object({
  label: z.string().min(1),
  link: z.string().url().or(z.string().min(1)), // relative URLs allowed
});

// single tab
export const tabSchema = z.object({
  tab_key: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  offer_points: z.array(offerPointSchema).min(1),
  cta: ctaSchema,
  position: z.number().nullable().optional(),
});

// Section create schema
export const createSectionSchema = z.object({
  page: z.string().min(1),
  tag: z.string().min(1),
  heading_title: z.string().optional(),
  paragraph: z.string().optional(),
  tabs: z.array(tabSchema).min(1),
});

// Section update schema
export const updateSectionSchema = z.object({
  heading_title: z.string().optional(),
  paragraph: z.string().optional(),
  tabs: z.array(tabSchema).optional(), // optional for partial update
});
