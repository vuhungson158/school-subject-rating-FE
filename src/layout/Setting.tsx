import Brightness4Icon from "@mui/icons-material/Brightness4";
import TranslateIcon from "@mui/icons-material/Translate";
import {
  FormControl,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { commonActions } from "../features/common/commonSlice";
import { Language, LANGUAGE } from "../language";

export const Setting = () => {
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const language = useAppSelector((root: RootState) => root.common.language);
  const dispatch = useAppDispatch();

  return (
    <>
      <ListItem sx={{ pl: 4 }}>
        <ListItemIcon>
          <Brightness4Icon />
        </ListItemIcon>
        <ListItemText primary={texts.darkMode + ": "} />
        <Switch
          size="medium"
          color="success"
          sx={{ marginLeft: 4 }}
          checked={darkTheme}
          onChange={() => dispatch(commonActions.setTheme(!darkTheme))}
        />
      </ListItem>

      <ListItem sx={{ pl: 4 }}>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText primary={texts.language + ": "} />
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            onChange={(event: SelectChangeEvent<Language>) =>
              dispatch(commonActions.setLanguage(event.target.value as Language))
            }
          >
            {Object.keys(LANGUAGE).map((key, index) => {
              return (
                <MenuItem key={index} value={key}>
                  {LANGUAGE[key as keyof typeof LANGUAGE]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </ListItem>
    </>
  );
};
