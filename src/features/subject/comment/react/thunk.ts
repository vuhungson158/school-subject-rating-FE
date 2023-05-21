import { toast } from "react-toastify";
import { Dispatch } from "../../../../app/store";
import commentApi from "../api";
import { actions } from "../slice";
import api from "./api";
import { Entity, Request } from "./model";

const thunk = {
  getByUserIdAndCommentIdList:
    (userId: number, commentIdList: number[]) => async (dispatch: Dispatch) => {
      dispatch(actions.setReacting(true));
      const response = await api.getByUserIdAndCommentIdList(userId, commentIdList);
      if (response.code === 200) {
        dispatch(actions.setUserReactList(response.data));
      } else {
        toast.warning("Failed");
        console.log(response);
      }
      dispatch(actions.setReacting(false));
    },
  add: (commentReact: Request) => async (dispatch: Dispatch) => {
    dispatch(actions.setReacting(true));
    const response = await api.add(commentReact);
    if (response.code === 200) {
      const newComment = await commentApi.getById(commentReact.commentId);
      dispatch(
        actions.replaceById({
          id: commentReact.commentId,
          newComment: newComment.data,
        }),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
    dispatch(actions.setReacting(false));
  },
  update: (id: number, commentReact: Request) => async (dispatch: Dispatch) => {
    dispatch(actions.setReacting(true));
    const response = await api.update(id, commentReact);
    if (response.code === 200) {
      const newComment = await commentApi.getById(commentReact.commentId);
      dispatch(
        actions.replaceById({
          id: commentReact.commentId,
          newComment: newComment.data,
        }),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
    dispatch(actions.setReacting(false));
  },
  delete: (commentReact: Entity) => async (dispatch: Dispatch) => {
    dispatch(actions.setReacting(true));
    const response = await api.delete(commentReact.id);
    if (response.code === 200) {
      const newComment = await commentApi.getById(commentReact.commentId);
      dispatch(
        actions.replaceById({
          id: commentReact.commentId,
          newComment: newComment.data,
        }),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
    dispatch(actions.setReacting(false));
  },
};
export default thunk;
