import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FromTo, PageRequest} from "../model/commonModel";
import {TeacherResponseModel} from "../model/teacherModel";
import {ControlledNumber, ReduxAction} from "../common/WrapperType";
import type {Reducer} from "redux";
import {Feature} from "../constant/featureLabel";
import {Gender, Nationality} from "../model/templateLiteral";
import {SliceState} from "./store";
import {Slice, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";

export interface TeacherListFilter {
    name: string;
    gender?: Gender;
    nationality?: Nationality;
    age: FromTo<ControlledNumber>;
}

export type TeacherPageRequest = PageRequest & { listSize: number }

interface TeacherSliceState extends SliceState {
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
        gender: undefined,
        nationality: undefined,
        age: {
            from: "",
            to: ""
        },
    },
    pagination: {
        limit: 5,
        page: 0,
        listSize: 0
    },
};

const teacherSliceReducers = {
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
    backFirstPage: (state: TeacherSliceState): void => {
        state.pagination.page = 0;
    }
} satisfies SliceCaseReducers<TeacherSliceState>;
type TeacherSliceAction = typeof teacherSliceReducers;

const teacherSlice: Slice<TeacherSliceState, TeacherSliceAction> = createSlice({
    name: Feature.TEACHER,
    initialState: initialTeacherSliceState,
    reducers: teacherSliceReducers,
});

export const teacherReduxActions: ReduxAction<TeacherSliceAction> = teacherSlice.actions;
export const teacherReducer: Reducer<TeacherSliceState> = teacherSlice.reducer;
