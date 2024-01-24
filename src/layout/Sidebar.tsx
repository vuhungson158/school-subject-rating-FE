import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SettingsIcon from "@mui/icons-material/Settings";
import {Box, Fab, List, ListItemButton, ListItemIcon, ListItemText, styled, SwipeableDrawer,} from "@mui/material";
import {ReactNode, useState} from "react";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {Setting} from "./";
import {NavigationLabel, TextFields} from "../language";
import {UseState} from "../common/WrapperType";
import {Feature} from "../common/enums";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import {SidebarExpander} from "../ui";
import {UserInfor} from "../feature/auth/UserInfo";

export const Sidebar = () => {
    const [isOpen, setOpen]: UseState<boolean> = useState(false);
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return (
        <Box>
            <Fab
                sx={{position: "fixed", top: 48, left: 24, zIndex: 1}}
                className="fixed"
                onClick={() => setOpen(!isOpen)}
                color="warning"
                aria-label="add"
                variant="circular">
                {<MenuIcon fontSize="large"/>}
            </Fab>

            <SwipeableDrawer
                anchor="left"
                open={isOpen}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}>
                <Box
                    sx={{
                        bgcolor: "background.default",
                        height: "100%",
                    }}>
                    <List
                        sx={{minWidth: 350, bgcolor: "background.paper"}}
                        component="nav"
                        aria-labelledby="nested-list-subheader">
                        <SidebarExpander
                            icon={<PinDropIcon/>}
                            label={texts.layout.sidebar.navigation}>
                            <Navigation/>
                        </SidebarExpander>
                        <SidebarExpander icon={<SettingsIcon/>} label={texts.layout.sidebar.setting}>
                            <Setting/>
                        </SidebarExpander>
                        <SidebarExpander
                            icon={<AccountCircleIcon/>}
                            label={texts.layout.sidebar.userInfo}>
                            <UserInfor/>
                        </SidebarExpander>
                    </List>
                </Box>
            </SwipeableDrawer>
        </Box>
    );
};

const CustomNavLink = styled(NavLink)(({theme}) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: "60px",
    textDecoration: "none",
    "&.active > div": {
        backgroundColor: theme.palette.action.selected,
        color: theme.palette.action.active,
        "& span": {
            fontWeight: "bold",
        },
    },
}));

const Navigation = () => (
    <>
        <RouteLink linkTo={Feature.DASHBOARD} icon={<DashboardIcon/>}/>
        <RouteLink linkTo={Feature.TEACHER} icon={<PsychologyIcon/>}/>
        <RouteLink linkTo={Feature.SUBJECT} icon={<CastForEducationIcon/>}/>
    </>
);

const RouteLink = ({linkTo, icon}: { linkTo: keyof NavigationLabel, icon: ReactNode }) => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return (
        <CustomNavLink to={linkTo}>
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={texts.layout.navigation[linkTo]}
                />
            </ListItemButton>
        </CustomNavLink>
    )
}
