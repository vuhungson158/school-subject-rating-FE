import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PageRequest} from "../model/commonModel";
import {Slice} from "@reduxjs/toolkit/src/createSlice";
import {Feature} from "../constant/featureLabel";
import {ReduxAction} from "../common/WrapperType";
import type {Reducer} from "redux";

export interface SubjectListFilter {
    name: string;
    teacher: string;
}

export interface SubjectSliceState {
    filter: SubjectListFilter;
    pagination: PageRequest;
    listRefreshTrigger: number;
}

const initialSubjectSliceState: SubjectSliceState = {
    filter: {
        name: "",
        teacher: "",
    },
    pagination: {
        limit: 10,
        page: 0,
    },
    listRefreshTrigger: 0,
};

type SubjectSliceAction = {
    setFilter: (state: SubjectSliceState, action: PayloadAction<SubjectListFilter>) => void;
    clearFilter: (state: SubjectSliceState) => void;
    setPagination: (state: SubjectSliceState, action: PayloadAction<PageRequest>) => void;
    backFirstPage: (state: SubjectSliceState) => void;
    refreshList: (state: SubjectSliceState) => void;
}

const subjectSlice: Slice<SubjectSliceState, SubjectSliceAction> = createSlice({
    name: Feature.SUBJECT,
    initialState: initialSubjectSliceState,
    reducers: {
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
        }
    },
});

export const subjectReduxActions: ReduxAction<SubjectSliceAction> = subjectSlice.actions;
export const subjectReducer: Reducer<SubjectSliceState> = subjectSlice.reducer;
