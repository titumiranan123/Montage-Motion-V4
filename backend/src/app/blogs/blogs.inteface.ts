export interface IBlog {
  id?: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  keywords?: string[];
  short_description: string;
  description: string;
  image: string;
  alt: string;
  is_publish?: boolean;
  is_feature?: boolean;
  position?: number;
  created_at?: Date;
  updated_at?: Date;
}
