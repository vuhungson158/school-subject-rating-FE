import {
  Action,
  configureStore,
  ThunkAction,
  ThunkDispatch
} from "@reduxjs/toolkit";
import {
  authReducer,
  commonReducer,
  subjectCommentReducer,
  subjectConditionReducer,
  subjectPlanReducer,
  subjectRatingReducer,
  subjectReducer,
  teacherCommentReducer,
  teacherRatingReducer,
  teacherReducer
} from "../features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,

    subject: subjectReducer,
    subjectRating: subjectRatingReducer,
    subjectComment: subjectCommentReducer,
    subjectPlan: subjectPlanReducer,
    subjectCondition: subjectConditionReducer,

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
