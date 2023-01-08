import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import teacherApi from "../../api/teacher/teacherApi";
import { RootState } from "../../app/store";
import { TeacherRequest } from "../../model";
import { teacherActions } from "./teacherSlice";

export const teacherThunk = {
  fetchAll:
    () => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
      dispatch(teacherActions.setLoading(true));
      const response = await teacherApi.getAll();
      if (response.code === 200) {
        dispatch(teacherActions.setTeacherList(response.data));
      } else {
        toast.warning("Failed");
        console.log(response);
      }
      dispatch(teacherActions.setLoading(false));
    },
  add:
    (teacher: TeacherRequest) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
      dispatch(teacherActions.setLoading(true));
      const response = await teacherApi.add(teacher);
      dispatch(teacherActions.setLoading(false));
      if (response.code === 200) {
        toast.success(response.massage);
        dispatch(teacherThunk.fetchAll());
      } else {
        toast.warning("Failed");
        console.log(response);
      }
    },
};
