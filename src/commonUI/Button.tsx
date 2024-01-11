import {Button, CircularProgress} from "@mui/material";
import {ButtonProps} from "@mui/material/Button/Button";

export const NormalButton = ({...props}: ButtonProps) => {
    return <Button {...props} variant="outlined"/>
}

export const AsyncButton = ({isLoading, ...props}: { isLoading: boolean } & ButtonProps) => {
    return <Button {...props} variant="contained" disabled={isLoading}>
        {isLoading ? <CircularProgress/> : props.children}
    </Button>
}