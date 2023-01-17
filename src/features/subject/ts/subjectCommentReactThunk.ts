import { toast } from "react-toastify";
import { subjectCommentActions } from "../";
import { subjectCommentApi, subjectCommentReactApi } from "../../../api";
import { Dispatch } from "../../../app/store";
import { CommentReactEntity, CommentReactRequest } from "../../../model";

export const subjectCommentReactThunk = {
  getByUserIdAndCommentIdList:
    (userId: number, commentIdList: number[]) => async (dispatch: Dispatch) => {
      dispatch(subjectCommentActions.setReacting(true));
      const response = await subjectCommentReactApi.getByUserIdAndCommentIdList(
        userId,
        commentIdList,
      );
      if (response.code === 200) {
        dispatch(subjectCommentActions.setUserReactList(response.data));
      } else {
        toast.warning("Failed");
        console.log(response);
      }
      dispatch(subjectCommentActions.setReacting(false));
    },
  add: (commentReact: CommentReactRequest) => async (dispatch: Dispatch) => {
    dispatch(subjectCommentActions.setReacting(true));
    const response = await subjectCommentReactApi.add(commentReact);
    if (response.code === 200) {
      const newComment = await subjectCommentApi.getById(commentReact.commentId);
      dispatch(
        subjectCommentActions.replaceById({
          id: commentReact.commentId,
          newComment: newComment.data,
        }),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
    dispatch(subjectCommentActions.setReacting(false));
  },
  update:
    (id: number, commentReact: CommentReactRequest) =>
    async (dispatch: Dispatch) => {
      dispatch(subjectCommentActions.setReacting(true));
      const response = await subjectCommentReactApi.update(id, commentReact);
      if (response.code === 200) {
        const newComment = await subjectCommentApi.getById(commentReact.commentId);
        dispatch(
          subjectCommentActions.replaceById({
            id: commentReact.commentId,
            newComment: newComment.data,
          }),
        );
      } else {
        toast.warning("Failed");
        console.log(response);
      }
      dispatch(subjectCommentActions.setReacting(false));
    },
  delete: (commentReact: CommentReactEntity) => async (dispatch: Dispatch) => {
    dispatch(subjectCommentActions.setReacting(true));
    const response = await subjectCommentReactApi.delete(commentReact.id);
    if (response.code === 200) {
      const newComment = await subjectCommentApi.getById(commentReact.commentId);
      dispatch(
        subjectCommentActions.replaceById({
          id: commentReact.commentId,
          newComment: newComment.data,
        }),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
    dispatch(subjectCommentActions.setReacting(false));
  },
};
