import Brightness4Icon from "@mui/icons-material/Brightness4";
import { ListItem, ListItemIcon, ListItemText, Switch, Tab, Tabs } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { commonActions, Language } from "../features/common/commonSlice";
import TranslateIcon from "@mui/icons-material/Translate";

export const Setting = () => {
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);
  const language = useAppSelector((root: RootState) => root.common.language);
  const dispatch = useAppDispatch();

  return (
    <>
      <ListItem sx={{ pl: 4 }}>
        <ListItemIcon>
          <Brightness4Icon />
        </ListItemIcon>
        <ListItemText primary="Dark Mode: " />
        <Switch
          sx={{ marginLeft: 4 }}
          checked={darkTheme}
          onChange={() => dispatch(commonActions.setTheme(!darkTheme))}
        />
      </ListItem>

      <ListItem sx={{ pl: 4 }}>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText primary="Language: " />
        <br />
        <Tabs
          value={language}
          onChange={() => dispatch(commonActions.setLanguage(Language.japan))}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          {Language}
          <Tab value="one" label="Item One" />
          <Tab value="two" label="Item Two" />
          <Tab value="three" label="Item Three" />
        </Tabs>
      </ListItem>
    </>
  );
};
