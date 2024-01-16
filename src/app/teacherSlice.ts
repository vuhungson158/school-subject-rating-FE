import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PageRequest} from "../model/commonModel";
import {TeacherResponseModel} from "../model/teacherModel";
import {ControlledNumber, ReduxAction} from "../common/WrapperType";
import type {Reducer} from "redux";
import {ALL} from "../constant/common";
import {Slice} from "@reduxjs/toolkit/src/createSlice";
import {Feature} from "../constant/featureLabel";

export interface TeacherListFilter {
    name: string;
    gender: string;
    nationality: string;
    ageFrom: ControlledNumber;
    ageTo: ControlledNumber;
}

export type TeacherPageRequest = PageRequest & { listSize: number }

interface TeacherSliceState {
    isListFetching: boolean;
    list: TeacherResponseModel[];
    filter: TeacherListFilter;
    pagination: TeacherPageRequest;
}

const initialTeacherSliceState: TeacherSliceState = {
    isListFetching: false,
    list: [],
    filter: {
        name: "",
        gender: ALL,
        nationality: ALL,
        ageFrom: "",
        ageTo: "",
    },
    pagination: {
        limit: 5,
        page: 0,
        listSize: 0
    },
};

type TeacherSliceAction = {
    setListFetching: (state: TeacherSliceState, action: PayloadAction<boolean>) => void;
    setTeacherList: (state: TeacherSliceState, action: PayloadAction<TeacherResponseModel[]>) => void;
    setFilter: (state: TeacherSliceState, action: PayloadAction<TeacherListFilter>) => void;
    clearFilter: (state: TeacherSliceState) => void;
    setPagination: (state: TeacherSliceState, action: PayloadAction<PageRequest>) => void;
    backFirstPage: (state: TeacherSliceState) => void;
}

const teacherSlice: Slice<TeacherSliceState, TeacherSliceAction> = createSlice({
    name: Feature.TEACHER,
    initialState: initialTeacherSliceState,
    reducers: {
        setListFetching: (state: TeacherSliceState, action: PayloadAction<boolean>): void => {
            state.isListFetching = action.payload;
        },
        setTeacherList: (state: TeacherSliceState, action: PayloadAction<TeacherResponseModel[]>): void => {
            state.list = action.payload;
        },
        setFilter: (state: TeacherSliceState, action: PayloadAction<TeacherListFilter>): void => {
            state.pagination.page = 0;
            state.filter = action.payload;
        },
        clearFilter: (state: TeacherSliceState): void => {
            state.filter = initialTeacherSliceState.filter;
        },
        setPagination: (state: TeacherSliceState, action: PayloadAction<PageRequest>): void => {
            state.pagination = {...state.pagination, ...action.payload};
        },
        backFirstPage: (state: TeacherSliceState,): void => {
            state.pagination.page = 0;
        }
    },
});

export const teacherReduxActions: ReduxAction<TeacherSliceAction> = teacherSlice.actions;
export const teacherReducer: Reducer<TeacherSliceState> = teacherSlice.reducer;
