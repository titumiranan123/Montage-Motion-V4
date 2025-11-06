export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
  isHiden: boolean;
  alt: string;
}

export type ProcessType =
  | "podcast"
  | "shorts"
  | "thumbnail"
  | "saas"
  | "home"
  | "talkinghead";

export interface ProcessSchema {
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  image: string;
  alt: string;
  type: ProcessType;
  process_steps: ProcessStep[];
}
