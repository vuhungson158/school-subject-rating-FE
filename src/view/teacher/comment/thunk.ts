import { toast } from "react-toastify";
import { AppThunk, ThunkActionDispatch } from "../../../app/store";
import api from "./api";
import { Request } from "./model";
import { actions } from "./slice";

export const thunk = {
  fetchByTeacherIdAndUserId:
    (teacherId: number, userId: number): AppThunk =>
    async (dispatch: ThunkActionDispatch) => {
      dispatch(actions.setLoading(true));
      dispatch(actions.setComment(undefined));
      const response = await api.getByTeacherIdAndUserId(teacherId, userId);
      if (response.code === 200) {
        dispatch(actions.setComment(response.data));
      } else {
        toast.warn("Failed");
        console.log(response);
      }
      dispatch(actions.setLoading(false));
      return response.data;
    },
  fetchTopByTeacherId:
    (teacherId: number, limit: number, page: number) =>
    async (dispatch: ThunkActionDispatch) => {
      dispatch(actions.setLoading(true));
      dispatch(actions.setCommentList({ total: 0, list: [] }));
      const response = await api.getTopByTeacherId(teacherId, limit, page);
      if (response.code === 200) {
        dispatch(actions.setCommentList(response.data));
      } else {
        toast.warn("Failed");
        console.log(response);
      }
      dispatch(actions.setLoading(false));
      return response.data;
    },
  add: (comment: Request) => async (dispatch: ThunkActionDispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.add(comment);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(thunk.fetchByTeacherIdAndUserId(comment.teacherId, comment.userId));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  edit:
    (commentId: number, comment: Request) =>
    async (dispatch: ThunkActionDispatch) => {
      dispatch(actions.setLoading(true));
      const response = await api.update(commentId, comment);
      dispatch(actions.setLoading(false));
      if (response.code === 200) {
        toast.success(response.massage);
        dispatch(thunk.fetchByTeacherIdAndUserId(comment.teacherId, comment.userId));
      } else {
        toast.warning("Failed");
        console.log(response);
      }
    },
};
