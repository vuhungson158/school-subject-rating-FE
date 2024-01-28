import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Language, TextFields, texts} from "../language";
import {Statistics} from "../view/dashboard/model";
import {WritableDraft} from "immer/src/types/types-external";
import {Slice, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import {ReduxAction} from "../common/WrapperType";
import type {Reducer} from "redux";
import {Feature} from "../common/enums";

const initLanguage: Language = Object.keys(texts).includes(navigator.language)
    ? (navigator.language as Language) : "ja";

interface CommonSliceState {
    darkTheme: boolean;
    language: Language;
    texts: TextFields;
    isLoading: boolean;
    statistics?: Statistics;
}

const initialCommonSliceState: CommonSliceState = {
    darkTheme: true,
    language: initLanguage,
    texts: texts[initLanguage],
    isLoading: false,
    statistics: undefined,
};

const commonSliceReducers = {
    setTheme: (state: WritableDraft<CommonSliceState>, action: PayloadAction<boolean>): void => {
        state.darkTheme = action.payload;
    },
    setLanguage: (state: WritableDraft<CommonSliceState>, action: PayloadAction<Language>): void => {
        state.language = action.payload;
        state.texts = texts[action.payload];
    },
    setLoading: (state: WritableDraft<CommonSliceState>, action: PayloadAction<boolean>): void => {
        state.isLoading = action.payload;
    },
    setStatistics: (state: WritableDraft<CommonSliceState>, action: PayloadAction<Statistics>): void => {
        state.statistics = action.payload;
    },
} satisfies SliceCaseReducers<CommonSliceState>
type CommonSliceAction = typeof commonSliceReducers;


const commonSlice: Slice<CommonSliceState, CommonSliceAction> = createSlice({
    name: Feature.COMMON,
    initialState: initialCommonSliceState,
    reducers: commonSliceReducers,
});

export const commonReduxActions: ReduxAction<CommonSliceState, CommonSliceAction> = commonSlice.actions;
export const commonReducer: Reducer<CommonSliceState> = commonSlice.reducer;
