import { toast } from "react-toastify";
import authApi from "../../api/auth/authApi";
import { Dispatch } from "../../app/store";
import { UserLogin, UserRequest } from "../../model";
import { saveToken, saveUser } from "../../util";
import { authActions } from "./authSlice";

export const authThunk = {
  login: (user: UserLogin) => async (dispatch: Dispatch) => {
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
  resign: (user: UserRequest) => async (dispatch: Dispatch) => {
    dispatch(authActions.setLoading(true));
    const response = await authApi.resign(user);

    if (response.data) {
      dispatch(authActions.setResignBackdropOpen(false));
      toast.success("Resign Success");
    } else {
      toast.warning(response.massage);
    }
    dispatch(authActions.setLoading(false));
  },
};
