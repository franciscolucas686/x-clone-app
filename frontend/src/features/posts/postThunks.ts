import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { Comment, Post } from "./types";

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Post[]>("/api/posts/");
    return data;
  } catch (err) {
    console.error("fetchPosts error:", err);
    return rejectWithValue("Erro ao buscar posts");
  }
});

export const createPost = createAsyncThunk<
  Post,
  { text: string },
  { rejectValue: string }
>("posts/createPost", async ({ text }, { rejectWithValue }) => {
  try {
    const { data } = await api.post<Post>("/api/posts/", { text });
    return data;
  } catch (err) {
    console.error("createPost error:", err);
    return rejectWithValue("Erro ao criar post");
  }
});

export const createComment = createAsyncThunk<
  Comment,
  { postId: number; text: string },
  { rejectValue: string }
>("posts/createComment", async ({ postId, text }, { rejectWithValue }) => {
  try {
    const { data } = await api.post<Comment>(`/api/posts/${postId}/comment/`, {
      text,
    });
    return data;
  } catch (err) {
    console.error("createComment error:", err);
    return rejectWithValue("Erro ao enviar comentário");
  }
});

export const toggleLike = createAsyncThunk<
  { postId: number; is_liked: boolean; likes_delta: number; serverPost?: Post },
  { postId: number },
  { rejectValue: string }
>("posts/toggleLike", async ({ postId }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/api/posts/${postId}/like/`);

    if (
      data &&
      typeof data === "object" &&
      "id" in data &&
      "likes_count" in data
    ) {
      const serverPost = data as Post;
      return {
        postId,
        is_liked: serverPost.is_liked ?? true,
        likes_delta: 0,
        serverPost,
      };
    }

    const message: string = data?.message ?? "";
    const isLiked = message === "Curtido";
    const likes_delta = isLiked ? 1 : -1;
    return { postId, is_liked: isLiked, likes_delta };
  } catch (err) {
    console.error("toggleLike error:", err);
    return rejectWithValue("Erro ao curtir/descurtir post");
  }
});
