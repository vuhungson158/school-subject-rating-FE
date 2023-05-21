import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListWithTotal, WithLikeCount } from "./model";
import { Entity } from "./react/model";

interface State {
  isLoading: boolean;
  isReacting: boolean;
  comment?: WithLikeCount;
  commentList: ListWithTotal;
  userReactList: Entity[];
}

const initialState: State = {
  isLoading: false,
  isReacting: false,
  comment: undefined,
  commentList: {
    total: 0,
    list: [],
  },
  userReactList: [],
};

const slice = createSlice({
  name: "teacherComment",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setReacting: (state, action: PayloadAction<boolean>) => {
      state.isReacting = action.payload;
    },
    setComment: (state, action: PayloadAction<WithLikeCount | undefined>) => {
      state.comment = action.payload;
    },
    setCommentList: (state, action: PayloadAction<ListWithTotal>) => {
      state.commentList = action.payload;
    },
    setUserReactList: (state, action: PayloadAction<Entity[]>) => {
      state.userReactList = action.payload;
    },
    replaceById: (
      state,
      action: PayloadAction<{ id: number; newComment: WithLikeCount }>,
    ) => {
      state.commentList.list = state.commentList.list.map((comment) =>
        comment.id === action.payload.id ? action.payload.newComment : comment,
      );
    },
  },
});

export const actions = slice.actions;
export const teacherCommentReducer = slice.reducer;
