import React, {Dispatch, SetStateAction} from "react";
import {CaseReducerActions, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import {SliceState} from "../app/store";

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];
export type UseRef<T> = React.MutableRefObject<T>
export type UseParams<T> = Readonly<Partial<T>>
export type ReactInputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
export type ReduxAction<State extends SliceState, Actions extends SliceCaseReducers<State>> = CaseReducerActions<Actions, string>;

export type AnyObject = Record<string, any>;
export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export type UseObjectState<S> = [S, (partial: Partial<S>) => void];
