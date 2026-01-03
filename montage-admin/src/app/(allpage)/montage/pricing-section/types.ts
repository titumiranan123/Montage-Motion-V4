interface IFeature {
  feature: string;
  is_active: boolean;
  position?: number;
}

export interface IPackage {
  id?: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  billing_cycle: string;
  features: IFeature[];
  ishiden: boolean;
  position: number;
}

export interface IPagePricePlan {
  id?: string;
  type: string;
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  packages: IPackage[];
}
