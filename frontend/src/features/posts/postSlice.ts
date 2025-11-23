import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  createPost,
  fetchFollowingPosts,
  fetchPosts,
  fetchUserPosts,
  toggleLike,
} from "./postThunks";
import type { Post } from "./types";
export interface PostState {
  items: Post[];
  nextUrl: string | null;
  hasMore: boolean;

  userPosts: {
    items: Post[];
    loading: boolean;
    error: string | null;
    nextUrl: string | null;
    hasMore: boolean;
    count: number;
  };

  loading: boolean;
  creating: boolean;
  commentingPostIds: number[];
  likingPostIds: number[];
  error: string | null;
}

export const initialState: PostState = {
  items: [],
  nextUrl: null,
  hasMore: true,

  userPosts: {
    items: [],
    loading: false,
    error: null,
    nextUrl: null,
    hasMore: true,
    count: 0,
  },

  loading: false,
  creating: false,
  likingPostIds: [],
  commentingPostIds: [],
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearUserPosts(state) {
      state.userPosts.items = [];
      state.userPosts.loading = false;
      state.userPosts.error = null;
      state.userPosts.nextUrl = null;
      state.userPosts.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao buscar posts";
      })

      .addCase(fetchFollowingPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFollowingPosts.fulfilled,
        (
          state,
          action: PayloadAction<{
            results: Post[];
            next: string | null;
            isInitialLoad: boolean;
          }>
        ) => {
          state.loading = false;
          state.nextUrl = action.payload.next;

          if (action.payload.isInitialLoad) {
            state.items = action.payload.results;
          } else {
            state.items.push(...action.payload.results);
          }
        }
      )
      .addCase(fetchFollowingPosts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Erro ao buscar posts dos seguidos";
      })

      .addCase(createPost.pending, (state) => {
        state.creating = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.creating = false;
        state.error = action.error.message ?? "Erro ao criar post";
      })

      .addCase(toggleLike.pending, (state, action) => {
        state.likingPostIds.push(action.meta.arg.postId);
      })
      .addCase(
        toggleLike.fulfilled,
        (
          state,
          action: PayloadAction<{
            postId: number;
            is_liked: boolean;
            likes_delta: number;
            serverPost?: Post;
          }>
        ) => {
          const { postId, is_liked, likes_delta, serverPost } = action.payload;

          if (serverPost) {
            const index = state.items.findIndex((p) => p.id === serverPost.id);
            if (index !== -1) state.items[index] = serverPost;
          } else {
            const post = state.items.find((p) => p.id === postId);
            if (post) {
              post.is_liked = is_liked;
              post.likes_count += likes_delta;
            }
          }

          if (serverPost) {
            const userIndex = state.userPosts.items.findIndex(
              (p) => p.id === serverPost.id
            );
            if (userIndex !== -1) state.userPosts.items[userIndex] = serverPost;
          } else {
            const userPost = state.userPosts.items.find((p) => p.id === postId);
            if (userPost) {
              userPost.is_liked = is_liked;
              userPost.likes_count += likes_delta;
            }
          }

          state.likingPostIds = state.likingPostIds.filter(
            (id) => id !== postId
          );
        }
      )
      .addCase(toggleLike.rejected, (state, action) => {
        state.likingPostIds = state.likingPostIds.filter(
          (id) => id !== action.meta.arg.postId
        );
        state.error = action.payload ?? "Erro ao curtir post";
      })

      .addCase(createComment.pending, (state, action) => {
        state.commentingPostIds.push(action.meta.arg.postId);
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const newComment = action.payload;
        state.commentingPostIds = state.commentingPostIds.filter(
          (id) => id !== newComment.post
        );
        const post = state.items.find((p) => p.id === newComment.post);
        if (post) {
          post.comments.unshift(newComment);
          post.comments_count += 1;
        }
        const userPost = state.userPosts.items.find(
          (p) => p.id === newComment.post
        );
        if (userPost) {
          userPost.comments.unshift(newComment);
          userPost.comments_count += 1;
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? "Erro ao criar comentário";
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPosts.loading = true;
        state.userPosts.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        const isInitialLoad = action.meta.arg.isInitialLoad;

        state.userPosts.loading = false;
        state.userPosts.nextUrl = action.payload.next;
        state.userPosts.count = action.payload.count;
        state.userPosts.hasMore = action.payload.next !== null;

        if (isInitialLoad) {
          state.userPosts.items = action.payload.results;
        } else {
          state.userPosts.items.push(...action.payload.results);
        }
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.userPosts.loading = false;
        state.userPosts.error =
          typeof action.payload === "string"
            ? action.payload
            : "Erro ao buscar posts do usuário";
      });
  },
});

export const { clearUserPosts } = postSlice.actions;
export default postSlice.reducer;
