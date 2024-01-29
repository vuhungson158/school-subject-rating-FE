import {toast} from "react-toastify";
import {AppThunk, ThunkActionDispatch} from "./store";
import {LocalStorageUtil} from "../util";
import authApi from "../api/authApi";
import {Login, Request} from "../model/authModel";
import {authReduxActions} from "./authSlice";

const authThunk = {
    login: (user: Login): AppThunk => async (dispatch: ThunkActionDispatch) => {
        dispatch(authReduxActions.setLoading(true));
        const response = await authApi.login(user);
        const data = response.data;
        console.log(data);

        if (data) {
            dispatch(authReduxActions.setToken(data.token));
            LocalStorageUtil.saveToken(data.token);
            dispatch(authReduxActions.setUser(data.user));
            LocalStorageUtil.saveUser(data.user);

            dispatch(authReduxActions.setLoginBackdropOpen(false));
            toast.success("Login Success");
        } else {
            toast.warning(response.massage);
        }
        dispatch(authReduxActions.setLoading(false));
    },
    resign: (user: Request) => async (dispatch: ThunkActionDispatch) => {
        dispatch(authReduxActions.setLoading(true));
        const response = await authApi.resign(user);

        if (response.data) {
            dispatch(authReduxActions.setResignBackdropOpen(false));
            toast.success("Resign Success");
        } else {
            toast.warning(response.massage);
        }
        dispatch(authReduxActions.setLoading(false));
        dispatch(authThunk.login({
            email: user.email,
            password: user.password
        }));
    },
    logout: () => async (dispatch: ThunkActionDispatch) => {
        LocalStorageUtil.removeToken();
        LocalStorageUtil.removeUser();
        dispatch(authReduxActions.removeToken());
        dispatch(authReduxActions.removeUser());
        // dispatch(subjectRatingActions.setRating(undefined));
    },
};

export default authThunk;
