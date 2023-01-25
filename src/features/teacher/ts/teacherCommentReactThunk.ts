import { toast } from "react-toastify";
import { teacherCommentActions } from "..";
import { teacherCommentApi, teacherCommentReactApi } from "../../../api";
import { Dispatch } from "../../../app/store";
import { TeacherCommentReactEntity, TeacherCommentReactRequest } from "../../../model";

export const teacherCommentReactThunk = {
  getByUserIdAndCommentIdList:
    (userId: number, commentIdList: number[]) => async (dispatch: Dispatch) => {
      dispatch(teacherCommentActions.setReacting(true));
      const response = await teacherCommentReactApi.getByUserIdAndCommentIdList(
        userId,
        commentIdList,
      );
      if (response.code === 200) {
        dispatch(teacherCommentActions.setUserReactList(response.data));
      } else {
        toast.warning("Failed");
        console.log(response);
      }
      dispatch(teacherCommentActions.setReacting(false));
    },
  add: (commentReact: TeacherCommentReactRequest) => async (dispatch: Dispatch) => {
    dispatch(teacherCommentActions.setReacting(true));
    const response = await teacherCommentReactApi.add(commentReact);
    if (response.code === 200) {
      const newComment = await teacherCommentApi.getById(commentReact.commentId);
      dispatch(
        teacherCommentActions.replaceById({
          id: commentReact.commentId,
          newComment: newComment.data,
        }),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
    dispatch(teacherCommentActions.setReacting(false));
  },
  update:
    (id: number, commentReact: TeacherCommentReactRequest) =>
    async (dispatch: Dispatch) => {
      dispatch(teacherCommentActions.setReacting(true));
      const response = await teacherCommentReactApi.update(id, commentReact);
      if (response.code === 200) {
        const newComment = await teacherCommentApi.getById(commentReact.commentId);
        dispatch(
          teacherCommentActions.replaceById({
            id: commentReact.commentId,
            newComment: newComment.data,
          }),
        );
      } else {
        toast.warning("Failed");
        console.log(response);
      }
      dispatch(teacherCommentActions.setReacting(false));
    },
  delete: (commentReact: TeacherCommentReactEntity) => async (dispatch: Dispatch) => {
    dispatch(teacherCommentActions.setReacting(true));
    const response = await teacherCommentReactApi.delete(commentReact.id);
    if (response.code === 200) {
      const newComment = await teacherCommentApi.getById(commentReact.commentId);
      dispatch(
        teacherCommentActions.replaceById({
          id: commentReact.commentId,
          newComment: newComment.data,
        }),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
    dispatch(teacherCommentActions.setReacting(false));
  },
};
