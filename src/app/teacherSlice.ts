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

export type TeacherPageRequest = PageRequest & { listSize: number }

interface TeacherSliceState {
    isLoading: boolean;
    list: TeacherResponseModel[];
    listAfterFilter: TeacherResponseModel[];
    filter: TeacherListFilterProps;
    pagination: TeacherPageRequest;
    formOpen: boolean;
}

const initialTeacherSliceState: TeacherSliceState = {
    isLoading: false,
    list: [],
    listAfterFilter: [],
    filter: {
        name: "",
        gender: ALL,
        nationality: ALL,
        ageFrom: 0,
        ageTo: 10000,
    },
    pagination: {
        limit: 5,
        page: 0,
        listSize: 0
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
        setListAfterFilter: (state: TeacherSliceState, action: PayloadAction<TeacherResponseModel[]>): void => {
            state.listAfterFilter = action.payload;
        },
        setFilter: (state: TeacherSliceState, action: PayloadAction<TeacherListFilterProps>): void => {
            state.pagination.page = 0;
            state.filter = action.payload;
        },
        clearFilter: (state: TeacherSliceState): void => {
            state.filter = initialTeacherSliceState.filter;
        },
        setPagination: (state: TeacherSliceState, action: PayloadAction<PageRequest>): void => {
            state.pagination = {...state.pagination, ...action.payload};
        },
    },
});

export const teacherReduxActions: ReduxAction<TeacherSliceState> = teacherSlice.actions;
export const teacherReducer: Reducer<TeacherSliceState> = teacherSlice.reducer;
