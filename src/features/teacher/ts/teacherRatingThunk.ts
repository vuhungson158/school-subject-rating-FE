import { toast } from "react-toastify";
import { teacherRatingActions } from "..";
import { teacherRatingApi } from "../../../api";
import { Dispatch } from "../../../app/store";
import { TeacherRatingRequest } from "../../../model";

export const teacherRatingThunk = {
  fetchByTeacherIdAndUserId:
    (teacherId: number, userId: number) => async (dispatch: Dispatch) => {
      dispatch(teacherRatingActions.setLoading(true));
      dispatch(teacherRatingActions.setRating(undefined));
      const response = await teacherRatingApi.getByTeacherIdAndUserId(
        teacherId,
        userId,
      );
      if (response.code === 200) {
        dispatch(teacherRatingActions.setRating(response.data));
      }
      dispatch(teacherRatingActions.setLoading(false));
      return response.data;
    },
  fetchAverageByTeacherId: (teacherId: number) => async (dispatch: Dispatch) => {
    dispatch(teacherRatingActions.setLoading(true));
    dispatch(teacherRatingActions.setAverageRating(undefined));
    const response = await teacherRatingApi.getAverageByTeacherId(teacherId);
    if (response.code === 200) {
      dispatch(teacherRatingActions.setAverageRating(response.data));
    }
    dispatch(teacherRatingActions.setLoading(false));
    return response.data;
  },
  add: (rating: TeacherRatingRequest) => async (dispatch: Dispatch) => {
    dispatch(teacherRatingActions.setLoading(true));
    const response = await teacherRatingApi.add(rating);
    dispatch(teacherRatingActions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(
        teacherRatingThunk.fetchByTeacherIdAndUserId(
          rating.teacherId,
          rating.userId,
        ),
      );
      // dispatch(teacherRatingThunk.fetchAverageByTeacherId(rating.teacherId));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  edit:
    (ratingId: number, rating: TeacherRatingRequest) =>
    async (dispatch: Dispatch) => {
      dispatch(teacherRatingActions.setLoading(true));
      const response = await teacherRatingApi.update(ratingId, rating);
      dispatch(teacherRatingActions.setLoading(false));
      if (response.code === 200) {
        toast.success(response.massage);
        dispatch(
          teacherRatingThunk.fetchByTeacherIdAndUserId(
            rating.teacherId,
            rating.userId,
          ),
        );
        // dispatch(teacherRatingThunk.fetchAverageByTeacherId(rating.teacherId));
      } else {
        toast.warning("Failed");
        console.log(response);
      }
    },
};
