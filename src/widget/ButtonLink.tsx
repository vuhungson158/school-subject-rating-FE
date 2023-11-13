import {Link} from "react-router-dom";
import {To} from "@remix-run/router/history";
import {Button, ButtonProps} from "@mui/material";

export const ButtonLink = ({to, label, ...props}: { to: To; label: string } & ButtonProps) => {
    return (
        <Link to={to}>
            <Button variant="outlined" {...props}>{label}</Button>
        </Link>
    )
}