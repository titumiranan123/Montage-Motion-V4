type sectionName =
  | "short-hero"
  | "work"
  | "before_after"
  | "common_service"
  | "shorts_service"
  | "pricing"
  | "testimonial"
  | "process"
  | "industry"
  | "shorts_insight"
  | "whychooseus"
  | "faq"
  | "common_contact"
  | "podacast-hero"
  | "workwithcompany-2-line"
  | "podcast_contact"
  | "saas-hero"
  | "home-brand"
  | "saas_customer"
  | "whysaas_video"
  | "thumbnail_hero";

interface SectionItem {
  section_name: sectionName;
  visible: boolean;
}
export interface ServiceItem {
  service_title: string;
  service_description: string;
  image: string;
  alt: string;
  href?: string;
  available_section?: SectionItem[];
}

export interface PageService {
  type: string;
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  services: ServiceItem[];
}
