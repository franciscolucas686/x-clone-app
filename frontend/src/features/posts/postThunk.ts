import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "../posts/types"
import api from "../../api/axios";

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Post[]>("/api/posts/");
    return response.data;
  } catch (err) {
    console.log(err)
    return rejectWithValue("Falha ao carregar posts");
  }
});