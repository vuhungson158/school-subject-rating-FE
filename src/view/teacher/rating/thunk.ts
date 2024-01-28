import { toast } from "react-toastify";
import { ThunkActionDispatch } from "../../../app/store";
import api from "./api";
import { Request } from "./model";
import { actions } from "./slice";

const thunk = {
  fetchByTeacherIdAndUserId:
    (teacherId: number, userId: number) => async (dispatch: ThunkActionDispatch) => {
      dispatch(actions.setLoading(true));
      dispatch(actions.setRating(undefined));
      const response = await api.getByTeacherIdAndUserId(teacherId, userId);
      if (response.code === 200) {
        dispatch(actions.setRating(response.data));
      }
      dispatch(actions.setLoading(false));
      return response.data;
    },

  fetchAverageByTeacherId: (teacherId: number) => async (dispatch: ThunkActionDispatch) => {
    dispatch(actions.setLoading(true));
    dispatch(actions.setAverageRating(undefined));
    const response = await api.getAverageByTeacherId(teacherId);
    if (response.code === 200) {
      dispatch(actions.setAverageRating(response.data));
    }
    dispatch(actions.setLoading(false));
    return response.data;
  },

  add: (rating: Request) => async (dispatch: ThunkActionDispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.add(rating);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(thunk.fetchByTeacherIdAndUserId(rating.teacherId, rating.userId));
      // dispatch(teacherRatingThunk.fetchAverageByTeacherId(rating.teacherId));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },

  edit: (ratingId: number, rating: Request) => async (dispatch: ThunkActionDispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.update(ratingId, rating);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(thunk.fetchByTeacherIdAndUserId(rating.teacherId, rating.userId));
      // dispatch(teacherRatingThunk.fetchAverageByTeacherId(rating.teacherId));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
};

export default thunk;
