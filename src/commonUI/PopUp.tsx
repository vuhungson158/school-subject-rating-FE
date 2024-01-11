import React, {Dispatch, SetStateAction, useState} from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {DialogContentProps} from "@mui/material/DialogContent/DialogContent";
import {Breakpoint} from "@mui/system";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {DialogTitleProps} from "@mui/material/DialogTitle/DialogTitle";
import {DialogProps} from "@mui/material/Dialog/Dialog";

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


export const RouterPopUp = ({...props}: {
    maxWidth?: Breakpoint | false;
} & Partial<DialogProps>) => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <Dialog
            {...props}
            open={true}
            onClose={() => navigate(-1)}
            fullWidth={!!props.maxWidth}
            maxWidth={props.maxWidth}
        />
    )
}

export const RouterPopUpTitle = (props: DialogTitleProps) => {
    return <DialogTitle {...props} textAlign="center" fontSize={48} sx={{
        backgroundColor: "background.default",
    }}/>
}

export const RouterPopUpContent = (props: DialogContentProps) => {
    return <DialogContent {...props} sx={{
        backgroundColor: "background.default",
        minWidth: 360
    }}/>
}

// export const DeletePopUp = ({open, label, onClose, onSubmit}: {
//     open: boolean;
//     label: string;
//     onClose: () => void;
//     onSubmit: () => void;
// }) => {
//     return (
//         <Dialog open={open} onClose={onClose}>
//             <DialogContent sx={{backgroundColor: "background.default"}}>
//                 <Typography textAlign="center" variant="h2" color="red">
//                     DELETE
//                 </Typography>
//                 <Typography
//                     textAlign="center"
//                     variant="h2"
//                     color="Highlight"
//                     whiteSpace="nowrap"
//                     textOverflow="ellipsis">
//                     {label}
//                 </Typography>
//
//                 <Button fullWidth variant="outlined" color="error" onClick={onSubmit}>
//                     Delete
//                 </Button>
//             </DialogContent>
//         </Dialog>
//     );
// };