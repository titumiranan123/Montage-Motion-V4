import { z } from "zod";
/** ───────────────────────────────────────────────
 *  Media Item Schema (matches IHeaderMedia)
 *  ─────────────────────────────────────────────── */
export const HeaderMediaSchema = z.object({
  id: z.string().uuid().optional(),
  header_id: z.string().uuid().optional(),
  image_url: z.string().url({ message: "Invalid image URL" }),
  alt: z.string().min(1, { message: "Alt text is required" }),
  video_url: z.string().url({ message: "Invalid video URL" }),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});
/** ───────────────────────────────────────────────
 *  Main Page Header Schema (matches IPageHeader)
 *  ─────────────────────────────────────────────── */
export const PageHeaderSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.string(),
  page_title: z.string().optional(),
  page_subtitle: z.string().min(1, { message: "Page subtitle is required" }),
  description: z.string().optional(),
  cta_primary_link: z
    .string()
    .url({ message: "Must be a valid URL" })
    .optional(),
  // ✅ Nested media array
  media: z.array(HeaderMediaSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

/** ───────────────────────────────────────────────
 *  Export Inferred Types
 *  ─────────────────────────────────────────────── */
export type IHeaderMedia = z.infer<typeof HeaderMediaSchema>;
export type IPageHeader = z.infer<typeof PageHeaderSchema>;
