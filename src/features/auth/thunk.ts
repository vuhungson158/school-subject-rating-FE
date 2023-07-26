import {toast} from "react-toastify";
import {actions} from ".";
import {AppThunk, Dispatch} from "../../app/store";
import {LocalStorageUtil} from "../../util";
import {actions as subjectRatingActions} from "../subject/rating/slice";
import api from "./api";
import {Login, Request} from "./model";

const thunk = {
    login: (user: Login): AppThunk => async (dispatch: Dispatch) => {
        dispatch(actions.setLoading(true));
        const response = await api.login(user);
        const data = response.data;
        console.log(data);

        if (data) {
            dispatch(actions.setToken(data.token));
            LocalStorageUtil.saveToken(data.token);
            dispatch(actions.setUser(data.user));
            LocalStorageUtil.saveUser(data.user);

            dispatch(actions.setLoginBackdropOpen(false));
            toast.success("Login Success");
        } else {
            toast.warning(response.massage);
        }
        dispatch(actions.setLoading(false));
    },
    resign: (user: Request) => async (dispatch: Dispatch) => {
        dispatch(actions.setLoading(true));
        const response = await api.resign(user);

        if (response.data) {
            dispatch(actions.setResignBackdropOpen(false));
            toast.success("Resign Success");
        } else {
            toast.warning(response.massage);
        }
        dispatch(actions.setLoading(false));
        dispatch(thunk.login({
            email: user.email,
            password: user.password
        }));
    },
    logout: () => async (dispatch: Dispatch) => {
        LocalStorageUtil.removeToken();
        LocalStorageUtil.removeUser();
        dispatch(actions.removeToken());
        dispatch(actions.removeUser());
        dispatch(subjectRatingActions.setRating(undefined));
    },
};

export default thunk;
