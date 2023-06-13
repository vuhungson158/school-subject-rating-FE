import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";
import {Pagination} from "../../common/model";
import {teacherMapSelector} from "../../teacher/base/slice";
import {Entity, entityKeys} from "./model";

interface Filter {
  name: string;
  teacher: string;
}

interface State {
  // Table
  isLoading: boolean;
  list: Entity[];
  showedColumns: typeof entityKeys;
  filter: Filter;
  pagination: Pagination;
  // Form
  backdropOpen: boolean;
  editId?: number;
}

const initialState: State = {
  isLoading: false,
  showedColumns: ["name", "teacherId", "department", "classification", "unit", "require"],
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
  editId: undefined
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
    toggleShowedColumns: (state: State, action: PayloadAction<keyof Entity>) => {
      const {payload} = action;
      const {showedColumns} = state;
      showedColumns.includes(payload)
        ? state.showedColumns = showedColumns.filter((column) => column !== payload)
        : showedColumns.push(payload);
    },
  },
});

export const subjectListAfterFilterSelector = (root: RootState) => {
  const {name, teacher} = root.subject.filter;
  const {page, limit} = root.subject.pagination
  const teacherObj = teacherMapSelector(root);

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
