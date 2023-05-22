import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "./model";

interface State {
  isLoading: boolean;
  token?: string;
  user?: Entity;
  loginBackdropOpen: boolean;
  resignBackdropOpen: boolean;
}

const initialState: State = {
  isLoading: false,
  token: undefined,
  user: undefined,
  loginBackdropOpen: false,
  resignBackdropOpen: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginBackdropOpen: (state, action: PayloadAction<boolean>) => {
      state.loginBackdropOpen = action.payload;
    },
    setResignBackdropOpen: (state, action: PayloadAction<boolean>) => {
      state.resignBackdropOpen = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = undefined;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<Entity>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

export const actions = slice.actions;
export const authReducer = slice.reducer;
