import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppThunk, RootState} from "./store";
import {DependencyList, useEffect, useRef} from "react";
import {UseRef} from "../common/WrapperType";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFetchDataOnMount = (fetchDataThunk: AppThunk): void => {
    const dispatch: AppDispatch = useAppDispatch();
    const isFirst: UseRef<boolean> = useRef(true);

    useEffect((): void => {
        if (isFirst.current) {
            dispatch(fetchDataThunk);
            isFirst.current = false
        }
    }, [fetchDataThunk, dispatch])
}

export const useAsyncEffect = (asyncEffect: () => Promise<void>, deps?: DependencyList): void => {
    useEffect((): void => {
        void asyncEffect();
    }, deps)
}