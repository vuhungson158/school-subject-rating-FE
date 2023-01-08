import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../model";

interface AuthState {
  isLoading: boolean;
  token?: string;
  user?: User;
  loginBackdropOpen: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  token: undefined,
  user: undefined,
  loginBackdropOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginBackdropOpen: (state, action: PayloadAction<boolean>) => {
      state.loginBackdropOpen = action.payload;
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
const authReducer = authSlice.reducer;
export default authReducer;
