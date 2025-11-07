// src/features/users/usersThunks.ts
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
  const response = await api.post(`/follow/${userId}/`);
  const isFollowing = response.data.message === "Você começou a seguir.";
  return { userId, isFollowing };
});
