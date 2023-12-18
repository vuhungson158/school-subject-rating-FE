import {Dispatch, SetStateAction} from "react";
import {CaseReducerActions, Slice, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import type {Reducer} from "redux";

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];

export type AnyObject = { [key: string]: any };

export type ReduxSlice<T> = Slice<T, SliceCaseReducers<T>>;
export type ReduxAction<T> = CaseReducerActions<SliceCaseReducers<T>, string>;
