import React, {useState} from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {DialogContentProps} from "@mui/material/DialogContent/DialogContent";

export const PopUp = (props: { name: string } & DialogContentProps) => {
    const [open, setOpen] = useState(false);

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

