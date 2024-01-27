import {AnyObject, UseObjectState} from "../../common/WrapperType";
import {useObjectState} from "../../app/hooks";
import {Box} from "@mui/material";
import {ReactNode} from "react";
import {Expander} from "../../ui";

export interface UseListFilter<S> {
    filter: UseObjectState<S>[0]
    setFilterPartially: UseObjectState<S>[1]
    reset: () => void;
}

export const useListFilter = <S extends AnyObject>({initValue}: { initValue: S }): UseListFilter<S> => {
    const [filter, setFilterPartially]: UseObjectState<S> = useObjectState(initValue);
    const reset = () => setFilterPartially(initValue);
    return {filter, setFilterPartially, reset};
}

export const FilterContainer = ({children}: {
    children: ReactNode;
}) => {
    return (
        <Expander label={"Filter"}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" flexWrap="wrap" gap={4} rowGap={4}>
                {children}
            </Box>
        </Expander>
    )
}