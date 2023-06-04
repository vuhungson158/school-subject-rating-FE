import { AppThunk, Dispatch, RootState } from "../../../app/store";
import api from "./api";
import { actions } from "./slice";

const thunk = {
  fetchByUserId:
    (userId: number): AppThunk =>
    async (dispatch: Dispatch, getState: () => RootState) => {
      const state = getState();
      const isLoading = state.subjectPlan.isLoading;

      dispatch(actions.setLoading({ ...isLoading, one: true }));
      const response = await api.getByUserId(userId);
      dispatch(actions.setEntity(response.data));
      dispatch(actions.setLoading({ ...isLoading, one: false }));
    },
  fetchAllByGroup: () => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState().subjectPlan;
    const isLoading = state.isLoading;

    dispatch(actions.setLoading({ ...isLoading, group: true }));
    const response = await api.getAllByGroup();
    dispatch(actions.setGroupList(response.data));
    !state.entity && dispatch(actions.generateDisabledList());

    dispatch(actions.setLoading({ ...isLoading, group: false }));
  },
};

export default thunk;
