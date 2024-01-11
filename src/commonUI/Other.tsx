import {Box, styled} from "@mui/material";

export const JustifyBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    rowGap: 4
}));