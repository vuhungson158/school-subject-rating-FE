import { toast } from "react-toastify";
import { ThunkActionDispatch } from "../../app/store";
import commonApi from "../../api/commonApi";
import { actions } from "../../app/commonSlice";

const thunk = {
  fetchStatistics: () => async (dispatch: ThunkActionDispatch) => {
    dispatch(actions.setLoading(true));
    const response = await commonApi.getStatistics();
    if (response.code === 200) {
      dispatch(actions.setStatistics(response.data));
    } else {
      toast.warn("Failed");
      console.log(response);
    }
    dispatch(actions.setLoading(false));
  },
};

export default thunk;
