export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface IHeader {
  id?: string;
  title: string;
  description: string;
  book_link: string;
  thumbnail: string;
  alt: string;
  video_link: string;
  isActive?: string;
  type: "home" | "shorts" | "talkinghead" | "podcast" | "saas" | "thumbnail";
}

export interface IService {
  id?: string;
  title: string;
  description: string;
  image: string;
  isPublish: string;
  href: string;
  position: number;
  is_active: boolean;
}

export interface IPackage {
  id?: number;
  is_visible: boolean;
  name: "Basic" | "Standard" | "Premium";
  title: string;
  description: string;
  currency: string;
  price: number;
  unit: string;
  features: IFeature[];
  note: string;
  purchase_link: string;
  pricing_type: "single" | "combo";
  type:
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website";
}
export interface IFeature {
  id: string;
  feature: string;
  is_present: boolean;
  is_active: boolean;
  position: number;
}
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
  type: string;
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

export interface MemberProfile {
  id?: string;
  name: string;
  designation?: string;
  photourl: string;
  alt?: string;

  position?: number;
  created_at?: string;
  updated_at?: string;
}

export default interface ITestimonial {
  id?: string;
  name: string;
  designation: string;
  image: string;
  video_message?: string;
  message?: string;
  position?: number;
  category: "message" | "video_message";
  type: "home" | "shorts" | "talkinghead" | "podcast" | "saas" | "thumbnail";
}
