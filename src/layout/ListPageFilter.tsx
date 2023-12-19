import {Box} from "@mui/material";
import {Expander} from "../commonUI";
import {ReactNode} from "react";

export const ListPageFilter = ({children}: { children: ReactNode }) => {
    return (
        <Expander label={"Filter"}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" flexWrap="wrap" rowGap={4}>
                {children}
            </Box>
        </Expander>
    )
}