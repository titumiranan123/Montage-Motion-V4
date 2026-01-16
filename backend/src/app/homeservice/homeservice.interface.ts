type sectionName =
  | "short_hero"
  | "home_hero"
  | "podcast_hero"
  | "work"
  | "testimonial"
  | "pricing"
  | "service"
  | "process"
  | "faq"
  | "whychooseus"
  | "contact"
  | "our_clients"
  | "shorts_service"
  | "podcast_insight"
  | "insight"
  | "before_after_section"
  | "industry"
  | "whysaas_video";

export interface SectionItem {
  section_name: sectionName;
  visible: boolean;
}
export interface ServiceItem {
  service_title: string;
  service_type: string;
  service_description: string;
  image: string;
  alt: string;
  icon?: string;
  icon_alt?: string;
  href?: string;

  available_section?: SectionItem[];
}

export interface PageService {
  type: string;
  tag: string;
  heading_part1: string;
  heading_part2?: string;
  paragraph: string;
  services: ServiceItem[];
}
