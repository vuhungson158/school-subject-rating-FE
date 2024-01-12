import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PageRequest} from "../model/commonModel";
import {TeacherResponseModel} from "../model/teacherModel";
import {ControlledNumber, ReduxAction} from "../common/WrapperType";
import type {Reducer} from "redux";
import {ALL} from "../constant/common";
import {Slice} from "@reduxjs/toolkit/src/createSlice";

export interface TeacherListFilterProps {
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
    listAfterFilter: TeacherResponseModel[];
    filter: TeacherListFilterProps;
    pagination: TeacherPageRequest;
    formOpen: boolean;
}

const initialTeacherSliceState: TeacherSliceState = {
    isListFetching: false,
    list: [],
    listAfterFilter: [],
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
    formOpen: false,
};

type TeacherSliceAction = {
    setListFetching: (state: TeacherSliceState, action: PayloadAction<boolean>) => void;
    setTeacherList: (state: TeacherSliceState, action: PayloadAction<TeacherResponseModel[]>) => void;
    setListAfterFilter: (state: TeacherSliceState, action: PayloadAction<TeacherResponseModel[]>) => void;
    setFilter: (state: TeacherSliceState, action: PayloadAction<TeacherListFilterProps>) => void;
    clearFilter: (state: TeacherSliceState) => void;
    setPagination: (state: TeacherSliceState, action: PayloadAction<PageRequest>) => void;
}

const teacherSlice: Slice<TeacherSliceState, TeacherSliceAction> = createSlice({
    name: "teacher",
    initialState: initialTeacherSliceState,
    reducers: {
        setListFetching: (state: TeacherSliceState, action: PayloadAction<boolean>): void => {
            state.isListFetching = action.payload;
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

export const teacherReduxActions: ReduxAction<TeacherSliceAction> = teacherSlice.actions;
export const teacherReducer: Reducer<TeacherSliceState> = teacherSlice.reducer;
