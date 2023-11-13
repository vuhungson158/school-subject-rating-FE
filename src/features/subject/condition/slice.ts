import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Loading } from "../../../common/model";
import { GraphData } from "./model";

interface State {
  isLoading: Loading;
  graphData: GraphData;
}

const initialState: State = {
  isLoading: {
    list: false,
    cud: false,
  },
  graphData: {
    subjectConditionList: [],
    subjectIds: [],
  },
};

const slice = createSlice({
  name: "subjectCondition",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Loading>) => {
      state.isLoading = action.payload;
    },
    setGraphData: (state, action: PayloadAction<GraphData>) => {
      state.graphData = action.payload;
    },
  },
});

export const actions = slice.actions;
export const subjectConditionReducer = slice.reducer;
