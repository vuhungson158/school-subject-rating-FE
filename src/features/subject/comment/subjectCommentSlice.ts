import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CommentWithLikeCount } from "../../../model";

interface SubjectCommentState {
  isLoading: boolean;
  comment?: CommentWithLikeCount;
  commentList: CommentWithLikeCount[];
}

const initialState: SubjectCommentState = {
  isLoading: false,
  comment: undefined,
  commentList: [],
};

const subjectCommentSlice = createSlice({
  name: "subjectComment",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setComment: (
      state,
      action: PayloadAction<CommentWithLikeCount | undefined>,
    ) => {
      state.comment = action.payload;
    },
    setCommentList: (
      state,
      action: PayloadAction<CommentWithLikeCount[]>,
    ) => {
      state.commentList = action.payload;
    },
  },
});

export const subjectCommentActions = subjectCommentSlice.actions;
export const subjectCommentReducer = subjectCommentSlice.reducer;
