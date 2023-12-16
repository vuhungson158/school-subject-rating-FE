import React, {Dispatch, SetStateAction, useState} from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import {DialogContentProps} from "@mui/material/DialogContent/DialogContent";
import {Breakpoint} from "@mui/system";
import {NavigateFunction, useNavigate} from "react-router-dom";

export const PopUp = (props: { name: string } & DialogContentProps) => {
    const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    return (
        <Box>
            <Button variant="outlined" onClick={() => setOpen(!open)}>
                {props.name}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    {props.name}
                </DialogTitle>
                <DialogContent {...props} sx={{backgroundColor: "background.default"}}/>
            </Dialog>
        </Box>
    );
};


export const RouterPopUp = (props: {
    maxWidth?: Breakpoint | false;
} & DialogContentProps) => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <Dialog
            open={true}
            onClose={() => navigate(-1)}
            fullWidth={!!props.maxWidth}
            maxWidth={props.maxWidth}
        >
            <DialogContent {...props} sx={{
                backgroundColor: "background.default",
                minWidth: 360
            }}/>
        </Dialog>
    )
}

export const DeletePopUp = ({open, label, onClose, onSubmit}: {
    open: boolean;
    label: string;
    onClose: () => void;
    onSubmit: () => void;
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent sx={{backgroundColor: "background.default"}}>
                <Typography textAlign="center" variant="h2" color="red">
                    DELETE
                </Typography>
                <Typography
                    textAlign="center"
                    variant="h2"
                    color="Highlight"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis">
                    {label}
                </Typography>

                <Button fullWidth variant="outlined" color="error" onClick={onSubmit}>
                    Delete
                </Button>
            </DialogContent>
        </Dialog>
    );
};