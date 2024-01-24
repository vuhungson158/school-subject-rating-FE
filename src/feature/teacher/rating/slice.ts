import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Average, Entity } from "./model";

interface State {
  isLoading: boolean;
  teacherId?: number;
  rating?: Entity;
  average?: Average;
}

const initialState: State = {
  isLoading: false,
  teacherId: undefined,
  rating: undefined,
};

const slice = createSlice({
  name: "teacherRating",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTeacherId: (state, action: PayloadAction<number | undefined>) => {
      state.teacherId = action.payload;
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
export const teacherRatingReducer = slice.reducer;
