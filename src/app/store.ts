import {Action, configureStore, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {settingReducer} from "./settingSlice";
import {triggerReducer} from "./triggerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        common: settingReducer,
        trigger: triggerReducer,
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
