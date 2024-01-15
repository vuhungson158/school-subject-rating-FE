import {Box, styled, TextField} from "@mui/material";
import React from "react";
import {Skeleton} from "./Skeleton";

export const JustifyBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    rowGap: 4
}));

export const InformationHolder = ({value, label}: { value: any, label: string }) => {
    return (
        value
            ? <TextField
                label={label}
                value={value}
                fullWidth
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
                sx={{marginTop: 4}}
            />
            : <Skeleton/>
    )
}