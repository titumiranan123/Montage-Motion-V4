export interface SeoMeta {
  id: number;
  page_name:
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website"
    | "about"
    | "terms"
    | "privacy"
    | "contact"
    | "blog";

  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  robots?:
    | "index, follow"
    | "noindex, nofollow"
    | "index, nofollow"
    | "noindex, follow";

  schema?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
