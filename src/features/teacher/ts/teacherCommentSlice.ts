import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TeacherCommentListWithTotal,
  TeacherCommentReactEntity,
  TeacherCommentWithLikeCount,
} from "../../../model";

interface TeacherCommentState {
  isLoading: boolean;
  isReacting: boolean;
  comment?: TeacherCommentWithLikeCount;
  commentList: TeacherCommentListWithTotal;
  userReactList: TeacherCommentReactEntity[];
}

const initialState: TeacherCommentState = {
  isLoading: false,
  isReacting: false,
  comment: undefined,
  commentList: {
    total: 0,
    list: [],
  },
  userReactList: [],
};

const teacherCommentSlice = createSlice({
  name: "teacherComment",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setReacting: (state, action: PayloadAction<boolean>) => {
      state.isReacting = action.payload;
    },
    setComment: (state, action: PayloadAction<TeacherCommentWithLikeCount | undefined>) => {
      state.comment = action.payload;
    },
    setCommentList: (state, action: PayloadAction<TeacherCommentListWithTotal>) => {
      state.commentList = action.payload;
    },
    setUserReactList: (state, action: PayloadAction<TeacherCommentReactEntity[]>) => {
      state.userReactList = action.payload;
    },
    replaceById: (
      state,
      action: PayloadAction<{ id: number; newComment: TeacherCommentWithLikeCount }>,
    ) => {
      state.commentList.list = state.commentList.list.map((comment) =>
        comment.id === action.payload.id ? action.payload.newComment : comment,
      );
    },
  },
});

export const teacherCommentActions = teacherCommentSlice.actions;
export const teacherCommentReducer = teacherCommentSlice.reducer;
