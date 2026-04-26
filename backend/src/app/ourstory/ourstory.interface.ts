export type StoryType =
  | "podcast"
  | "shorts"
  | "thumbnail"
  | "saas"
  | "home"
  | "talkinghead";

export interface StoryStep {
  title: string;
  description?: string;
  image?: string;
  alt?: string;
  order_index?: number;
  is_hidden?: boolean;
}

export interface StorySchema {
  type: StoryType;
  tag: string;
  heading_part1: string;
  heading_part2?: string;
  paragraph?: string;
  image?: string;
  alt?: string;
  ourstory_steps: StoryStep[];
}