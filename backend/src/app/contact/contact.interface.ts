export interface IContact {
  id?: string;
  name: string;
  email: string;
  message: string;
  interestIn: string;
  created_at?: Date;
  updated_at?: Date;
}
