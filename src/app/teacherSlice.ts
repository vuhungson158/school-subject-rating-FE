import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {PageRequest} from "../model/commonModel";
import {TeacherResponseModel} from "../model/teacherModel";

export interface TeacherListFilter {
  name: string;
  subject: string;
  gender: string;
  nationality: string;
}

interface State {
  isLoading: boolean;
  list: TeacherResponseModel[];
  filter: TeacherListFilter;
  pagination: PageRequest;
  formOpen: boolean;
  // editId?: number;
  // deleteId?: number;
}

const initialState: State = {
  isLoading: false,
  list: [],
  filter: {
    name: "",
    subject: "",
    gender: "",
    nationality: "",
  },
  pagination: {
    limit: 10,
    page: 0,
  },
  formOpen: false,
  // editId: undefined,
  // deleteId: undefined,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFormOpen: (state, action: PayloadAction<boolean>) => {
      state.formOpen = action.payload;
    },
    setList: (state, action: PayloadAction<TeacherResponseModel[]>) => {
      state.list = action.payload;
    },
    setFilter: (state, action: PayloadAction<TeacherListFilter>) => {
      state.pagination.page = 0;
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = initialState.filter;
    },
    setPagination: (state, action: PayloadAction<PageRequest>) => {
      state.pagination = action.payload;
    },
    // setEditId: (state, action: PayloadAction<number | undefined>) => {
    //   state.editId = action.payload;
    // },
    // setDeleteId: (state, action: PayloadAction<number | undefined>) => {
    //   state.deleteId = action.payload;
    // },
  },
});

export const teacherMapSelector = (root: RootState) =>
  root.teacher.list.reduce(
    (obj, teacher) => ({
      ...obj,
      [teacher.id as number]: teacher.name
    }),
    {},
  );

export const selectListAfterFilter = (root: RootState) => {
  const {
    name,
    subject,
    gender,
    nationality
  } = root.teacher.filter;
  return root.teacher.list.filter((teacher) => {
    let valid = true;
    if (name && !teacher.name.includes(name)) valid = false;
    if (
      subject &&
      !root.subject.list.some(
        (sub) => sub.name === subject && sub.teacherId === teacher.id,
      )
    )
      valid = false;
    if (gender && gender !== teacher.gender) valid = false;
    if (nationality && nationality !== teacher.nationality) valid = false;
    return valid;
  });
};

export const actions = teacherSlice.actions;
export const teacherReducer = teacherSlice.reducer;