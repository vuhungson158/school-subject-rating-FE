import { FeaturedPlayListTwoTone } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Divider,
  Fab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SwipeableDrawer
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { navLinkItems } from "../constant";
import { UserInfor } from "../features/auth";
import { Accordion } from "../features/common";
import { Setting } from "./";
import { TextFields } from "./../language";

export const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);
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
            <Accordion
              open={navigationOpen}
              onClick={() => setNavigationOpen(!navigationOpen)}
              icon={<PinDropIcon />}
              label={texts.navigation}
              content={<Navigation texts={texts} />}
            />

            <Divider />
            <Accordion
              open={settingOpen}
              onClick={() => setSettingOpen(!settingOpen)}
              icon={<SettingsIcon />}
              label={texts.setting}
              content={<Setting />}
            />

            <Divider />
            <Accordion
              open={userOpen}
              onClick={() => setUserOpen(!userOpen)}
              icon={<AccountCircleIcon />}
              label="User Info"
              content={<UserInfor />}
            />
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

const Navigation = ({ texts }: { texts: TextFields }) => (
  <>
    {navLinkItems.map((item, index) => (
      <CustomedNavLink key={index} to={item.linkTo}>
        <ListItemButton>
          <ListItemIcon>
            {item.icon ? <item.icon /> : <FeaturedPlayListTwoTone />}
          </ListItemIcon>
          <ListItemText primary={texts[item.linkTo as keyof TextFields]} />
        </ListItemButton>
      </CustomedNavLink>
    ))}
  </>
);
