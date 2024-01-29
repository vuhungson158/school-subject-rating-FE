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
import {Language, languageLabel} from "../language";
import {settingReduxActions} from "../app/settingSlice";
import {JustifyBox} from "../ui";

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
                    onChange={() => dispatch(settingReduxActions.setTheme(!darkTheme))}
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
                            dispatch(settingReduxActions.setLanguage(event.target.value as Language))
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


export const NavbarSetting = () => {
    return (
        <JustifyBox marginRight={8}>
            <ThemeSetting/>
            <LanguageSetting/>
        </JustifyBox>
    );
};

const ThemeSetting = () => {
    const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);
    const texts = useAppSelector((root: RootState) => root.common.texts);
    const dispatch = useAppDispatch();

    return (
        <JustifyBox marginRight={4}>
            <Brightness4Icon/>
            <ListItemText primary={texts.layout.sidebar.darkMode + ": "}/>
            <Switch
                size="medium"
                color="success"
                checked={darkTheme}
                onChange={() => dispatch(settingReduxActions.setTheme(!darkTheme))}
            />
        </JustifyBox>
    )
}

const LanguageSetting = () => {
    const texts = useAppSelector((root: RootState) => root.common.texts);
    const dispatch = useAppDispatch();
    const language = useAppSelector((root: RootState) => root.common.language);

    return (
        <JustifyBox>
            <TranslateIcon/>
            <ListItemText primary={texts.layout.sidebar.language + ": "}/>
            <FormControl sx={{marginBottom: -0.5, marginLeft: 1}}>
                <Select
                    size="small"
                    variant="standard"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    onChange={(event: SelectChangeEvent<Language>) =>
                        dispatch(settingReduxActions.setLanguage(event.target.value as Language))
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
        </JustifyBox>
    )
}