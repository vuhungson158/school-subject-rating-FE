import { Dispatch } from "../../../app/store";

export const subjectConditionThunk = {
  fetchAll:
    (subjectId: number, userId: number) => async (dispatch: Dispatch) => {
      // dispatch(subjectCommentActions.setLoading(true));
      // dispatch(subjectCommentActions.setComment(undefined));
      // const response = await subjectCommentApi.getBySubjectIdAndUserId(
      //   subjectId,
      //   userId,
      // );
      // if (response.code === 200) {
      //   dispatch(subjectCommentActions.setComment(response.data));
      // } else {
      //   toast.warn("Failed");
      //   console.log(response);
      // }
      // dispatch(subjectCommentActions.setLoading(false));
      // return response.data;
    },
};
