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
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  services: ServiceItem[];
}
