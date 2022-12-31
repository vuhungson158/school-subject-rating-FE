import { ExpandLess, ExpandMore, FeaturedPlayListTwoTone } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Button,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  SwipeableDrawer,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinkItems } from "../constant/navLinkItem";
import { Setting } from "./Setting";

export const Sidebar = () => {
  const [isOpen, setOpen] = useState(true);
  const [settingOpen, setSettingOpen] = useState(true);

  return (
    <Box>
      <Button
        sx={{ position: "fixed", top: "12px", left: 0, zIndex: 1 }}
        className="fixed"
        onClick={() => setOpen(!isOpen)}
      >
        {<MenuIcon />}
      </Button>
      <SwipeableDrawer anchor="left" open={isOpen} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
        <Box
          sx={{
            bgcolor: "background.default",
            height: "100%",
          }}
        >
          <List
            sx={{ width: "100%", minWidth: 240, maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nav Link
              </ListSubheader>
            }
          >
            {navLinkItems.map(
              (item, index) =>
                item.label && (
                  <CustomedNavLink key={index} to={item.linkTo}>
                    <ListItemButton>
                      <ListItemIcon>{item.icon ? <item.icon /> : <FeaturedPlayListTwoTone />}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </CustomedNavLink>
                ),
            )}
            <Divider />
            <ListItemButton onClick={() => setSettingOpen(!settingOpen)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Setting" />
              {settingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={settingOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Setting />
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
