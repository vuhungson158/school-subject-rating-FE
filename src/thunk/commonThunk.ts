import {toast} from "react-toastify";
import {ThunkActionDispatch} from "../app/store";
import commonApi from "../api/commonApi";
import {commonReduxActions} from "../app/commonSlice";

const commonThunk = {
    fetchStatistics: () => async (dispatch: ThunkActionDispatch) => {
        dispatch(commonReduxActions.setLoading(true));
        const response = await commonApi.getStatistics();
        if (response.code === 200) {
            dispatch(commonReduxActions.setStatistics(response.data));
        } else {
            toast.warn("Failed");
            console.log(response);
        }
        dispatch(commonReduxActions.setLoading(false));
    },
};

export default commonThunk;
