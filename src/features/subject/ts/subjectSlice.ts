import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Pagination, SubjectEntity } from "../../../model";
import { selectTeacherObject } from "../../teacher";

interface SubjectFilter {
  name: string;
  teacher: string;
}

type FilterAndPagination = SubjectFilter & Pagination;
interface SubjectState {
  isLoading: boolean;
  isRatingFetching: boolean;
  subjectList: SubjectEntity[];
  filter: FilterAndPagination;
  backdropOpen: boolean;
  editId?: number;
  deleteId?: number;
}

const initialState: SubjectState = {
  isLoading: false,
  isRatingFetching: false,
  subjectList: [],
  filter: {
    name: "",
    teacher: "",
    limit: 10,
    page: 0,
  },
  backdropOpen: false,
  editId: undefined,
  deleteId: undefined,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSubjectList: (state, action: PayloadAction<SubjectEntity[]>) => {
      state.subjectList = action.payload;
    },
    setBackdropOpen: (state, action: PayloadAction<boolean>) => {
      state.backdropOpen = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterAndPagination>) => {
      state.filter = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filter.page = action.payload;
    },
    setEditId: (state, action: PayloadAction<number | undefined>) => {
      state.editId = action.payload;
    },
    setDeleteId: (state, action: PayloadAction<number | undefined>) => {
      state.deleteId = action.payload;
    },
  },
});

export const selectSubjectListAfterFilter = (root: RootState) => {
  const { page, limit, name, teacher } = root.subject.filter;
  const teacherObj = selectTeacherObject(root);

  return root.subject.subjectList
    .filter((subject) => {
      let valid = true;
      if (name && !subject.name.includes(name)) valid = false;
      if (
        teacher &&
        teacherObj[subject.teacherId as keyof typeof teacherObj] !== teacher
      )
        valid = false;
      return valid;
    })
    .slice(page * limit, (page + 1) * limit);
};

export const subjectActions = subjectSlice.actions;
export const subjectReducer = subjectSlice.reducer;
