import {
  ExpandLess,
  ExpandMore,
  FeaturedPlayListTwoTone
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Collapse,
  Divider,
  Fab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText, styled,
  SwipeableDrawer
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { navLinkItems } from "../constant/navLink";
import { TextFields } from "./../language";
import { Setting } from "./Setting";
import UserInfor from "./UserInfo";

export const Sidebar = () => {
  const [isOpen, setOpen] = useState(true);
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [settingOpen, setSettingOpen] = useState(true);
  const [userOpen, setUserOpen] = useState(true);
  const texts = useAppSelector((root: RootState) => root.common.texts);

  return (
    <Box>
      <Fab
        sx={{ position: "fixed", bottom: 48, left: 36, zIndex: 1 }}
        className="fixed"
        onClick={() => setOpen(!isOpen)}
        color="secondary"
        aria-label="add"
        variant="circular">
        {<MenuIcon fontSize="large" />}
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
            sx={{ width: "100%", minWidth: 350, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader">
            <ListItemButton onClick={() => setNavigationOpen(!navigationOpen)}>
              <ListItemIcon>
                <PinDropIcon />
              </ListItemIcon>
              <ListItemText primary={texts.navigation} />
              {navigationOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={navigationOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {navLinkItems.map((item, index) => (
                  <CustomedNavLink key={index} to={item.linkTo}>
                    <ListItemButton>
                      <ListItemIcon>
                        {item.icon ? <item.icon /> : <FeaturedPlayListTwoTone />}
                      </ListItemIcon>
                      <ListItemText
                        primary={texts[item.linkTo as keyof TextFields]}
                      />
                    </ListItemButton>
                  </CustomedNavLink>
                ))}
              </List>
            </Collapse>

            <Divider />

            <ListItemButton onClick={() => setSettingOpen(!settingOpen)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={texts.setting} />
              {settingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={settingOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Setting />
              </List>
            </Collapse>

            <Divider />

            <ListItemButton onClick={() => setUserOpen(!userOpen)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="User Info" />
              {userOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={userOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <UserInfor />
              </List>
            </Collapse>
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

const CustomedNavLink = styled(NavLink)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
  textDecoration: "none",
  "> div": {
    padding: "6px 24px",
  },
  "&.active > div": {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.action.active,
    "& span": {
      fontWeight: "bold",
    },
  },
}));
