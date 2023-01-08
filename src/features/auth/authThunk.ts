import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authApi from "../../api/auth/authApi";
import { RootState } from "../../app/store";
import { UserLogin } from "../../model";
import { saveToken, saveUser } from "../../util";
import { authActions } from "./authSlice";

export const authThunk = {
  login:
    (user: UserLogin) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
      dispatch(authActions.setLoading(true));
      const response = await authApi.login(user);

      if (response.data) {
        dispatch(authActions.setToken(response.data.token));
        saveToken(response.data.token);
        dispatch(authActions.setUser(response.data.user));
        saveUser(response.data.user);

        dispatch(authActions.setLoginBackdropOpen(false));
        toast.success("Login Success");
      } else {
        toast.warning(response.massage);
      }
      dispatch(authActions.setLoading(false));
    },
};
