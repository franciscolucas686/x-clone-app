import { createSlice } from "@reduxjs/toolkit";
import type { UsersState } from "./types";
import {
  fetchFollowers,
  fetchFollowing,
  fetchUserByUsername,
  fetchUsers,
  toggleFollow,
} from "./userThunks";

const initialState: UsersState = {
  selectedUser: null,
  loading: false,

  list: [],

  followers: [],
  following: [],

  followersNext: null,
  followingNext: null,

  hasMoreFollowers: true,
  hasMoreFollowing: true,

  loadingFollowers: false,
  loadingFollowing: false,

  loadingFollowIds: [],

  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearFollowLists(state) {
      state.followers = [];
      state.following = [];
      state.followersNext = null;
      state.followingNext = null;
      state.hasMoreFollowers = true;
      state.hasMoreFollowing = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;

        state.followers = [];
        state.following = [];
        state.followersNext = null;
        state.followingNext = null;
        state.hasMoreFollowers = true;
        state.hasMoreFollowing = true;
      })
      .addCase(fetchUserByUsername.rejected, (state) => {
        state.loading = false;
        state.selectedUser = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      .addCase(toggleFollow.pending, (state, action) => {
        state.loadingFollowIds.push(action.meta.arg);
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        const { userId, isFollowing, delta } = action.payload;

        const target = state.list.find((u) => u.id === userId);
        if (target) {
          target.is_following = isFollowing;
          target.followers_count = (target?.followers_count || 0) + delta;
        }

        if (state.selectedUser?.id === userId) {
          state.selectedUser.is_following = isFollowing;
          state.selectedUser.followers_count =
            (state.selectedUser.followers_count || 0) + delta;
        }

        state.loadingFollowIds = state.loadingFollowIds.filter(
          (id) => id !== userId
        );
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        state.loadingFollowIds = state.loadingFollowIds.filter(
          (id) => id !== action.meta.arg
        );
      })

      .addCase(fetchFollowers.pending, (state) => {
        state.loadingFollowers = true;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        const { results, next } = action.payload;

        if (!state.followersNext) {
          state.followers = results;
        } else {
          state.followers.push(...results);
        }

        state.followersNext = next;
        state.hasMoreFollowers = next !== null;
        state.loadingFollowers = false;
      })
      .addCase(fetchFollowers.rejected, (state) => {
        state.loadingFollowers = false;
      })

      .addCase(fetchFollowing.pending, (state) => {
        state.loadingFollowing = true;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        const { results, next } = action.payload;

        if (!state.followingNext) {
          state.following = results;
        } else {
          state.following.push(...results);
        }

        state.followingNext = next;
        state.hasMoreFollowing = next !== null;
        state.loadingFollowing = false;
      })
      .addCase(fetchFollowing.rejected, (state) => {
        state.loadingFollowing = false;
      });
  },
});

export const { clearFollowLists } = usersSlice.actions;
export default usersSlice.reducer;
