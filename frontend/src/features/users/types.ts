export interface User {
  id: number;
  username: string;
  name: string;
  avatar: string;
  joined_display?: string;
  is_following?: boolean;
}

export interface UsersState {
  list: User[];
  loading: boolean;
  loadingFollowIds: number[];
  error: string | null;
}
