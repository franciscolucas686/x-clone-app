export interface User {
  id: number;
  username: string;
  name: string;
  avatar_url: string;
  joined_display?: string;
  followers_count?: number;
  following_count?: number;
  is_following?: boolean;
  posts_count?: number;
}

export interface UsersState {
  list: User[];
  loading: boolean;
  loadingFollowIds: number[];
  error: string | null;
  selectedUser: User | null;
}
