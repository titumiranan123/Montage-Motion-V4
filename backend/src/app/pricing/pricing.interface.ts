interface IFeature {
  feature: string;
  is_active: boolean | string;
  position: number;
}
export interface IPackage {
  id: string;
  title: string;
  description: string;
  currency: string;
  price: number;
  billing_cycle: string;
  features: IFeature[];
  is_visible: boolean;
  type: "shorts" | "podcast" | "talkinghead" | "saas" | "thumbnails";
  position: number;
}
