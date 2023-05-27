import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Loading } from "../../common/model";
import { Entity, DepartmentGroup } from "./model";

interface PlanLoading extends Loading {
  one: boolean;
  group: boolean;
}

interface State {
  isLoading: PlanLoading;
  entity?: Entity;
  group: DepartmentGroup[];
}

const initialState: State = {
  isLoading: {
    list: false,
    cud: false,
    one: false,
    group: false,
  },
  entity: undefined,
  group: [],
};

const slice = createSlice({
  name: "subjectPlan",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<PlanLoading>) => {
      state.isLoading = action.payload;
    },
    setEntity: (state, action: PayloadAction<Entity>) => {
      state.entity = action.payload;
    },
    setGroup: (state, action: PayloadAction<DepartmentGroup[]>) => {
      state.group = action.payload;
    },
  },
});

export const actions = slice.actions;
export const subjectPlanReducer = slice.reducer;
