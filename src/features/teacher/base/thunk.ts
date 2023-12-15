import { toast } from "react-toastify";
import {AppThunk, Dispatch} from "../../../app/store";
import api from "./api";
import { TeacherRequestModel } from "../../../model/teacherModel";
import { actions } from "./slice";

const thunk = {
  fetchAll: (): AppThunk => async (dispatch: Dispatch) => {
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
  add: (teacher: TeacherRequestModel) => async (dispatch: Dispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.add(teacher);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      await dispatch(thunk.fetchAll());
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
};
export default thunk;