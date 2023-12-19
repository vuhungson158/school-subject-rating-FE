import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PageRequest} from "../model/commonModel";
import {TeacherResponseModel} from "../model/teacherModel";
import {ReduxAction, ReduxSlice} from "../common/WrapperType";
import type {Reducer} from "redux";
import {ALL} from "../constant";

export interface TeacherListFilterProps {
    name: string;
    gender: string;
    nationality: string;
    ageFrom: number;
    ageTo: number;
}

interface TeacherSliceState {
    isLoading: boolean;
    list: TeacherResponseModel[];
    filter: TeacherListFilterProps;
    pagination: PageRequest;
    formOpen: boolean;
}

const initialTeacherSliceState: TeacherSliceState = {
    isLoading: false,
    list: [],
    filter: {
        name: "",
        gender: ALL,
        nationality: ALL,
        ageFrom: 0,
        ageTo: 10000,
    },
    pagination: {
        limit: 10,
        page: 0,
    },
    formOpen: false,
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
