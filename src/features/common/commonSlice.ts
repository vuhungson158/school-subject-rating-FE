import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonState {
  darkTheme: boolean;
  language: Language;
}

export enum Language {
  english, japan, vietnamese
}

// export enum Language {
//   "English", "日本語", "Tiếng Việt"
// }

const initialState: CommonState = {
  darkTheme: true,
  language: Language.english,
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
    },
  },
});

export const commonActions = commonSlice.actions;
const commonReducer = commonSlice.reducer;
export default commonReducer;
