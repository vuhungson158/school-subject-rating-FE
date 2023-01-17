import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TeacherEntity } from "../../model";
import { Pagination } from "../common";

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
    limit: 10,
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

export const selectTeacherObject = (root: RootState) =>
  root.teacher.teacherList.reduce(
    (obj, teacher) => ({ ...obj, [teacher.id as number]: teacher.name }),
    {},
  );

export const teacherActions = teacherSlice.actions;
export const teacherReducer = teacherSlice.reducer;
