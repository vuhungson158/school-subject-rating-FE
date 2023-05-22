import { Dispatch, RootState } from "../../../app/store";
import api from "./api";
import { actions } from "./slice";

const thunk = {
  fetchGraphData: () => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const isLoading = state.subjectCondition.isLoading;

    dispatch(actions.setLoading({ ...isLoading, list: true }));
    const response = await api.getGraphData();
    dispatch(actions.setGraphData(response.data));
    dispatch(actions.setLoading({ ...isLoading, list: false }));
  },
};

export default thunk;
