// career.zod.ts
import { z } from "zod";

// 🔹 Salary schema (optional)
export const salarySchema = z.object({
  amount: z.number().min(0, "Salary amount must be a positive number"),
  unit: z.string().min(1, "Salary unit is required"), // e.g. "/Month"
  currency: z.string().min(1, "Currency is required"), // e.g. "$"
});

// 🔹 Job post schema
export const jobPostSchema = z.object({
  id: z.string().uuid().optional(),
  jobTitle: z.string().min(1, "Job title is required"),
  positionsAvailable: z.number().min(1, "At least one position is required"),
  deadline: z.string().min(1, "Deadline is required"),
  description: z.string().min(1, "Description is required"),

  // Employment types
  employmentType: z.enum([
    "Full time",
    "Part time",
    "Internship",
    "Contract",
    "Temporary",
    "Freelance",
    "Volunteer",
    "Apprenticeship",
    "Commission",
  ]),

  // Work arrangements
  workArrangement: z.enum([
    "Remote",
    "On-site",
    "Hybrid",
    "In House",
    "Flexible",
    "Field Work",
  ]),

  salary: salarySchema.optional(),
  applylink: z.string().url("Apply link must be a valid URL"),

  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// 🔹 Career Page schema
export const careerPageSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.literal("career"),
  tag: z.string().min(1, "Tag is required"),
  heading_part1: z.string().min(1, "Heading part 1 is required"),
  heading_part2: z.string().optional(),
  paragraph: z.string().optional(),
  jobposts: z.array(jobPostSchema).optional(),
});
