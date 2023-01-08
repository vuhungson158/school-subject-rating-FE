import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeacherEntity } from "../../model";
import { Pagination } from "../common/interface";

interface Filter extends Pagination {}

interface TeacherState {
  isLoading: boolean;
  teacherList: TeacherEntity[];
  filter: Filter;
  addBackdropOpen: boolean;
}

const initialState: TeacherState = {
  isLoading: false,
  teacherList: [],
  filter: {
    limit: 15,
    page: 0,
  },
  addBackdropOpen: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.filter.page = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAddBackdropOpen: (state, action: PayloadAction<boolean>) => {
      state.addBackdropOpen = action.payload;
    },
    setTeacherList: (state, action: PayloadAction<TeacherEntity[]>) => {
      state.teacherList = action.payload;
    },
  },
});

export const teacherActions = teacherSlice.actions;
const teacherReducer = teacherSlice.reducer;
export default teacherReducer;