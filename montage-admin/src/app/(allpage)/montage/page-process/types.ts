export interface ProcessStep {
  icon: string;
  alt: string;
  title: string;
  description: string;
  isHiden: boolean;
}

export interface ProcessSchema {
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  type: string;
  image?: string;
  alt?: string;
  process_steps: ProcessStep[];
}
