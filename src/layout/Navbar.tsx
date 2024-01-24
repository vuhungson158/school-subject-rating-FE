import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {AppBar, Avatar, Box, Container, Toolbar, Typography} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import {CustomRouterLink, JustifyBox} from "../ui";

export const NavBar = () => {
    return (
        <AppBar position="static" sx={{marginY: 4}}>
            <Container maxWidth="xl">
                <JustifyBox sx={{justifyContent: "space-between"}}>
                    <JustifyBox>
                        <Logo/>
                        <NavLinks/>
                    </JustifyBox>
                    <Auth/>
                </JustifyBox>
            </Container>
        </AppBar>
    );
};

const Logo = () => {
    return (
        <JustifyBox>
            <InsertChartIcon/>
            <Typography variant="h6">Logo</Typography>
        </JustifyBox>
    )
}

const NavLinks = () => {
    const texts = useAppSelector((root: RootState) => root.common.texts);

    const navList = [
        {
            to: "subject",
            label: texts.layout.navigation.subject,
        },
        {
            to: "teacher",
            label: texts.layout.navigation.teacher,
        },
        {
            to: "subject/condition",
            label: "Condition",
        },
        {
            to: "subject/plan",
            label: "Plan",
        },
    ];

    return (
        <Toolbar disableGutters>

            <Box marginLeft={2} display="flex">
                {navList.map((link) => (
                    <CustomRouterLink key={link.to} to={`/${link.to}`}>
                        <Typography variant="h6" marginX={2}>
                            {link.label}
                        </Typography>
                    </CustomRouterLink>
                ))}
            </Box>
        </Toolbar>
    )
}

const Auth = () => {
    const user = useAppSelector((root: RootState) => root.auth.user);

    return (
        <Box>
            <Avatar
                alt={user?.displayName}
                src={user?.avatar}
                sx={{width: 40, height: 40, marginX: "auto"}}
            />
        </Box>
    )
}