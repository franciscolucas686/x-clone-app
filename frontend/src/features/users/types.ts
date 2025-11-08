export interface User {
  id: number;
  username: string;
  name: string;
  avatar: string;
  joined_display?: string;
  followers_count?: number;
  following_count?: number;
  is_following?: boolean;
  following_count?: number;
  followers_count?: number;
}

export interface UsersState {
  list: User[];
  loading: boolean;
  loadingFollowIds: number[];
  error: string | null;
  selectedUser: User | null;
}
