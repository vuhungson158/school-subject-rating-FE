import { AppThunk, ThunkActionDispatch, RootState } from "../../../app/store";
import api from "./api";
import { BigList } from "./model";
import { actions } from "./slice";

const thunk = {
  fetchByUserId:
    (userId: number): AppThunk =>
    async (dispatch: ThunkActionDispatch, getState: () => RootState) => {
      const state = getState();
      const isLoading = state.subjectPlan.isLoading;

      dispatch(actions.setLoading({ ...isLoading, one: true }));
      const response = await api.getByUserId(userId);
      dispatch(actions.setEntity(response.data));
      dispatch(actions.setLoading({ ...isLoading, one: false }));
    },
  fetchAllByGroup: (): AppThunk => async (dispatch: ThunkActionDispatch, getState: () => RootState) => {
    const state = getState().subjectPlan;
    const isLoading = state.isLoading;

    dispatch(actions.setLoading({ ...isLoading, group: true }));
    const response = await api.getAllByGroup();
    dispatch(actions.initBigList(new BigList(response.data)));

    dispatch(actions.setLoading({ ...isLoading, group: false }));
  },
};

export default thunk;
