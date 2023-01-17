import { toast } from "react-toastify";
import { subjectActions } from "../";
import { subjectApi } from "../../../api";
import { Dispatch } from "../../../app/store";
import { SubjectRequest } from "../../../model";

export const subjectThunk = {
  fetchAll: () => async (dispatch: Dispatch) => {
    dispatch(subjectActions.setLoading(true));
    const response = await subjectApi.getAll();
    dispatch(subjectActions.setSubjectList(response.data));
    dispatch(subjectActions.setLoading(false));
  },
  add: (subject: SubjectRequest) => async (dispatch: Dispatch) => {
    dispatch(subjectActions.setLoading(true));
    const response = await subjectApi.add(subject);
    dispatch(subjectActions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(subjectThunk.fetchAll());
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  edit: (id: number, subject: SubjectRequest) => async (dispatch: Dispatch) => {
    dispatch(subjectActions.setLoading(true));
    const response = await subjectApi.update(id, subject);
    dispatch(subjectActions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(subjectThunk.fetchAll());
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  delete: (id: number) => async (dispatch: Dispatch) => {
    dispatch(subjectActions.setLoading(true));
    const response = await subjectApi.delete(id);
    dispatch(subjectActions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(subjectThunk.fetchAll());
      dispatch(subjectActions.setDeleteId(undefined));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
};
