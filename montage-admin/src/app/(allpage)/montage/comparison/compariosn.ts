export type EntryType = "item" | "bonus";

export interface ComparisonEntry {
  entry_type: EntryType;
  text: string;
  position: number;
}

export interface ComparisonColumnForm {
  type: "montage" | "agencies" | "freelancers";
  title: string | null;
  image?: string;
  bonus_title?: string;
  entries: ComparisonEntry[];
}

export interface ComparisonFormData {
  page: string;
  tag: string;
  heading_title: string;
  paragraph: string;
  columns: [ComparisonColumnForm, ComparisonColumnForm, ComparisonColumnForm];
}

export const defaultComparisonValues: ComparisonFormData = {
  page: "",
  tag: "",
  heading_title: "",
  paragraph: "",
  columns: [
    {
      type: "montage",
      title: null,
      image:
        "https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/production/montagemotion-footerlogo.png",
      bonus_title: "",
      entries: [
        { entry_type: "item", text: "", position: 1 },
        { entry_type: "bonus", text: "", position: 1 },
      ],
    },
    {
      type: "agencies",
      title: "Other Agencies",
      entries: [{ entry_type: "item", text: "", position: 1 }],
    },
    {
      type: "freelancers",
      title: "Freelancers",
      entries: [{ entry_type: "item", text: "", position: 1 }],
    },
  ],
};
