export interface IJob {
  id?: string;
  job_title: string;
  positions_available: number;
  deadline: string; // or Date
  description: string;

  // 🔹 Employment type options
  employment_type:
    | "Full time"
    | "Part time"
    | "Internship"
    | "Contract"
    | "Temporary"
    | "Freelance"
    | "Volunteer"
    | "Apprenticeship"
    | "Commission";

  // 🔹 Work arrangement options
  work_arrangement:
    | "Remote"
    | "On-site"
    | "Hybrid"
    | "In House"
    | "Flexible"
    | "Field Work";

  // 🔹 Optional salary block
  salary?: {
    amount: number;
    unit: string; // e.g. "/Month", "/Hour", "/Year", "/Project"
    currency: string; // e.g. "$", "BDT", "EUR"
  };

  applylink: string;
  created_at?: Date;
  updated_at?: Date;
}
export type pageType =
  | "podcast"
  | "shorts"
  | "thumbnail"
  | "saas"
  | "talkinghead"
  | "home"
  | "about";

export interface IJobpost {
  id?: string;
  type: pageType;
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  jobposts: IJob[];
}
