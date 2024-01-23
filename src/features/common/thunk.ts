import { toast } from "react-toastify";
import { ThunkActionDispatch } from "../../app/store";
import api from "./api";
import { actions } from "./slice";

const thunk = {
  fetchStatistics: () => async (dispatch: ThunkActionDispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.getStatistics();
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
