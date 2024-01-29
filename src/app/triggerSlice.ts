import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WritableDraft} from "immer/src/types/types-external";
import {Slice, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import type {Reducer} from "redux";
import {ReduxAction} from "../common/WrapperType";
import {Feature} from "../common/enums";
import {Util} from "../util";
import {TemplateLiteral} from "../model/templateLiteral";

export type TriggerValue = number;

const triggers = ["teacherList", "subjectList"] as const;

type Trigger = TemplateLiteral<typeof triggers>;

type TriggerSliceState = Record<Trigger, number>

const initialTriggerSliceState: TriggerSliceState = Util.convertArrayToObject(triggers, (_: Trigger): number => 0);

const triggerSliceReducers = {
    refreshList: (state: WritableDraft<TriggerSliceState>, action: PayloadAction<Trigger>): void => {
        state[action.payload]++;
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
