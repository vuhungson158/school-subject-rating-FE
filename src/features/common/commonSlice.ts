import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { english, japan, Language, TextFields, vietnamese } from "../../language";


const texts = {
  english, japan, vietnamese
}

const initLanguage = "english";

interface CommonState {
  darkTheme: boolean;
  language: Language;
  texts: TextFields;
}

const initialState: CommonState = {
  darkTheme: true,
  language: initLanguage,
  texts: texts[initLanguage],
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
      state.texts = texts[action.payload]
    },
  },
});

export const commonActions = commonSlice.actions;
const commonReducer = commonSlice.reducer;
export default commonReducer;
