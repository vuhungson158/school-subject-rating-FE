import { toast } from "react-toastify";
import { teacherCommentActions } from "..";
import { teacherCommentApi } from "../../../api";
import { Dispatch } from "../../../app/store";
import { TeacherCommentRequest } from "../../../model";

export const teacherCommentThunk = {
  fetchByTeacherIdAndUserId:
    (teacherId: number, userId: number) => async (dispatch: Dispatch) => {
      dispatch(teacherCommentActions.setLoading(true));
      dispatch(teacherCommentActions.setComment(undefined));
      const response = await teacherCommentApi.getByTeacherIdAndUserId(
        teacherId,
        userId,
      );
      if (response.code === 200) {
        dispatch(teacherCommentActions.setComment(response.data));
      } else {
        toast.warn("Failed");
        console.log(response);
      }
      dispatch(teacherCommentActions.setLoading(false));
      return response.data;
    },
  fetchTopByTeacherId:
    (teacherId: number, limit: number, page: number) =>
    async (dispatch: Dispatch) => {
      dispatch(teacherCommentActions.setLoading(true));
      dispatch(teacherCommentActions.setCommentList({ total: 0, list: [] }));
      const response = await teacherCommentApi.getTopByTeacherId(
        teacherId,
        limit,
        page,
      );
      if (response.code === 200) {
        dispatch(teacherCommentActions.setCommentList(response.data));
      } else {
        toast.warn("Failed");
        console.log(response);
      }
      dispatch(teacherCommentActions.setLoading(false));
      return response.data;
    },
  add: (comment: TeacherCommentRequest) => async (dispatch: Dispatch) => {
    dispatch(teacherCommentActions.setLoading(true));
    const response = await teacherCommentApi.add(comment);
    dispatch(teacherCommentActions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(
        teacherCommentThunk.fetchByTeacherIdAndUserId(
          comment.teacherId,
          comment.userId,
        ),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  edit:
    (commentId: number, comment: TeacherCommentRequest) => async (dispatch: Dispatch) => {
      dispatch(teacherCommentActions.setLoading(true));
      const response = await teacherCommentApi.update(commentId, comment);
      dispatch(teacherCommentActions.setLoading(false));
      if (response.code === 200) {
        toast.success(response.massage);
        dispatch(
          teacherCommentThunk.fetchByTeacherIdAndUserId(
            comment.teacherId,
            comment.userId,
          ),
        );
      } else {
        toast.warning("Failed");
        console.log(response);
      }
    },
};
