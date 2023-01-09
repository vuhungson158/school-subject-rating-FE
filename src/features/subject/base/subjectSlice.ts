import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "../";
import { SubjectAverageRating, SubjectEntity } from "../../../model";
import { Pagination } from "../../common/interface";

type FilterAndPagination = Filter & Pagination;
interface SubjectState {
  isLoading: boolean;
  isRatingFetching: boolean;
  subjectList: SubjectEntity[];
  averageRating?: SubjectAverageRating;
  filter: FilterAndPagination;
  addBackdropOpen: boolean;
  editId?: number;
  deleteId?: number;
}

const initialState: SubjectState = {
  isLoading: false,
  isRatingFetching: false,
  subjectList: [],
  averageRating: undefined,
  filter: {
    name: "",
    teacher: "",
    limit: 10,
    page: 0,
  },
  addBackdropOpen: false,
  editId: undefined,
  deleteId: undefined,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.filter.page = action.payload;
    },
    setEditId: (state, action: PayloadAction<number | undefined>) => {
      state.editId = action.payload;
    },
    setDeleteId: (state, action: PayloadAction<number | undefined>) => {
      state.deleteId = action.payload;
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
    setFilter: (state, action: PayloadAction<FilterAndPagination>) => {
      state.filter = action.payload;
    },
  },
});

export const subjectActions = subjectSlice.actions;
const subjectReducer = subjectSlice.reducer;
export default subjectReducer;
