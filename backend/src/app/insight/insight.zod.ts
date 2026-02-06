import { z } from "zod";

export const StepSchema = z.object({
  step_order: z.number().int().min(1),
  title: z.string().min(1),
  heading: z.string().min(1),
  description: z.string().min(1),
  items: z.array(z.string().min(1)),
});

export const CreateStepsSchema = z.array(StepSchema);
export const CreateInsightSectionSchema = z.object({
  page: z.string().min(1),
  tag: z.string().min(1),
  heading_title: z.string().optional(),
  paragraph: z.string().optional(),
  steps: CreateStepsSchema,
});
export const UpdateInsightSectionSchema = CreateInsightSectionSchema.partial();
