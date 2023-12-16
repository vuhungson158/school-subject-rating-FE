import {Link} from "react-router-dom";
import {To} from "@remix-run/router/history";
import {Button, ButtonProps, styled} from "@mui/material";

export const ButtonLink = ({to, label, ...props}: { to: To; label: string } & ButtonProps) => {
    return (
        <Link to={to}>
            <Button variant="outlined" {...props}>{label}</Button>
        </Link>
    )
}

export const CustomRouterLink = styled(Link)(({theme}) => ({
    ...theme.typography.body2,
    color: theme.palette.primary.dark,
    textDecoration: "none",
    "&:hover": {
        textDecoration: "underline",
        color: theme.palette.primary.main,
    },
}));