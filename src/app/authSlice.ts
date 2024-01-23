import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Entity} from "../model/authModel";
import {Feature} from "../common/enums";
import {Slice, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import {ReduxAction} from "../common/WrapperType";
import type {Reducer} from "redux";
import {WritableDraft} from "immer/src/types/types-external";

interface AuthSliceState {
    isLoading: boolean;
    token?: string;
    user?: Entity;
    loginBackdropOpen: boolean;
    resignBackdropOpen: boolean;
}

const initialAuthSliceState: AuthSliceState = {
    isLoading: false,
    token: undefined,
    user: undefined,
    loginBackdropOpen: false,
    resignBackdropOpen: false,
};

const authSliceReducers = {
    setLoginBackdropOpen: (state: WritableDraft<AuthSliceState>, action: PayloadAction<boolean>): void => {
        state.loginBackdropOpen = action.payload;
    },
    setResignBackdropOpen: (state: WritableDraft<AuthSliceState>, action: PayloadAction<boolean>): void => {
        state.resignBackdropOpen = action.payload;
    },
    setToken: (state: WritableDraft<AuthSliceState>, action: PayloadAction<string>): void => {
        state.token = action.payload;
    },
    removeToken: (state: WritableDraft<AuthSliceState>): void => {
        state.token = undefined;
    },
    setLoading: (state: WritableDraft<AuthSliceState>, action: PayloadAction<boolean>): void => {
        state.isLoading = action.payload;
    },
    setUser: (state: WritableDraft<AuthSliceState>, action: PayloadAction<Entity>): void => {
        state.user = action.payload;
    },
    removeUser: (state: WritableDraft<AuthSliceState>): void => {
        state.user = undefined;
    },
} satisfies SliceCaseReducers<AuthSliceState>;
type AuthSliceAction = typeof authSliceReducers;

const authSlice: Slice<AuthSliceState, AuthSliceAction> = createSlice({
    name: Feature.AUTH,
    initialState: initialAuthSliceState,
    reducers: authSliceReducers,
});

export const authReduxActions: ReduxAction<AuthSliceState, AuthSliceAction> = authSlice.actions;
export const authReducer: Reducer<AuthSliceState> = authSlice.reducer;
