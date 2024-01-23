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
    Switch
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {commonReduxActions} from "../app/commonSlice";
import {Language, languageLabel} from "../language";

export const Setting = () => {
    const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);
    const texts = useAppSelector((root: RootState) => root.common.texts);
    const language = useAppSelector((root: RootState) => root.common.language);
    const dispatch = useAppDispatch();

    return (
        <>
            <ListItem>
                <ListItemIcon>
                    <Brightness4Icon/>
                </ListItemIcon>
                <ListItemText primary={texts.layout.sidebar.darkMode + ": "}/>
                <Switch
                    size="medium"
                    color="success"
                    sx={{marginLeft: 4}}
                    checked={darkTheme}
                    onChange={() => dispatch(commonReduxActions.setTheme(!darkTheme))}
                />
            </ListItem>

            <ListItem>
                <ListItemIcon>
                    <TranslateIcon/>
                </ListItemIcon>
                <ListItemText primary={texts.layout.sidebar.language + ": "}/>
                <FormControl>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={language}
                        onChange={(event: SelectChangeEvent<Language>) =>
                            dispatch(commonReduxActions.setLanguage(event.target.value as Language))
                        }>
                        {Object.keys(languageLabel).map((key, index) => {
                            return (
                                <MenuItem key={index} value={key}>
                                    {languageLabel[key as keyof typeof languageLabel]}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </ListItem>
        </>
    );
};
