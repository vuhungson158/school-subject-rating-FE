import { createSlice } from "@reduxjs/toolkit";
import { Loading } from "../../common/model";

interface State {
  isLoading: Loading;
}

const initialState: State = {
  isLoading: {
    list: false,
    cud: false,
  },
};

const slice = createSlice({
  name: "subjectPlan",
  initialState,
  reducers: {},
});

export const actions = slice.actions;
export const subjectPlanReducer = slice.reducer;
