import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post, Comment } from "../../features/posts/types";
import { fetchPosts, createPost, toggleLike, createComment } from "./postThunks";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Buscar Posts ---
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // --- Criar Post ---
    builder.addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
      const p: Post = action.payload; // <- tipagem explícita de p
      state.posts.unshift(p);
    });

    // --- Curtir / Descurtir ---
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      const { postId, is_liked, likes_count } = action.payload;
      const p = state.posts.find((post) => post.id === postId);
      if (p) {
        p.is_liked = is_liked;
        p.likes_count += likes_count;
      }
    });

    // --- Adicionar Comentário ---
    builder.addCase(createComment.fulfilled, (state, action) => {
      const c: Comment = action.payload;
      const p = state.posts.find((post) => post.id === c.post);
      if (p) {
        p.comments.push(c);
        p.comments_count += 1;
      }
    });
  },
});

export default postSlice.reducer;
