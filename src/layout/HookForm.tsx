import {FormEventHandler, ReactNode} from "react";
import {Box, Button} from "@mui/material";

export const HookForm = ({
    children, onSubmit, onClear
}: {
    children: ReactNode;
    onSubmit: FormEventHandler<HTMLFormElement>;
    onClear: () => void;
}) => {

    return (
        <form onSubmit={onSubmit}>
            {children}

            <Box display="flex" justifyContent="space-evenly" alignItems="center" flexWrap="wrap"
                 gap={4} rowGap={4} sx={{marginTop: 4, minWidth: 480}}
            >
                <Button size="large" variant="outlined" onClick={onClear}>Clear</Button>
                <Button size="large" variant="contained" type="submit"> Submit </Button>
                {/*TODO*/}
                {/* disabled={isLoading}*/}
                {/*{isLoading ? <CircularProgress/> : "Submit"}*/}
            </Box>
        </form>
    )
}