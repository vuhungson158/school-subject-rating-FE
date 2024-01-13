import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";
import {useEffect, useRef} from "react";
import {UseRef} from "../common/WrapperType";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useOnDidMount = (callback: () => void): void => {
    const isFirst: UseRef<boolean> = useRef(true);

    useEffect((): void => {
        if (isFirst.current) {
            callback();
            isFirst.current = false
        }
    }, [callback])
}

export const useAsync = (asyncEffect: () => Promise<void>): void => {
    useOnDidMount((): void => {
        void asyncEffect();
    })
}