import z from "zod";

export const BrandImageSchema = z.object({
  id: z.string().optional(),
  type: z.string({ error: "Page type is required" }),
  image: z.string({ error: "Image url is required" }).url("Invalid image url"),
  ishide: z.boolean().default(true),
});
