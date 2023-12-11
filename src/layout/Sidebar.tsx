import { FeaturedPlayListTwoTone } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Fab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SwipeableDrawer,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { navLinkList } from "../constant";
import { UserInfor } from "../auth";
import { Accordion } from "../common";
import { Setting } from "./";
import { NavigationLanguage, TextFields } from "../language";

export const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);
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
            sx={{ minWidth: 350, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader">
            <Accordion
              icon={<PinDropIcon />}
              label={texts.layout.sidebar.navigation}>
              <Navigation texts={texts} />
            </Accordion>
            <Accordion icon={<SettingsIcon />} label={texts.layout.sidebar.setting}>
              <Setting />
            </Accordion>
            <Accordion
              icon={<AccountCircleIcon />}
              label={texts.layout.sidebar.userInfo}>
              <UserInfor />
            </Accordion>
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
    {navLinkList.map((item, index) => (
      <CustomedNavLink key={index} to={item.linkTo}>
        <ListItemButton>
          <ListItemIcon>
            {item.icon ? <item.icon /> : <FeaturedPlayListTwoTone />}
          </ListItemIcon>
          <ListItemText
            primary={texts.layout.navigation[item.linkTo as keyof NavigationLanguage]}
          />
        </ListItemButton>
      </CustomedNavLink>
    ))}
  </>
);
