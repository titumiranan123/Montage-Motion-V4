import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  isPublish: z.boolean({
    message: "isPublish must be a boolean",
  }),
});
