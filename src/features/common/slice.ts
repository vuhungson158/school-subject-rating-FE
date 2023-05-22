import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, TextFields, texts } from "../../language";
import { Statistics } from "../dashboard/model";

const initLanguage = Object.keys(texts).includes(navigator.language)
  ? (navigator.language as Language)
  : "en";

interface State {
  darkTheme: boolean;
  language: Language;
  texts: TextFields;
  isLoading: boolean;
  statistics?: Statistics;
}

const initialState: State = {
  darkTheme: true,
  language: initLanguage,
  texts: texts[initLanguage],
  isLoading: false,
  statistics: undefined,
};

const slice = createSlice({
  name: "common",
  initialState,
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

export const actions = slice.actions;
export const commonReducer = slice.reducer;
