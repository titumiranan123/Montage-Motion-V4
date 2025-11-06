export interface ITestimonial {
  id?: string;
  name: string;
  designation: string;
  image: string;
  thumbnail?: string;
  video_message?: string;
  message?: string;
  position?: number;
  category: "message" | "video_message";

  type:
    | "home"
    | "shorts"
    | "talkinghead"
    | "podcast"
    | "saas"
    | "thumbnail"
    | "about";
}
