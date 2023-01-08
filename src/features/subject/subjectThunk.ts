import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import subjectApi from "../../api/subject/subjectApi";
import { RootState } from "../../app/store";
import { subjectActions } from "./subjectSlice";

export const subjectThunk = {
  fetchAll:
    () => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
      dispatch(subjectActions.setLoading(true));
      const response = await subjectApi.getAll();
      dispatch(subjectActions.setSubjectList(response.data));
      dispatch(subjectActions.setLoading(false));
    },
};
