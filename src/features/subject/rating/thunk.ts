import { toast } from "react-toastify";
import { actions } from "./slice";
import api from "./api";
import { Dispatch } from "../../../app/store";
import { Request } from "./model";

const thunk = {
  fetchBySubjectIdAndUserId:
    (subjectId: number, userId: number) => async (dispatch: Dispatch) => {
      dispatch(actions.setLoading(true));
      dispatch(actions.setRating(undefined));
      const response = await api.getBySubjectIdAndUserId(subjectId, userId);
      if (response.code === 200) {
        dispatch(actions.setRating(response.data));
      }
      dispatch(actions.setLoading(false));
      return response.data;
    },
  fetchAverageBySubjectId: (subjectId: number) => async (dispatch: Dispatch) => {
    dispatch(actions.setLoading(true));
    dispatch(actions.setAverageRating(undefined));
    const response = await api.getAverageBySubjectId(subjectId);
    if (response.code === 200) {
      dispatch(actions.setAverageRating(response.data));
    }
    dispatch(actions.setLoading(false));
    return response.data;
  },
  add: (rating: Request) => async (dispatch: Dispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.add(rating);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(thunk.fetchBySubjectIdAndUserId(rating.subjectId, rating.userId));
      // dispatch(subjectRatingThunk.fetchAverageBySubjectId(rating.subjectId));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
  edit: (ratingId: number, rating: Request) => async (dispatch: Dispatch) => {
    dispatch(actions.setLoading(true));
    const response = await api.update(ratingId, rating);
    dispatch(actions.setLoading(false));
    if (response.code === 200) {
      toast.success(response.massage);
      dispatch(thunk.fetchBySubjectIdAndUserId(rating.subjectId, rating.userId));
      // dispatch(subjectRatingThunk.fetchAverageBySubjectId(rating.subjectId));
    } else {
      toast.warning("Failed");
      console.log(response);
    }
  },
};

export default thunk;
