import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppThunk, RootState} from "./store";
import {useEffect} from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFetchDataOnMount = (fetchDataThunk: AppThunk): void => {
    const dispatch: AppDispatch = useAppDispatch();

    useEffect((): void => {
        dispatch(fetchDataThunk);
    }, [dispatch])
}