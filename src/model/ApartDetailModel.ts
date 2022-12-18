export interface CommentCreator {
  id: number;
  name: string;
  email: string;
  phone?: any;
  address?: any;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: number;
  apatoId: number;
  userId: number;
  comment: string;
  rating: number;
  created_at: Date;
  deleted: boolean
}

export interface ApartDetailModel {
  id: number;
  title: string;
  address: string;
  image: string[];
  area: number;
  price: number;
  detail: string;
  total_rating: number;
  user_id: number;
  created_at: Date;
  creator: CommentCreator;
  comments: Comment[];
}
