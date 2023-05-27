import { Theme, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  export default function createTheme(
    options?: ThemeOptions,
    ...args: object[]
  ): Theme;

  interface Palette {
    neutral?: Palette["primary"];
    custom?: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    custom?: PaletteOptions["primary"];
  }

  // interface Theme {
  //   status: {
  //     danger: React.CSSProperties['color'];
  //   };
  // }

  // interface ThemeOptions {
  //   status: {
  //     danger: React.CSSProperties['color'];
  //   };
  // }

  // interface PaletteColor {
  //   darker?: string;
  // }

  // interface SimplePaletteColorOptions {
  //   darker?: string;
  // }
}
