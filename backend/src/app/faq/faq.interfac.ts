interface Item {
  id: string;
  faq_id: string;
  question: string;
  answer: string;
  is_visible: boolean;
  position: number;
}

interface InfoSection {
  image_url: string; // example: "https://cdn.ictbangla.com/team/safwan.jpg"
  name: string; // example: "Safwan Wafif"
  designation: string; // example: "Project Co-ordinator"
  description: string; // example: "Still curious? Book a call and we’ll help you figure out the best move for your brand."
  button_text: string; // example: "Book a Call"
  button_link: string; // example: "https://calendly.com/safwanwafif"
  is_global?: boolean; // ✅ to indicate if it’s shared across pages
}

export interface IFaq {
  id?: string;
  title: string;
  sub_title: string;
  is_visible: boolean;
  faqs: Item[];
  type:
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website";
  info_section?: InfoSection;
}
