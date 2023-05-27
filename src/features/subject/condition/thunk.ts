import { Dispatch, RootState } from "../../../app/store";
import api from "./api";
import { Request } from "./model";
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
  add:
    (request: Request) => async (dispatch: Dispatch, getState: () => RootState) => {
      const state = getState();
      const isLoading = state.subjectCondition.isLoading;

      dispatch(actions.setLoading({ ...isLoading, cud: true }));
      await api.add(request);
      dispatch(thunk.fetchGraphData());
      dispatch(actions.setLoading({ ...isLoading, cud: false }));
    },
};

export default thunk;
