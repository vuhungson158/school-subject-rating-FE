import React, {Dispatch, SetStateAction} from "react";
import {CaseReducerActions, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];
export type UseRef<T> = React.MutableRefObject<T>
export type UseParams<T> = Readonly<Partial<T>>

export type AnyObject = { [key: string]: any };

export type ReactInputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export type ReduxAction<T extends SliceCaseReducers<any>> = CaseReducerActions<T, string>;

export type ControlledNumber = number | "";
export const parseToControlledNumber = (number: string): ControlledNumber => number === "" ? "" : Number(number);

export type MuiColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
