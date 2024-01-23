import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, TextFields, texts } from "../language";
import { Statistics } from "../features/dashboard/model";

const initLanguage = Object.keys(texts).includes(navigator.language)
  ? (navigator.language as Language)
  : "ja";

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

type commonSliceAction

const commonSlice = createSlice({
  name: "common",
  initialState: initialCommonSliceState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkTheme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      state.texts = texts[action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setStatistics: (state, action: PayloadAction<Statistics>) => {
      state.statistics = action.payload;
    },
  },
});

export const actions = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
