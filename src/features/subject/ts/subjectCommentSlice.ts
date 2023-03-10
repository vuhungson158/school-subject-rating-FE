import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SubjectCommentListWithTotal,
  SubjectCommentReactEntity,
  SubjectCommentWithLikeCount,
} from "../../../model";

interface SubjectCommentState {
  isLoading: boolean;
  isReacting: boolean;
  comment?: SubjectCommentWithLikeCount;
  commentList: SubjectCommentListWithTotal;
  userReactList: SubjectCommentReactEntity[];
}

const initialState: SubjectCommentState = {
  isLoading: false,
  isReacting: false,
  comment: undefined,
  commentList: {
    total: 0,
    list: [],
  },
  userReactList: [],
};

const subjectCommentSlice = createSlice({
  name: "subjectComment",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setReacting: (state, action: PayloadAction<boolean>) => {
      state.isReacting = action.payload;
    },
    setComment: (state, action: PayloadAction<SubjectCommentWithLikeCount | undefined>) => {
      state.comment = action.payload;
    },
    setCommentList: (state, action: PayloadAction<SubjectCommentListWithTotal>) => {
      state.commentList = action.payload;
    },
    setUserReactList: (state, action: PayloadAction<SubjectCommentReactEntity[]>) => {
      state.userReactList = action.payload;
    },
    replaceById: (
      state,
      action: PayloadAction<{ id: number; newComment: SubjectCommentWithLikeCount }>,
    ) => {
      state.commentList.list = state.commentList.list.map((comment) =>
        comment.id === action.payload.id ? action.payload.newComment : comment,
      );
    },
  },
});

export const subjectCommentActions = subjectCommentSlice.actions;
export const subjectCommentReducer = subjectCommentSlice.reducer;
