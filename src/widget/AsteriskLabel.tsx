import React from 'react';
import {Box} from "@mui/material";

export const AsteriskLabel = ({
    required,
    label
}: {
    label: string;
    required: boolean;
}) => (
    <Box display="flex" alignItems="center">
        {required && <Box component="span" fontSize={30} color="red" paddingLeft={1}>*</Box>}
        {label}
    </Box>
);

