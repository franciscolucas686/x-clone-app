import type { User } from "../users/types";

export interface Comment {
  id: number;
  user: User;
  text: string;
  created_at: string;
}

export interface Post {
  id: number;
  user: User;
  text: string;
  created_at: string;
  comments: Comment[];
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}