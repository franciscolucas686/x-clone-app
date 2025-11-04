// authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { User } from "./authSlice";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const loginUser = createAsyncThunk<
  LoginResponse,      
  LoginCredentials   
>(
  "auth/loginUser",
  async (credentials) => {
    const res = await api.post("/token/", credentials);
    const token = res.data.access;
    const userRes = await api.get("/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { token, user: userRes.data } as LoginResponse;
  }
);

export const restoreUser = createAsyncThunk<User | null>(
  "auth/restoreUser",
  async () => {
    const token = localStorage.getItem("access");
    if (!token) return null;

    const res = await api.get("/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);
