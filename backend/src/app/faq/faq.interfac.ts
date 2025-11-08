interface Item {
  id: string;
  faq_id: string;
  question: string;
  answer: string;
  is_visible: boolean;
  position: number;
}

interface InfoSection {
  image_url: string;
  name: string;
  designation: string;
  description: string;
  button_link: string;
  is_global?: boolean;
}

export interface IFaq {
  id?: string;
  title: string;
  sub_title: string;
  is_visible: boolean;
  faqs: Item[];
  type:
    | "home"
    | "shorts"
    | "talkinghead"
    | "podcast"
    | "thumbnail"
    | "advertising"
    | "saas"
    | "about";
  info_section?: InfoSection;
}
