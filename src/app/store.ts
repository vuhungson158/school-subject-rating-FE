import {
  configureStore,
  ThunkAction,
  Action,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import commonReducer from "../features/common/commonSlice";
import counterReducer from "../features/counter/counterSlice";
import subjectReducer from "../features/subject/subjectSlice";
import teacherReducer from "../features/teacher/teacherSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    common: commonReducer,
    subject: subjectReducer,
    teacher: teacherReducer,
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
