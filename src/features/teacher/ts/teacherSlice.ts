import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Pagination, TeacherEntity } from "../../../model";

interface TeacherFilter {
  name: string;
  subject: string;
  gender: string;
  nationality: string;
}
type FilterAndPagination = TeacherFilter & Pagination;

interface TeacherState {
  isLoading: boolean;
  teacherList: TeacherEntity[];
  filter: FilterAndPagination;
  backdropOpen: boolean;
  editId?: number;
  deleteId?: number;
}

const initialState: TeacherState = {
  isLoading: false,
  teacherList: [],
  filter: {
    name: "",
    subject: "",
    gender: "",
    nationality: "",
    limit: 10,
    page: 0,
  },
  backdropOpen: false,
  editId: undefined,
  deleteId: undefined,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBackdropOpen: (state, action: PayloadAction<boolean>) => {
      state.backdropOpen = action.payload;
    },
    setTeacherList: (state, action: PayloadAction<TeacherEntity[]>) => {
      state.teacherList = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterAndPagination>) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = initialState.filter;
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

export const selectTeacherObject = (root: RootState) =>
  root.teacher.teacherList.reduce(
    (obj, teacher) => ({ ...obj, [teacher.id as number]: teacher.name }),
    {},
  );

export const selectTeacherListAfterFilter = (root: RootState) => {
  const { page, limit, name, subject, gender, nationality } = root.teacher.filter;
  return root.teacher.teacherList
    .filter((teacher) => {
      let valid = true;
      if (name && !teacher.name.includes(name)) valid = false;
      if (
        subject &&
        !root.subject.subjectList.some(
          (sub) => sub.name === subject && sub.teacherId === teacher.id,
        )
      )
        valid = false;
      if (gender && gender !== teacher.gender) valid = false;
      if (nationality && nationality !== teacher.nationality) valid = false;
      return valid;
    })
    .slice(page * limit, (page + 1) * limit);
};

export const teacherActions = teacherSlice.actions;
export const teacherReducer = teacherSlice.reducer;
