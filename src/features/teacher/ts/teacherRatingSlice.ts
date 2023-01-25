import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeacherAverageRating, TeacherRatingEntity } from "../../../model";

interface TeacherRatingState {
  isLoading: boolean;
  teacherId?: number;
  rating?: TeacherRatingEntity;
  averageRating?: TeacherAverageRating;
}

const initialState: TeacherRatingState = {
  isLoading: false,
  teacherId: undefined,
  rating: undefined,
};

const teacherRatingSlice = createSlice({
  name: "teacherRating",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTeacherId: (state, action: PayloadAction<number | undefined>) => {
      state.teacherId = action.payload;
    },
    setRating: (state, action: PayloadAction<TeacherRatingEntity | undefined>) => {
      state.rating = action.payload;
    },
    setAverageRating: (
      state,
      action: PayloadAction<TeacherAverageRating | undefined>,
    ) => {
      state.averageRating = action.payload;
    },
  },
});

export const teacherRatingActions = teacherRatingSlice.actions;
export const teacherRatingReducer = teacherRatingSlice.reducer;
