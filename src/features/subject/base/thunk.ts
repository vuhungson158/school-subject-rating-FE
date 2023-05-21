import { toast } from "react-toastify";
import { AppThunk, Dispatch, RootState } from "../../../app/store";
import api from "./api";
import { Request } from "./model";
import { actions } from "./slice";

export const thunk = {
  fetchAll:
    (): AppThunk => async (dispatch: Dispatch, getState: () => RootState) => {
      const response = await api.getAll();
      dispatch(actions.setSubjectList(response.data));
    },
  add: (subject: Request) => async (dispatch: Dispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.add(subject);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(thunk.fetchAll());
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  edit: (id: number, subject: Request) => async (dispatch: Dispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.update(id, subject);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(thunk.fetchAll());
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  delete: (id: number) => async (dispatch: Dispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.delete(id);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(thunk.fetchAll());
      dispatch(actions.setDeleteId(undefined));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
};
