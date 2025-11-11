import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  createPost,
  fetchPosts,
  toggleLike,
} from "./postThunks";
import type { Comment, Post } from "./types";

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.items = action.payload;
      }
    );
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.items.unshift(action.payload);
      }
    );
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(
      createComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        const comment = action.payload;
        const p = state.items.find((x) => x.id === comment.post);
        if (p) {
          p.comments = [...p.comments, comment];
          p.comments_count = (p.comments_count ?? 0) + 1;
        }
      }
    );
    builder.addCase(createComment.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(toggleLike.fulfilled, (state, action) => {
      const payload = action.payload;
      const post = state.items.find((p) => p.id === payload.postId);
      if (!post) return;

      if (payload.serverPost) {
        post.likes_count = payload.serverPost.likes_count;
        post.is_liked = payload.serverPost.is_liked;
      } else {
        post.is_liked = payload.is_liked;
        post.likes_count = (post.likes_count ?? 0) + payload.likes_delta;
      }
    });
    builder.addCase(toggleLike.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
