// process.interface.ts
import { z } from "zod";

export const ProcessStepSchema = z.object({
  icon: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  isHiden: z.boolean().default(false),
});

export const ProcessSchemaZod = z.object({
  type: z.enum(["podcast", "shorts", "thumbnail", "saas", "talkinghead"]),
  image: z.string().min(1, "Image is required"),
  alt: z.string().optional(),
  process_steps: z
    .array(ProcessStepSchema)
    .min(1, "At least one step is required"),
});

export type ProcessType = z.infer<typeof ProcessSchemaZod>;
export type ProcessStep = z.infer<typeof ProcessStepSchema>;
