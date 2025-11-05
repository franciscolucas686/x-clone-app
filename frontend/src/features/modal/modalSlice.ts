import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type ModalType = "login" | "register" | "editProfile" | null;

interface ModalState {
  current: ModalType;
}

const initialState: ModalState = {
  current: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Exclude<ModalType, null>>) => {
      state.current = action.payload;
    },
    closeModal: (state) => {
      state.current = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
