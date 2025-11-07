import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    users: userReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;