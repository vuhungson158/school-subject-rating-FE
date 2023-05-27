import { Dispatch, RootState } from "../../../app/store";
import api from "./api";
import { actions } from "./slice";

const thunk = {
  fetchByUserId: (userId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const isLoading = state.subjectPlan.isLoading;

    dispatch(actions.setLoading({ ...isLoading, one: true }));
    const response = await api.getByUserId(userId);
    dispatch(actions.setEntity(response.data));
    dispatch(actions.setLoading({ ...isLoading, one: false }));
  },
  fetchAllByGroup: () => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const isLoading = state.subjectPlan.isLoading;

    dispatch(actions.setLoading({ ...isLoading, group: true }));
    const response = await api.getAllByGroup();
    dispatch(actions.setGroup(response.data));
    dispatch(actions.setLoading({ ...isLoading, group: false }));
  },
};

export default thunk;
