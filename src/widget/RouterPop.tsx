import {Dialog, DialogContent} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import React from "react";
import {DialogContentProps} from "@mui/material/DialogContent/DialogContent";
import {Breakpoint} from "@mui/system";

export const RouterPop = (props: {
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
