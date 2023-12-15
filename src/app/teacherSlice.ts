import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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
        setTeacherList: (state, action: PayloadAction<TeacherResponseModel[]>) => {
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

export const teacherReduxActions = teacherSlice.actions;
export const teacherReducer = teacherSlice.reducer;
