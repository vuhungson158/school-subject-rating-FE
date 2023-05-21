import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Average, Entity } from "./model";

interface State {
  isLoading: boolean;
  subjectId?: number;
  rating?: Entity;
  average?: Average;
}

const initialState: State = {
  isLoading: false,
  subjectId: undefined,
  rating: undefined,
};

const slice = createSlice({
  name: "subjectRating",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSubjectId: (state, action: PayloadAction<number | undefined>) => {
      state.subjectId = action.payload;
    },
    setRating: (state, action: PayloadAction<Entity | undefined>) => {
      state.rating = action.payload;
    },
    setAverageRating: (state, action: PayloadAction<Average | undefined>) => {
      state.average = action.payload;
    },
  },
});

export const actions = slice.actions;
export const subjectRatingReducer = slice.reducer;
