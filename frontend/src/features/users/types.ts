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
  selectedUser: User | null;

  list: User[];

  loading: boolean;

  followers: User[];
  following: User[];

  followersNext: string | null;
  followingNext: string | null;

  hasMoreFollowers: boolean;
  hasMoreFollowing: boolean;

  loadingFollowers: boolean;
  loadingFollowing: boolean;

  loadingFollowIds: number[];

  error: string | null;
}

export interface PaginatedUsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

