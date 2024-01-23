import {Link} from "react-router-dom";
import {To} from "@remix-run/router/history";
import {Box, Button, ButtonProps, Divider, Paper, Stack, styled} from "@mui/material";

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

export const LinkList = ({label, children}: { label: string, children: JSX.Element[] }) => {
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box marginTop={4}>
            <Box marginLeft={2}>{label}</Box>
            <Stack
                marginTop={1}
                marginLeft={4}
                direction="row"
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
            >
                {children.map((link, index) => (
                    <Item key={index}>
                        {link}
                    </Item>
                ))}
            </Stack>
        </Box>
    )
}