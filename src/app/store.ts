import {Action, configureStore, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";
import {subjectReducer} from "./subjectSlice";
import {teacherReducer} from "./teacherSlice";
import {authReducer} from "./authSlice";
import {commonReducer} from "./commonSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        common: commonReducer,

        subject: subjectReducer,
        // subjectRating: subjectRatingReducer,
        // subjectPlan: subjectPlanReducer,
        // subjectCondition: subjectConditionReducer,

        teacher: teacherReducer,
        // teacherRating: teacherRatingReducer,

        // comment: commentReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['subjectPlan/initBigList'],
                ignoredPaths: ['subjectPlan.bigList'],
            },
        });
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type ThunkActionDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export interface SliceState {
}
