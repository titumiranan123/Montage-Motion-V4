type sectionName =
  | "short-hero"
  | "home-hero"
  | "podcast-hero"
  | "work"
  | "testimonial"
  | "pricing"
  | "service"
  | "process"
  | "faq"
  | "whychooseus"
  | "contact"
  | "our-clients"
  | "shorts_service"
  | "insight"
  | "before_after_section"
  | "industry"
  | "whysaas_video";

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
