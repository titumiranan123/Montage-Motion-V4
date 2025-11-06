import z from "zod";

export const BrandImageSchema = z.object({
  id: z.string().optional(),
  type: z.string({ error: "Page type is required" }),
  alt: z.string({ error: "Page type is required" }),
  height: z.string().optional(),
  width: z.string().optional(),
  sortOrder: z.number().optional(),
  image: z.string({ error: "Image url is required" }).url("Invalid image url"),
  ishide: z.boolean().default(true),
});
