import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const CustomRouterLink = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.dark,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
    color: theme.palette.primary.main,
  },
}));