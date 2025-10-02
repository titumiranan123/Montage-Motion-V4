export interface IVisitor {
  id?: number;
  ip: string;
  country: string;
  region: string;
  city: string;
  provider: string;
  device: string;
  os: string;
  browser: string;
  visit_count: number;
  first_visit: Date;
  last_visit: Date;
  is_duplicate: boolean;
  user_agent: string;
}
