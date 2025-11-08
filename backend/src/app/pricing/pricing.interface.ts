interface IFeature {
  feature: string;
  is_active: boolean | string;
  position?: number;
}
export interface IPackage {
  id: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  billing_cycle: string;
  features: IFeature[];
  ishiden: boolean;
  position: number;
}
export type pageType =
  | "podcast"
  | "shorts"
  | "thumbnail"
  | "saas"
  | "talkinghead"
  | "home"
  | "about";

export interface IPagePricePlan {
  id?: string;
  type: pageType;
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  packages: IPackage[];
}
