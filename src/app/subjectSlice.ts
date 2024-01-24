import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PageRequest} from "../model/commonModel";
import {Slice, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import {Feature} from "../common/enums";
import {Reducer} from "redux";
import {SubjectListFilter} from "../model/subjectModel";
import {ReduxAction} from "../common/WrapperType";

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
            from: undefined,
            to: undefined,
        },
        registrableYear: {
            from: undefined,
            to: undefined,
        },
        name: undefined,
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

const subjectSliceReducers = {
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
} satisfies SliceCaseReducers<SubjectSliceState>;
type SubjectSliceAction = typeof subjectSliceReducers;

const subjectSlice: Slice<SubjectSliceState, SubjectSliceAction> = createSlice({
    name: Feature.SUBJECT,
    initialState: initialSubjectSliceState,
    reducers: subjectSliceReducers,
});

export const subjectReduxActions: ReduxAction<SubjectSliceState, SubjectSliceAction> = subjectSlice.actions;
export const subjectReducer: Reducer<SubjectSliceState> = subjectSlice.reducer;
