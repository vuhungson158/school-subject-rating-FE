import { toast } from "react-toastify";
import { subjectRatingActions } from "../";
import { subjectRatingApi } from "../../../api";
import { Dispatch } from "../../../app/store";
import { SubjectRatingRequest } from "../../../model";

export const subjectRatingThunk = {
  fetchBySubjectIdAndUserId:
    (subjectId: number, userId: number) => async (dispatch: Dispatch) => {
      dispatch(subjectRatingActions.setLoading(true));
      dispatch(subjectRatingActions.setRating(undefined));
      const response = await subjectRatingApi.getBySubjectIdAndUserId(
        subjectId,
        userId,
      );
      if (response.code === 200) {
        dispatch(subjectRatingActions.setRating(response.data));
      }
      dispatch(subjectRatingActions.setLoading(false));
      return response.data;
    },
  fetchAverageBySubjectId: (subjectId: number) => async (dispatch: Dispatch) => {
    dispatch(subjectRatingActions.setLoading(true));
    dispatch(subjectRatingActions.setAverageRating(undefined));
    const response = await subjectRatingApi.getAverageBySubjectId(subjectId);
    if (response.code === 200) {
      dispatch(subjectRatingActions.setAverageRating(response.data));
    }
    dispatch(subjectRatingActions.setLoading(false));
    return response.data;
  },
  add: (rating: SubjectRatingRequest) => async (dispatch: Dispatch) => {
    dispatch(subjectRatingActions.setLoading(true));
    const response = await subjectRatingApi.add(rating);
    dispatch(subjectRatingActions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(
        subjectRatingThunk.fetchBySubjectIdAndUserId(
          rating.subjectId,
          rating.userId,
        ),
      );
      dispatch(subjectRatingThunk.fetchAverageBySubjectId(rating.subjectId));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  edit:
    (ratingId: number, rating: SubjectRatingRequest) =>
    async (dispatch: Dispatch) => {
      dispatch(subjectRatingActions.setLoading(true));
      const response = await subjectRatingApi.update(ratingId, rating);
      dispatch(subjectRatingActions.setLoading(false));
      if (response.code === 200) {
        toast.success(response.massage);
        dispatch(
          subjectRatingThunk.fetchBySubjectIdAndUserId(
            rating.subjectId,
            rating.userId,
          ),
        );
        dispatch(subjectRatingThunk.fetchAverageBySubjectId(rating.subjectId));
      } else {
        toast.warning("Failed");
        console.log(response);
      }
    },
};
