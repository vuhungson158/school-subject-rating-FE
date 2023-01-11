import { toast } from "react-toastify";
import subjectCommentApi from "../../../api/subject/subjectCommentApi";
import { Dispatch } from "../../../app/store";
import { CommentRequest } from "../../../model";
import { subjectCommentActions } from "./subjectCommentSlice";

export const subjectCommentThunk = {
  fetchBySubjectIdAndUserId:
    (subjectId: number, userId: number) => async (dispatch: Dispatch) => {
      dispatch(subjectCommentActions.setLoading(true));
      dispatch(subjectCommentActions.setComment(undefined));
      const response = await subjectCommentApi.getBySubjectIdAndUserId(
        subjectId,
        userId,
      );
      if (response.code === 200) {
        dispatch(subjectCommentActions.setComment(response.data));
      }else{
        toast.warn("Failed")
        console.log(response);
      }
      dispatch(subjectCommentActions.setLoading(false));
      return response.data;
    },
  add: (comment: CommentRequest) => async (dispatch: Dispatch) => {
    dispatch(subjectCommentActions.setLoading(true));
    const response = await subjectCommentApi.add(comment);
    dispatch(subjectCommentActions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(
        subjectCommentThunk.fetchBySubjectIdAndUserId(
          comment.subjectId,
          comment.userId,
        ),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  edit:
    (commentId: number, comment: CommentRequest) => async (dispatch: Dispatch) => {
      dispatch(subjectCommentActions.setLoading(true));
      const response = await subjectCommentApi.update(commentId, comment);
      dispatch(subjectCommentActions.setLoading(false));
      if (response.code === 200) {
        toast.success(response.massage);
        dispatch(
          subjectCommentThunk.fetchBySubjectIdAndUserId(
            comment.subjectId,
            comment.userId,
          ),
        );
      } else {
        toast.warning("Failed");
        console.log(response);
      }
    },
};
