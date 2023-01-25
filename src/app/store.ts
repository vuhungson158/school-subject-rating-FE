import {
  Action,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/";
import { commonReducer } from "../features/common/";
import {
  subjectCommentReducer,
  subjectRatingReducer,
  subjectReducer,
} from "../features/subject/";
import {
  teacherCommentReducer,
  teacherRatingReducer,
  teacherReducer,
} from "../features/teacher";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,

    subject: subjectReducer,
    subjectRating: subjectRatingReducer,
    subjectComment: subjectCommentReducer,

    teacher: teacherReducer,
    teacherRating: teacherRatingReducer,
    teacherComment: teacherCommentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type Dispatch = ThunkDispatch<RootState, unknown, Action<string>>;
