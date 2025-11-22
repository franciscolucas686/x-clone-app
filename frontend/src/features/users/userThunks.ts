import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { RootState } from "../../app/store";
import type { User } from "./types";

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
>("users/toggleFollow", async (userId) => {
  const response = await api.post(`/follow/${userId}/toggle/`);
  const { is_following } = response.data;

  return { userId, isFollowing: is_following };
});

export const fetchUserByUsername = createAsyncThunk<
  User,
  string,
  { state: RootState; rejectValue: string }
>(
  "users/fetchUserByUsername",
  async (username, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const loggerdUsername = auth.user?.username;

      const endpoint =
        username === loggerdUsername ? "/profile/" : `/users/${username}/`;

      const response = await api.get(endpoint);
      const data = response.data;
      return {
        id: data.id,
        username: data.username,
        name: data.name,
        avatar_url: data.avatar_url,
        followers_count: data.followers_count,
        following_count: data.following_count,
        joined_display: data.joined_display,
        is_following: data.is_following ?? false,
        posts_count: data.posts_count,
      };
    } catch (error: unknown) {
      console.error("Erro ao buscar o usuário:", error);
      return rejectWithValue("Erro ao buscar o usuário.");
    }
  }
);
