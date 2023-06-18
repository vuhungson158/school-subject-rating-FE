import {Dialog, DialogContent} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import React from "react";
import {DialogContentProps} from "@mui/material/DialogContent/DialogContent";

export const RouterPop = (props: DialogContentProps) => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <Dialog
            open={true}
            onClose={() => navigate(-1)}
        >
            <DialogContent {...props} sx={{backgroundColor: "background.default"}}/>
        </Dialog>
    )
}
