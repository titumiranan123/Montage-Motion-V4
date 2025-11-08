export type SectionType =
  | "podcast"
  | "shorts"
  | "thumbnail"
  | "saas"
  | "talkinghead"
  | "home"
  | "about";

export interface whychooseus_item {
  title: string;
  description: string;
  icon: string;
  alt: string;
  position?: number;
}

export interface whychooseus_Section {
  type: SectionType;
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  whychooseus_items: whychooseus_item[];
}
