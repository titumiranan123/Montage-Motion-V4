export interface SeoMeta {
  id: number;
  page_name:
    | "home"
    | "podcast"
    | "shorts"
    | "talking"
    | "saas"
    | "thumbnail"
    | "portfolio"
    | "career"
    | "contact"
    | "about"
    | "blog"
    | "terms"
    | "privacy"
    | "contact"
    | "refund";

  meta_title: string;
  meta_description: string;
  meta_keywords?: string;
  canonical_url?: string;
  meta_robots?:
    | "index, follow"
    | "noindex, nofollow"
    | "index, nofollow"
    | "noindex, follow";
  twitter_card_type: string;
  schema?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
