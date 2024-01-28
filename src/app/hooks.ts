import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";
import {useEffect, useRef, useState} from "react";
import {AnyObject, UseObjectState, UseRef, UseState} from "../common/WrapperType";

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

export const useAsyncOnDidMount = (asyncFunction: () => Promise<void>): void => {
    useOnDidMount((): void => {
        void asyncFunction();
    })
}

export const useObjectState = <S extends AnyObject>(initObject: S): UseObjectState<S> => {
    const [object, setObject]: UseState<S> = useState(initObject);
    const setObjectPartially = (partial: Partial<S>): void => {
        setObject({...object, ...partial});
    }
    return [object, setObjectPartially];
}
