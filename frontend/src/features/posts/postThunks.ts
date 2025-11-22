import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import api from "../../api/axios";
import type { PostComment, Post } from "./types";
import type { PaginatedResponse } from "../../features/pagination/types";

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Post[]>("/posts/");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return [] as Post[];
      }
    }

    return rejectWithValue("Erro ao buscar posts");
  }
});

export const fetchFollowingPosts = createAsyncThunk<
  {
    results: Post[];
    next: string | null;
    isInitialLoad: boolean;
  },
  { nextUrl?: string | null } | void,
  { rejectValue: string }
>(
  "posts/fetchFollowingPosts",
  async (arg, { rejectWithValue }) => {
    try {
      const nextUrl =
        arg && "nextUrl" in arg ? arg.nextUrl : undefined;

      const endpoint = nextUrl ?? "/posts/following/";

      const { data } = await api.get<PaginatedResponse<Post>>(endpoint);

      return {
        results: data.results,
        next: data.next,
        isInitialLoad: !nextUrl,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.detail ??
            "Erro ao buscar posts"
        );
      }

      return rejectWithValue("Erro desconhecido ao buscar posts");
    }
  }
);


export const createPost = createAsyncThunk<
  Post,
  { text: string },
  { rejectValue: string }
>("posts/createPost", async ({ text }, { rejectWithValue }) => {
  try {
    const { data } = await api.post<Post>("/posts/", { text });
    return data;
  } catch (err) {
    console.error("createPost error:", err);
    return rejectWithValue("Erro ao criar post");
  }
});

export const createComment = createAsyncThunk<
  PostComment,
  { postId: number; text: string },
  { rejectValue: string }
>("posts/createComment", async ({ postId, text }, { rejectWithValue }) => {
  try {
    const { data } = await api.post<PostComment>(`/posts/${postId}/comment/`, {
      text,
    });
    return data;
  } catch (err) {
    const error = err as AxiosError;
    console.error("createComment error:", error.response?.data || error.message);
    return rejectWithValue("Erro ao enviar comentário");
  }
});

export const toggleLike = createAsyncThunk<
  { postId: number; is_liked: boolean; likes_delta: number; serverPost?: Post },
  { postId: number },
  { rejectValue: string }
>("posts/toggleLike", async ({ postId }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/posts/${postId}/like/`);

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
