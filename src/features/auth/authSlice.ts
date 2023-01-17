import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../model";

interface AuthState {
  isLoading: boolean;
  token?: string;
  user?: User;
  loginBackdropOpen: boolean;
  resignBackdropOpen: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  token: undefined,
  user: undefined,
  loginBackdropOpen: false,
  resignBackdropOpen: false,
};

const authSlice = createSlice({
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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
