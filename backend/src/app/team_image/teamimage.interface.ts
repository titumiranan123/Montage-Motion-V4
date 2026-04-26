export interface IBrandImage {
  id: string;
  image: string;
  alt: string;
  type: string;

  is_hidden?: boolean; // default false
  order_index?: number;

  created_at?: Date;
  updated_at?: Date;
}