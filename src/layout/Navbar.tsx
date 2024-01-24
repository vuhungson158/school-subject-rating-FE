import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import {CustomRouterLink} from "../ui";

export const NavBar = () => {
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
        <AppBar position="static" sx={{marginY: 4}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <InsertChartIcon/>
                    <Typography variant="h6">Logo</Typography>

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
            </Container>
        </AppBar>
    );
};