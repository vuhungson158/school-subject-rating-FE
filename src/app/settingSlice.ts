import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Language, TextFields, texts} from "../language";
import {WritableDraft} from "immer/src/types/types-external";
import {Slice, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import type {Reducer} from "redux";
import {ReduxAction} from "../common/WrapperType";
import {Feature} from "../common/enums";

const initLanguage: Language = Object.keys(texts).includes(navigator.language)
    ? (navigator.language as Language) : "ja";

interface SettingSliceState {
    darkTheme: boolean;
    language: Language;
    texts: TextFields;
}

const initialSettingSliceState: SettingSliceState = {
    darkTheme: true,
    language: initLanguage,
    texts: texts[initLanguage],
};

const settingSliceReducers = {
    setTheme: (state: WritableDraft<SettingSliceState>, action: PayloadAction<boolean>): void => {
        state.darkTheme = action.payload;
    },
    setLanguage: (state: WritableDraft<SettingSliceState>, action: PayloadAction<Language>): void => {
        state.language = action.payload;
        state.texts = texts[action.payload];
    },
} satisfies SliceCaseReducers<SettingSliceState>
type SettingSliceAction = typeof settingSliceReducers;


const settingSlice: Slice<SettingSliceState, SettingSliceAction> = createSlice({
    name: Feature.SETTING,
    initialState: initialSettingSliceState,
    reducers: settingSliceReducers,
});

export const settingReduxActions: ReduxAction<SettingSliceState, SettingSliceAction> = settingSlice.actions;
export const settingReducer: Reducer<SettingSliceState> = settingSlice.reducer;
