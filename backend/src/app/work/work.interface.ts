export interface IVideo {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  video_link: string;
  is_visible: boolean;
  is_feature: boolean;
  position?: number;
  type:
    | "home"
    | "shorts"
    | "talkinghead"
    | "podcast"
    | "thumbnail"
    | "saas"
    | "about";
}
