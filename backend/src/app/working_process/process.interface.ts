export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
  isHiden: boolean;
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
  type: ProcessType;
  image: string;
  alt: string;
  process_steps: ProcessStep[];
}

export interface IWorkingProcess {
  tag: string;
  heading: string;
}
