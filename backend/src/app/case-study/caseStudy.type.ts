// =============================================
// types/caseStudy.types.ts
// =============================================

export type CaseStudyType   = 'client_success' | 'product' | 'research' | 'business';
export type CaseStudyStatus = 'draft' | 'review' | 'published' | 'archived';

export interface HeroStat {
  value: string;
  label: string;
}

export interface Metric {
  value: string;
  label: string;
  sub?: string;
}

export interface ChallengeItem {
  title: string;
  desc:  string;
}

export interface Challenge {
  intro: string;
  items: ChallengeItem[];
}

export interface SolutionPhase {
  phase: string;
  time:  string;
  desc:  string;
}

export interface Solution {
  intro:  string;
  phases: SolutionPhase[];
}

export interface OutcomeStat {
  label: string;
  value: string;
}

export interface Outcome {
  description: string;
  before:      OutcomeStat[];
  after:       OutcomeStat[];
}

export interface Testimonial {
  quote:   string;
  name:    string;
  role:    string;
  avatar?: string;
}

export interface RelatedItem {
  tag:   string;
  title: string;
  meta:  string;
}

export interface MediaItem {
  type:     string;
  url:      string;
  alt?:     string;
  caption?: string;
}

export interface Seo {
  meta_title?:       string;
  meta_description?: string;
  og_image?:         string;
  canonical?:        string;
  calendly_url?:     string;
}

export interface ClientRecord {
  id:         string;
  name:       string;
  meta:       string | null;
  industry:   string | null;
  team_size:  string | null;
  stage:      string | null;
  location:   string | null;
  website:    string | null;
  logo_url:   string | null;
  tags:       string[];
  created_at: Date;
}

export interface Author {
  id:         string;
  name:       string;
  email:      string;
  role:       string | null;
  avatar_url: string | null;
  bio:        string | null;
  created_at: Date;
}

export interface Tag {
  id:        string;
  name:      string;
  slug:      string;
  color_hex: string | null;
}

export interface CaseStudy {
  id:              string;
  slug:            string;
  title_normal:    string | null;
  title_highlight: string | null;
  title_suffix:    string | null;
  description:     string | null;
  type:            CaseStudyType;
  status:          CaseStudyStatus;
  author_id:       string | null;
  client_id:       string | null;
  published_at:    Date | null;
  read_time_min:   number | null;
  tag_slugs:       string[];
  hero_stats:      HeroStat[];
  metrics:         Metric[];
  challenge:       Challenge;
  solution:        Solution;
  outcome:         Outcome;
  testimonials:    Testimonial[];
  related:         RelatedItem[];
  media:           MediaItem[];
  seo:             Seo;
  created_at:      Date;
  updated_at:      Date;
}

// shape that matches caseStudyData exactly
export interface CaseStudyData {
  hero: {
    title: {
      normal:    string;
      highlight: string;
      suffix:    string;
    };
    description: string;
    tags:        string[];
    stats:       HeroStat[];
  };
  metrics:     Metric[];
  client: {
    name:        string;
    meta:        string;
    tags:        string[];
    description: string;
    sidebar: {
      industry: string;
      teamSize: string;
      stage:    string;
      location: string;
    };
  } | null;
  challenge:   Challenge;
  solution:    Solution;
  outcome:     Outcome;
  testimonial: Omit<Testimonial, 'avatar'> | null;
  more:        RelatedItem[];
}