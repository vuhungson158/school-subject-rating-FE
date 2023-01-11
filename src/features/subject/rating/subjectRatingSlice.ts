import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubjectAverageRating, SubjectRatingEntity } from "../../../model";

interface SubjectRatingState {
  isLoading: boolean;
  subjectId?: number;
  rating?: SubjectRatingEntity;
  averageRating?: SubjectAverageRating;
}

const initialState: SubjectRatingState = {
  isLoading: false,
  subjectId: undefined,
  rating: undefined,
};

const subjectRatingSlice = createSlice({
  name: "subjectRating",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSubjectId: (state, action: PayloadAction<number | undefined>) => {
      state.subjectId = action.payload;
    },
    setRating: (state, action: PayloadAction<SubjectRatingEntity | undefined>) => {
      state.rating = action.payload;
    },
    setAverageRating: (
      state,
      action: PayloadAction<SubjectAverageRating | undefined>,
    ) => {
      state.averageRating = action.payload;
    },
  },
});

export const subjectRatingActions = subjectRatingSlice.actions;
export const subjectRatingReducer = subjectRatingSlice.reducer;
