import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, TextFields, texts } from "../../language";
import { StatisticsEntity } from "../../model";

const initLanguage = Object.keys(texts).includes(navigator.language)
  ? (navigator.language as Language)
  : "en";

interface CommonState {
  darkTheme: boolean;
  language: Language;
  texts: TextFields;
  isLoading: boolean;
  statistics?: StatisticsEntity;
}

const initialState: CommonState = {
  darkTheme: true,
  language: initLanguage,
  texts: texts[initLanguage],
  isLoading: false,
  statistics: undefined,
};

const commonSlice = createSlice({
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
    setStatistics: (state, action: PayloadAction<StatisticsEntity>) => {
      state.statistics = action.payload;
    },
  },
});

export const commonActions = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
