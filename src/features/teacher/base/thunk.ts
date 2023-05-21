import { toast } from "react-toastify";
import { Dispatch } from "../../../app/store";
import api from "./api";
import { Request } from "./model";
import { actions } from "./slice";

const thunk = {
  fetchAll: () => async (dispatch: Dispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.getAll();
    if (response.code === 200) {
      dispatch(actions.setList(response.data));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
    dispatch(actions.setLoading(false));
  },
  add: (teacher: Request) => async (dispatch: Dispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.add(teacher);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(thunk.fetchAll());
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
};
export default thunk;