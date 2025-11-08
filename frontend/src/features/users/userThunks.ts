import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { User } from "./types";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await api.get<User[]>("/users/");
    return response.data;
  }
);

export const toggleFollow = createAsyncThunk<
  { userId: number; isFollowing: boolean },
  number
>("users/toggleFollow", async (userId) => {
  const response = await api.post(`/follow/${userId}/toggle/`);
  const isFollowing = response.data.message === "Você começou a seguir.";
  return { userId, isFollowing };
});

export const fetchUserByUsername = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("users/fetchUserByUsername", async (username, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users/${username}/`);
    return response.data as User;
  } catch (error: unknown) {
    console.error("Erro ao buscar o usuário:", error);
    return rejectWithValue("Erro ao buscar o usuário.");
  }
});
