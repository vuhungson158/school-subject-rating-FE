import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Pagination } from "../../common/model";
import { selectObject } from "../../teacher/base/slice";
import { Entity } from "./model";

interface Filter {
  name: string;
  teacher: string;
}

interface State {
  isLoading: boolean;
  isRatingFetching: boolean;
  list: Entity[];
  filter: Filter;
  pagination: Pagination;
  backdropOpen: boolean;
  editId?: number;
  deleteId?: number;
}

const initialState: State = {
  isLoading: false,
  isRatingFetching: false,
  list: [],
  filter: {
    name: "",
    teacher: "",
  },
  pagination: {
    limit: 10,
    page: 0,
  },
  backdropOpen: false,
  editId: undefined,
  deleteId: undefined,
};

const slice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSubjectList: (state, action: PayloadAction<Entity[]>) => {
      state.list = action.payload;
    },
    setBackdropOpen: (state, action: PayloadAction<boolean>) => {
      state.backdropOpen = action.payload;
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload;
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
  const { name, teacher } = root.subject.filter;
  const { page, limit } = root.subject.pagination;
  const teacherObj = selectObject(root);

  return root.subject.list
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

export const actions = slice.actions;
export const subjectReducer = slice.reducer;
