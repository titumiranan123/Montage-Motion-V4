export type SectionType =
  | "podcast"
  | "shorts"
  | "thumbnail"
  | "saas"
  | "talkinghead"
  | "home";

export interface ServiceItem {
  service_title: string;
  service_description: string;
  image: string;
  alt: string;
}

export interface ServiceSection {
  type: SectionType;
  tag: string;
  heading: [string, string];
  paragraph: string;
  services: ServiceItem[];
}
