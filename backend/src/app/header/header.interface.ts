export interface IHeaderMedia {
  id?: string;
  header_id?: string;
  image_url: string;
  alt: string;
  video_url: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IPageHeader {
  id?: string;
  type:
    | "home"
    | "shorts"
    | "talkinghead"
    | "podcast"
    | "saas"
    | "thumbnail"
    | "about"
    | "carrer";
  page_subtitle: string;
  page_title?: string;
  description?: string;
  cta_primary_link?: string;
  media?: IHeaderMedia[];
  created_at?: Date;
  updated_at?: Date;
}
