import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { CustomedLink } from "../features/common";

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box marginTop={2}>
      {pathnames[pathnames.length - 1] !== "dashboard" && (
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}>
          <CustomedLink color="inherit" to="/">
            home
          </CustomedLink>

          {pathnames.map((path, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            return !last ? (
              <CustomedLink color="inherit" to={to} key={path}>
                {path}
              </CustomedLink>
            ) : (
              <Typography color="text.primary" key={path}>
                {path}
              </Typography>
            );
          })}
        </Breadcrumbs>
      )}
    </Box>
  );
};
