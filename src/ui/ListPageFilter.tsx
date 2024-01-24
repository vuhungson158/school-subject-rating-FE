import {Box, Button} from "@mui/material";
import {Expander} from "./index";
import {ReactNode} from "react";

export const ListPageFilter = ({children, onClear}: {
    children: ReactNode;
    onClear?: () => void
}) => {
    return (
        <Expander label={"Filter"}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" flexWrap="wrap" gap={4} rowGap={4}>
                {children}
                {onClear && <Button size="large" variant="outlined" onClick={onClear}>Clear Filter</Button>}
            </Box>
        </Expander>
    )
}