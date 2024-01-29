import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WritableDraft} from "immer/src/types/types-external";
import {Slice, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import type {Reducer} from "redux";
import {ReduxAction} from "../common/WrapperType";
import {Feature} from "../common/enums";
import {Util} from "../util";

export type Trigger = number;

interface TriggerSliceState {
    refreshList: { [P in Feature]: number };
}

const initialTriggerSliceState: TriggerSliceState = {
    refreshList: Util.convertArrayToObject(Object.values(Feature), (_: Feature): number => 0),
};

const triggerSliceReducers = {
    refreshList: (state: WritableDraft<TriggerSliceState>, action: PayloadAction<Feature>): void => {
        state.refreshList[action.payload]++;
    },
} satisfies SliceCaseReducers<TriggerSliceState>
type TriggerSliceAction = typeof triggerSliceReducers;


const triggerSlice: Slice<TriggerSliceState, TriggerSliceAction> = createSlice({
    name: Feature.SETTING,
    initialState: initialTriggerSliceState,
    reducers: triggerSliceReducers,
});

export const triggerReduxActions: ReduxAction<TriggerSliceState, TriggerSliceAction> = triggerSlice.actions;
export const triggerReducer: Reducer<TriggerSliceState> = triggerSlice.reducer;
