import React, {Dispatch, SetStateAction} from "react";
import {CaseReducerActions, Slice, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];

export type AnyObject = { [key: string]: any };

export type ReactInputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export type ReduxSlice<T> = Slice<T, SliceCaseReducers<T>>;
export type ReduxAction<T> = CaseReducerActions<SliceCaseReducers<T>, string>;
