import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubjectEntity, SubjectWithAvgRating } from "../../model";
import { Pagination } from "../common/interface";

interface Filter extends Pagination {}

interface SubjectState {
  isLoading: boolean;
  subjectList: SubjectEntity[];
  subjectDetail?: SubjectWithAvgRating;
  filter: Filter;
  addBackdropOpen: boolean;
}

const initialState: SubjectState = {
  isLoading: false,
  subjectList: [],
  subjectDetail: undefined,
  filter: {
    limit: 15,
    page: 0,
  },
  addBackdropOpen: false,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.filter.page = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSubjectList: (state, action: PayloadAction<SubjectEntity[]>) => {
      state.subjectList = action.payload;
    },
    setAddBackdropOpen: (state, action: PayloadAction<boolean>) => {
      state.addBackdropOpen = action.payload;
    },
  },
});

export const subjectActions = subjectSlice.actions;
const subjectReducer = subjectSlice.reducer;
export default subjectReducer;
