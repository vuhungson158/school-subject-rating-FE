import {Button, CircularProgress} from "@mui/material";
import {ButtonProps} from "@mui/material/Button/Button";
import {Link} from "react-router-dom";
import {To} from "@remix-run/router/history";

export const NormalButton = ({...props}: ButtonProps) => {
    return <Button {...props} variant="outlined"/>
}

export const AsyncButton = ({isLoading, ...props}: { isLoading: boolean } & ButtonProps) => {
    return (
        <Button {...props} variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress/> : props.children}
        </Button>
    )
}

export const RouterLinkButton = ({to, label, ...props}: { to: To, label: string } & ButtonProps) => {
    return (
        <Link to={to}>
            <Button variant="outlined" color="primary" {...props}>
                {label}
            </Button>
        </Link>
    )
}