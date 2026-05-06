import { z } from 'zod';

const heroStatSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
  sub:   z.string().optional(),
});

const challengeItemSchema = z.object({
  title: z.string(),
  desc:  z.string(),
});

const solutionPhaseSchema = z.object({
  phase:      z.string(),
  time_range: z.string(),
  desc:       z.string(),
});

const testimonialSchema = z.object({
  quote:      z.string(),
  name:       z.string(),
  role:       z.string(),
  avatar_url: z.string().url().optional(),
});

export const createCaseStudySchema = z.object({
  slug:            z.string().min(1).regex(/^[a-z0-9-]+$/),
  type:            z.string().optional(),
  status:          z.enum(['draft', 'published', 'archived']).default('draft'),
  title:    z.string().optional(),

  description:     z.string().optional(),
  image_url:       z.string().url().optional(),
  image_alt:       z.string().optional(),
  client_name:     z.string().optional(),
  client_logo:     z.string().url().optional(),
  client_industry: z.string().optional(),
  client_domain:   z.string().optional(),
  client_employees:z.number().int().positive().optional(),
  client_desc:     z.string().optional(),
  challenge_intro: z.string().optional(),
  solution_intro:  z.string().optional(),
  outcome_desc:    z.string().optional(),
  outcome_video:   z.string().url().optional(),
  meta_title:      z.string().optional(),
  meta_desc:       z.string().optional(),
  meta_keywords:   z.string().optional(),
  calendly_url:    z.string().url().optional(),
  tag_slugs:       z.array(z.string()).default([]),
  client_tags:     z.array(z.string()).default([]),
  hero_stats:      z.array(heroStatSchema).default([]),
  metrics:         z.array(metricSchema).default([]),
  challenge_items: z.array(challengeItemSchema).default([]),
  solution_phases: z.array(solutionPhaseSchema).default([]),
  testimonials:    z.array(testimonialSchema).default([]),
});

export const updateCaseStudySchema = createCaseStudySchema.partial();

export const listQuerySchema = z.object({
  page:   z.coerce.number().int().positive().default(1),
  limit:  z.coerce.number().int().positive().max(100).default(10),
  type:   z.string().optional(),
  status: z.string().optional(),
  tag:    z.string().optional(),
  search: z.string().optional(),
});

export const uuidParamSchema = z.object({ id:   z.string().uuid() });
export const slugParamSchema = z.object({ slug: z.string().min(1) });

export type CreateCaseStudyInput = z.infer<typeof createCaseStudySchema>;
export type UpdateCaseStudyInput = z.infer<typeof updateCaseStudySchema>;
export type ListQueryInput       = z.infer<typeof listQuerySchema>;