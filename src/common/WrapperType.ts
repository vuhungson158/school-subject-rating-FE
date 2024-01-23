import React, {Dispatch, SetStateAction} from "react";
import {CaseReducerActions, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import {SliceState} from "../app/store";

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];
export type UseRef<T> = React.MutableRefObject<T>
export type UseParams<T> = Readonly<Partial<T>>

export type AnyObject = { [key: string]: any };

export type ReactInputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export type ReduxAction<State extends SliceState, Actions extends SliceCaseReducers<State>> = CaseReducerActions<Actions, string>;

export type ControlledNumber = number | "";
export const parseToControlledNumber = (number: string): ControlledNumber => number === "" ? "" : Number(number);

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};