export interface IFaqItem {
  id?: string;
  faq_section_id?: string;

  question: string;
  answer: string;

  sort_order?: number;
  is_visible: boolean;

  created_at?: string;
  updated_at?: string;
}

export interface IFaqSection {
  id?: string;

  section_tag: string;
  section_title: string;
  section_description: string;

  contact_image: string;
  contact_alt?: string;

  contact_heading: string;
  contact_description?: string;

  contact_name?: string;
  contact_position?: string;
  contact_link?: string;

  is_active?: boolean;

  faqs?: IFaqItem[];

  created_at?: string;
  updated_at?: string;
}
