import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Comment, Post } from "./types";
import api from "../../api/axios";


export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<Post[]>("/api/posts/");
      return data;
    } catch (error: unknown) {
      console.error("Erro ao buscar posts:", error);
      return rejectWithValue("Erro ao buscar posts");
    }
  }
);

export const createPost = createAsyncThunk<Post, { text: string }>(
  "posts/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<Post>("/api/posts/", payload);
      return data;
    } catch (error: unknown) {
      console.error("Erro ao criar post:", error);
      return rejectWithValue("Erro ao criar post");
    }
  }
);

export const createComment = createAsyncThunk<
  Comment,
  { postId: number; text: string }
>("posts/createComment", async ({ postId, text }, { rejectWithValue }) => {
  try {
    const { data } = await api.post<Comment>(`/api/posts/${postId}/comment/`, {
      text,
    });
    return data;
  } catch (error: unknown) {
    console.error("Erro ao criar comentário:", error);
    return rejectWithValue("Erro ao criar comentário");
  }
});

export const toggleLike = createAsyncThunk<
  { postId: number; is_liked: boolean; likes_count: number },
  { postId: number },                                        
  { rejectValue: string }
>(
  "posts/toggleLike",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ message: string }>(`/api/posts/${postId}/like/`);

      const isLiked = data.message === "Curtido";

      const likes_count = isLiked ? 1 : -1;

      return { postId, is_liked: isLiked, likes_count };
    } catch (error) {
      console.error("toggleLike error:", error);
      return rejectWithValue("Erro ao curtir/descurtir post");
    }
  }
);