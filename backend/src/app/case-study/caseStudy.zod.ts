// =============================================
// schemas/caseStudy.zod.ts
// =============================================
import { z } from 'zod';

// ---- enums ----
export const caseStudyTypeEnum   = z.enum(['client_success', 'product', 'research', 'business']);
export const caseStudyStatusEnum = z.enum(['draft', 'review', 'published', 'archived']);

// ---- sub schemas ----
export const heroStatSchema = z.object({
  value: z.string().min(1).max(50),
  label: z.string().min(1).max(150),
});

export const metricSchema = z.object({
  value: z.string().min(1).max(50),
  label: z.string().min(1).max(150),
  sub:   z.string().max(200).optional(),
});

export const challengeItemSchema = z.object({
  title: z.string().min(1).max(300),
  desc:  z.string().min(1),
});

export const challengeSchema = z.object({
  intro: z.string().min(1),
  items: z.array(challengeItemSchema).default([]),
});

export const solutionPhaseSchema = z.object({
  phase: z.string().min(1).max(200),
  time:  z.string().max(100),
  desc:  z.string().min(1),
});

export const solutionSchema = z.object({
  intro:  z.string().min(1),
  phases: z.array(solutionPhaseSchema).default([]),
});

export const outcomeStatSchema = z.object({
  label: z.string().min(1).max(150),
  value: z.string().min(1).max(100),
});

export const outcomeSchema = z.object({
  description: z.string().min(1),
  before:      z.array(outcomeStatSchema).default([]),
  after:       z.array(outcomeStatSchema).default([]),
});

export const testimonialSchema = z.object({
  quote:   z.string().min(1),
  name:    z.string().min(1).max(200),
  role:    z.string().max(200),
  avatar:  z.string().url().optional(),
});

export const relatedItemSchema = z.object({
  tag:   z.string().max(100),
  title: z.string().max(500),
  meta:  z.string().max(200),
});

export const mediaItemSchema = z.object({
  type:    z.string().max(50),
  url:     z.string().url(),
  alt:     z.string().max(500).optional(),
  caption: z.string().optional(),
});

export const seoSchema = z.object({
  meta_title:       z.string().max(70).optional(),
  meta_description: z.string().max(160).optional(),
  og_image:         z.string().url().optional(),
  canonical:        z.string().url().optional(),
  calendly_url:     z.string().url().optional(),
});

// ---- case study ----
export const createCaseStudySchema = z.object({
  slug:            z.string().min(1).max(255).regex(/^[a-z0-9-]+$/, 'Slug: lowercase, numbers, hyphens only'),
  title_normal:    z.string().max(300).optional(),
  title_highlight: z.string().max(300).optional(),
  title_suffix:    z.string().max(300).optional(),
  description:     z.string().optional(),
  type:            caseStudyTypeEnum,
  status:          caseStudyStatusEnum.default('draft'),
  author_id:       z.string().uuid().optional(),
  client_id:       z.string().uuid().optional(),
  published_at:    z.string().date().optional(),
  read_time_min:   z.number().int().min(1).max(120).optional(),
  tag_slugs:       z.array(z.string()).default([]),
  hero_stats:      z.array(heroStatSchema).default([]),
  metrics:         z.array(metricSchema).default([]),
  challenge:       challengeSchema.optional(),
  solution:        solutionSchema.optional(),
  outcome:         outcomeSchema.optional(),
  testimonials:    z.array(testimonialSchema).default([]),
  related:         z.array(relatedItemSchema).default([]),
  media:           z.array(mediaItemSchema).default([]),
  seo:             seoSchema.optional(),
});

export const updateCaseStudySchema = createCaseStudySchema
  .partial()
  .omit({ slug: true })
  .extend({
    slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/).optional(),
  });

export const listQuerySchema = z.object({
  page:   z.coerce.number().int().min(1).default(1),
  limit:  z.coerce.number().int().min(1).max(100).default(10),
  type:   caseStudyTypeEnum.optional(),
  status: caseStudyStatusEnum.optional(),
  search: z.string().optional(),
  tag:    z.string().optional(),
});

// ---- client ----
export const createClientSchema = z.object({
  name:      z.string().min(1).max(255),
  meta:      z.string().max(500).optional(),
  industry:  z.string().max(150).optional(),
  team_size: z.string().max(100).optional(),
  stage:     z.string().max(100).optional(),
  location:  z.string().max(150).optional(),
  website:   z.string().url().optional(),
  logo_url:  z.string().url().optional(),
  tags:      z.array(z.string()).default([]),
});

export const updateClientSchema = createClientSchema.partial();

// ---- author ----
export const createAuthorSchema = z.object({
  name:       z.string().min(1).max(150),
  email:      z.string().email(),
  role:       z.string().max(100).optional(),
  avatar_url: z.string().url().optional(),
  bio:        z.string().optional(),
});

export const updateAuthorSchema = createAuthorSchema.partial();

// ---- tag ----
export const createTagSchema = z.object({
  name:      z.string().min(1).max(100),
  slug:      z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  color_hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

// ---- param schemas ----
export const uuidParamSchema = z.object({
  id: z.string().uuid('Invalid UUID'),
});

export const slugParamSchema = z.object({
  slug: z.string().min(1),
});

// =============================================
// inferred types  (সব এখানে export)
// =============================================
export type CreateCaseStudyInput = z.infer<typeof createCaseStudySchema>;
export type UpdateCaseStudyInput = z.infer<typeof updateCaseStudySchema>;
export type ListQueryInput       = z.infer<typeof listQuerySchema>;
export type CreateClientInput    = z.infer<typeof createClientSchema>;
export type UpdateClientInput    = z.infer<typeof updateClientSchema>;
export type CreateAuthorInput    = z.infer<typeof createAuthorSchema>;
export type UpdateAuthorInput    = z.infer<typeof updateAuthorSchema>;
export type CreateTagInput       = z.infer<typeof createTagSchema>;