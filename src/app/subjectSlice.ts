import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PageRequest} from "../model/commonModel";
import {Slice} from "@reduxjs/toolkit/src/createSlice";
import {Feature} from "../constant/featureLabel";
import {ReduxAction} from "../common/WrapperType";
import type {Reducer} from "redux";
import {SubjectListFilter} from "../model/subjectModel";

export interface SubjectSliceState {
    isListFetching: boolean;
    filter: SubjectListFilter;
    pagination: PageRequest;
    listRefreshTrigger: number;
    liseSize: number;
}

const initialSubjectSliceState: SubjectSliceState = {
    isListFetching: false,
    filter: {
        credit: {
            from: "",
            to: "",
        },
        registrableYear: {
            from: "",
            to: "",
        },
        name: "",
        department: undefined,
        classification: undefined,
        require: undefined,
    },
    pagination: {
        limit: 10,
        page: 0,
    },
    listRefreshTrigger: 0,
    liseSize: 0,
};

type SubjectSliceAction = {
    setListFetching: (state: SubjectSliceState, action: PayloadAction<boolean>) => void;
    setFilter: (state: SubjectSliceState, action: PayloadAction<SubjectListFilter>) => void;
    clearFilter: (state: SubjectSliceState) => void;
    setPagination: (state: SubjectSliceState, action: PayloadAction<PageRequest>) => void;
    backFirstPage: (state: SubjectSliceState) => void;
    refreshList: (state: SubjectSliceState) => void;
    setListSize: (state: SubjectSliceState, action: PayloadAction<number>) => void;
}

const subjectSlice: Slice<SubjectSliceState, SubjectSliceAction> = createSlice({
    name: Feature.SUBJECT,
    initialState: initialSubjectSliceState,
    reducers: {
        setListFetching: (state: SubjectSliceState, action: PayloadAction<boolean>): void => {
            state.isListFetching = action.payload;
        },
        setFilter: (state: SubjectSliceState, action: PayloadAction<SubjectListFilter>) => {
            state.filter = action.payload;
        },
        clearFilter: (state: SubjectSliceState): void => {
            state.filter = initialSubjectSliceState.filter;
        },
        setPagination: (state: SubjectSliceState, action: PayloadAction<PageRequest>) => {
            state.pagination = action.payload;
        },
        backFirstPage: (state: SubjectSliceState,): void => {
            state.pagination.page = 0;
        },
        refreshList: (state: SubjectSliceState,): void => {
            state.listRefreshTrigger++;
        },
        setListSize: (state: SubjectSliceState, action: PayloadAction<number>): void => {
            state.liseSize = action.payload;
        },
    },
});

export const subjectReduxActions: ReduxAction<SubjectSliceAction> = subjectSlice.actions;
export const subjectReducer: Reducer<SubjectSliceState> = subjectSlice.reducer;
