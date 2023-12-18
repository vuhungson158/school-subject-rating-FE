import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PageRequest} from "../model/commonModel";
import {TeacherResponseModel} from "../model/teacherModel";
import {ReduxAction, ReduxSlice} from "../common/WrapperType";
import type {Reducer} from "redux";

export interface TeacherListFilterProps {
    name: string;
    subject: string;
    gender: string;
    nationality: string;
}

interface TeacherSliceState {
    isLoading: boolean;
    list: TeacherResponseModel[];
    filter: TeacherListFilterProps;
    pagination: PageRequest;
    formOpen: boolean;
    // editId?: number;
    // deleteId?: number;
}

const initialTeacherSliceState: TeacherSliceState = {
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

const teacherSlice: ReduxSlice<TeacherSliceState> = createSlice({
    name: "teacher",
    initialState: initialTeacherSliceState,
    reducers: {
        setLoading: (state: TeacherSliceState, action: PayloadAction<boolean>): void => {
            state.isLoading = action.payload;
        },
        setFormOpen: (state: TeacherSliceState, action: PayloadAction<boolean>): void => {
            state.formOpen = action.payload;
        },
        setTeacherList: (state: TeacherSliceState, action: PayloadAction<TeacherResponseModel[]>): void => {
            state.list = action.payload;
        },
        setFilter: (state: TeacherSliceState, action: PayloadAction<TeacherListFilterProps>): void => {
            state.pagination.page = 0;
            state.filter = action.payload;
        },
        clearFilter: (state: TeacherSliceState): void => {
            state.filter = initialTeacherSliceState.filter;
        },
        setPagination: (state: TeacherSliceState, action: PayloadAction<PageRequest>): void => {
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

export const teacherReduxActions: ReduxAction<TeacherSliceState> = teacherSlice.actions;
export const teacherReducer: Reducer<TeacherSliceState> = teacherSlice.reducer;
