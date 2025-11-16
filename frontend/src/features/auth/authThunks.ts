import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { translateError } from "../../utils/errors";
import type { User } from "../users/types";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface UpdateProfilePayload {
  name?: string;
  username?: string;
  password?: string;
  confirm_password?: string;
  avatar?: File | null;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await api.post("/token/", credentials);
    const token = res.data.access as string;

    const userRes = await api.get<User>("/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("🔍 Resposta do /profile/:", userRes.data);

    return { token, user: userRes.data };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue("Usuário ou senha incorretos!");
    }
    return rejectWithValue("Erro inesperado ao tentar fazer login.");
  }
});

export const registerUser = createAsyncThunk<
  LoginResponse,
  RegisterCredentials,
  { rejectValue: string }
>("auth/registerUser", async (credentials, { rejectWithValue }) => {
  try {
    await api.post("/register/", {
      username: credentials.username,
      name: credentials.name,
      password: credentials.password,
      confirm_password: credentials.confirmPassword,
    });

    const loginRes = await api.post("/token/", {
      username: credentials.username,
      password: credentials.password,
    });

    const token = loginRes.data.access;
    localStorage.setItem("access", token);

    const userRes = await api.get("/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { token, user: userRes.data } as LoginResponse;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const axiosError = err as { response?: { data?: unknown } };

      const raw = axiosError.response?.data;

      const message = typeof raw === "string" ? raw : JSON.stringify(raw);

      const translated = translateError(message);

      return rejectWithValue(translated);
    }

    return rejectWithValue("Erro desconhecido ao registrar usuário.");
  }
});

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

export const updateProfile = createAsyncThunk<
  User,
  UpdateProfilePayload,
  { rejectValue: string }
>("auth/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(key == "confirm_password" && !data.password)
      ) {
        formData.append(key, value instanceof File ? value : value);
      }
    });

    const res = await api.patch<User>("/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "response" in err &&
      (err as { response?: { data?: { detail?: string } } }).response?.data
    ) {
      const message =
        (err as { response?: { data?: { detail?: string } } }).response?.data
          ?.detail ?? "Erro ao atualizar perfil.";
      return rejectWithValue(message);
    }
    return rejectWithValue("Erro desconhecido.");
  }
});
