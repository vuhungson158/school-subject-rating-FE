import {Box} from "@mui/material";
import {Expander} from "../index";
import {ReactNode} from "react";

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