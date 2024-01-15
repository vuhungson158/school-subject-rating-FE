import MuiSkeleton from "@mui/material/Skeleton";
import React from "react";
import {Box} from "@mui/material";

export const Skeleton = () => {
    return (
        <MuiSkeleton sx={{marginY: 3}} animation="wave" variant="rounded" width="100%" height={50}/>
    );
};


export const FormSkeleton = () => (
    <Box>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
    </Box>
)