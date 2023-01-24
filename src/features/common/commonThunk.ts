import { toast } from "react-toastify";
import { commonApi } from "../../api";
import { Dispatch } from "../../app/store";
import { commonActions } from "./commonSlice";

export const commonThunk = {
  fetchStatistics: () => async (dispatch: Dispatch) => {
    dispatch(commonActions.setLoading(true));
    const response = await commonApi.getStatistics();
    if (response.code === 200) {
      dispatch(commonActions.setStatistics(response.data));
    } else {
      toast.warn("Failed");
      console.log(response);
    }
    dispatch(commonActions.setLoading(false));
  },
};
