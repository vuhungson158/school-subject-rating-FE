import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { CustomedLink } from "../features/common";
import { NavigationI } from "../language";

export const Breadcrumb = () => {
  const location = useLocation();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box marginTop={2}>
      {pathnames[pathnames.length - 1] !== "dashboard" && (
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}>
          <CustomedLink color="inherit" to="/">
            {texts.layout.navigation.home}
          </CustomedLink>

          {pathnames.map((path, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const nav = texts.layout.navigation[path as keyof NavigationI];

            return !last ? (
              <CustomedLink color="inherit" to={to} key={path}>
                {nav}
              </CustomedLink>
            ) : (
              <Typography color="text.primary" key={path}>
                {nav}
              </Typography>
            );
          })}
        </Breadcrumbs>
      )}
    </Box>
  );
};
