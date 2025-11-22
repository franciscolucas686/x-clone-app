import type { User } from "../users/types";

export interface PostComment {
  id: number;
  user: User;
  text: string;
  post: number;
  created_at: string;
}

export interface Post {
  id: number;
  user: User;
  text: string;
  created_at: string;
  comments: PostComment[];
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

