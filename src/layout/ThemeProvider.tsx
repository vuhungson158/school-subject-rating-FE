import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {createTheme, Theme, ThemeProvider as MuiThemeProvider} from "@mui/material";
import React from "react";

export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    const darkTheme: boolean = useAppSelector((root: RootState) => root.common.darkTheme);

    const theme: Theme = createTheme({
        palette: {
            mode: darkTheme ? "dark" : "light",
            neutral: {
                main: '#9e9e9e',
                dark: '#9e9e9e',
                contrastText: '#fff',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    containedPrimary: {
                        backgroundColor: "#1950BA",
                        color: "#fff"
                    },
                }
            }
        }
    });

    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    );
};

declare module '@mui/material/styles' {
    // @ts-ignore
    interface Palette {
        neutral: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
    }
}