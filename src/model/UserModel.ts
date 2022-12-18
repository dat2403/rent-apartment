export default interface UserModel {
  id?: number;
  token?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  status?: boolean;
}
