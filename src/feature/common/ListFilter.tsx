import {AnyObject, UseObjectState} from "../../common/WrapperType";
import {useObjectState} from "../../app/hooks";

export const useListFilter = <S extends AnyObject>({initValue}: { initValue: S }) => {
    const [filter, setFilterPartially]: UseObjectState<S> = useObjectState(initValue);
    const reset = () => setFilterPartially(initValue);
    return {filter, setFilterPartially, reset};
}