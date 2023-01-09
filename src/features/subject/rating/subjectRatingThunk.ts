import { toast } from "react-toastify";
import subjectRatingApi from "../../../api/subject/subjectRatingApi";
import { Dispatch } from "../../../app/store";
import { SubjectRatingRequest } from "../../../model";

export const subjectRatingThunk = {
  fetchBySubjectIdAndUserId:
    (subjectId: number, userId: number) => async (dispatch: Dispatch) => {
      dispatch(subjectActions.setRateLoading(true));
      const response = await subjectRatingApi.getBySubjectIdAndUserId(
        subjectId,
        userId,
      );
      dispatch(subjectActions.setRateLoading(false));
      return response.data;
    },
  add: (rating: SubjectRatingRequest) => async (dispatch: Dispatch) => {
    dispatch(subjectActions.setRateLoading(true));
    const response = await subjectRatingApi.add(rating);
    dispatch(subjectActions.setRateLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(
        subjectRatingThunk.fetchBySubjectIdAndUserId(
          rating.subjectId,
          rating.userId,
        ),
      );
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
};
