import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { User } from "./types";
import type { RootState } from "../../app/store";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await api.get("/users/");
    return response.data.results;
  }
);

export const toggleFollow = createAsyncThunk<
  { userId: number; isFollowing: boolean },
  number,
  { state: RootState }
>("users/toggleFollow", async (userId, { getState, dispatch }) => {
  const response = await api.post(`/follow/${userId}/toggle/`);
  const { auth, users } = getState();

  if (users.selectedUser?.username) {
    await dispatch(fetchUserByUsername(users.selectedUser.username));
  }

  if (auth.user?.username) {
    await dispatch(fetchUserByUsername(auth.user.username));
  }

  return { userId, isFollowing: response.data.is_following };
});

export const fetchUserByUsername = createAsyncThunk<
  User,
  string,
  { state: RootState, rejectValue: string }
>(
  "users/fetchUserByUsername",
  async (username, { getState,  rejectWithValue }) => {
    try {
      const { auth } = getState();
      const loggerdUsername = auth.user?.username;

      const endpoint =
        username === loggerdUsername
          ? "/profile/"
          : `/users/${username}/`;

      const response = await api.get(endpoint);
      return response.data as User;
    } catch (error: unknown) {
      console.error("Erro ao buscar o usuário:", error);
      return rejectWithValue("Erro ao buscar o usuário.");
    }
  }
);
