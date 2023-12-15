import {Dispatch, SetStateAction} from "react";

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];

export type AnyObject = { [key: string]: any };
