import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { User, UsersState } from "./types";
import { fetchUserByUsername, fetchUsers, toggleFollow } from "./userThunks";

const initialState: UsersState = {
  list: [],
  loading: false,
  loadingFollowIds: [],
  error: null,
  selectedUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserByUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserByUsername.rejected, (state) => {
        state.loading = false;
        state.selectedUser = null;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message ?? "Erro ao buscar usuários";
        state.loading = false;
      })
      .addCase(toggleFollow.pending, (state, action) => {
        state.loadingFollowIds.push(action.meta.arg);
      })
      .addCase(
        toggleFollow.fulfilled,
        (
          state,
          action: PayloadAction<{ userId: number; isFollowing: boolean }>
        ) => {
          const { userId, isFollowing } = action.payload;
          const user = state.list.find((u) => u.id === userId);
          if (user) user.is_following = isFollowing;
          state.loadingFollowIds = state.loadingFollowIds.filter(
            (id) => id !== userId
          );
        }
      )
      .addCase(toggleFollow.rejected, (state, action) => {
        state.loadingFollowIds = state.loadingFollowIds.filter(
          (id) => id !== action.meta.arg
        );
      });
  },
});

export default usersSlice.reducer;
