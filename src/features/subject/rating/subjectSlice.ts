import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubjectRatingEntity } from "../../../model";

interface SubjectState {
  isLoading: boolean;
  subjectId?: number;
  subjectRating?: SubjectRatingEntity;
}

const initialState: SubjectState = {
  isLoading: false,
  subjectId: undefined,
  subjectRating: undefined,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const subjectActions = subjectSlice.actions;
const subjectReducer = subjectSlice.reducer;
export default subjectReducer;
