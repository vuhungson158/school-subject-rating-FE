import { toast } from "react-toastify";
import { authApi } from "../../api";
import { Dispatch } from "../../app/store";
import { UserLogin, UserRequest } from "../../model";
import { LocalStorageUtil } from "../../util";
import { subjectRatingActions } from "../subject";
import { authActions } from "./";

export const authThunk = {
  login: (user: UserLogin) => async (dispatch: Dispatch) => {
    dispatch(authActions.setLoading(true));
    const response = await authApi.login(user);

    if (response.data) {
      dispatch(authActions.setToken(response.data.token));
      LocalStorageUtil.saveToken(response.data.token);
      dispatch(authActions.setUser(response.data.user));
      LocalStorageUtil.saveUser(response.data.user);

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
    dispatch(authThunk.login({ username: user.email, password: user.password }));
  },
  logout: () => async (dispatch: Dispatch) => {
    LocalStorageUtil.removeToken();
    LocalStorageUtil.removeUser();
    dispatch(authActions.removeToken());
    dispatch(authActions.removeUser());
    dispatch(subjectRatingActions.setRating(undefined));
  },
};
