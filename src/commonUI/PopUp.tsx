import React, {Dispatch, ReactNode, SetStateAction, useState} from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {DialogContentProps} from "@mui/material/DialogContent/DialogContent";
import {Breakpoint} from "@mui/system";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {DialogTitleProps} from "@mui/material/DialogTitle/DialogTitle";
import {DialogProps} from "@mui/material/Dialog/Dialog";
import {MuiColor, UseState} from "../common/WrapperType";
import {AsyncButton} from "./Button";
import {JustifyBox} from "./Other";

export const PopUp = ({title, buttonColor, ...props}: {
    title: string,
    buttonColor?: MuiColor
} & DialogContentProps) => {
    const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    return (
        <Box>
            <Button variant="outlined" onClick={() => setOpen(!open)} color={buttonColor}>
                {title}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <PopUpTitle>
                    {title}
                </PopUpTitle>
                <PopUpContent {...props}/>
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

export const PopUpTitle = (props: DialogTitleProps) => {
    return <DialogTitle {...props} textAlign="center" fontSize={48} sx={{
        backgroundColor: "background.default",
    }}/>
}

export const PopUpContent = (props: DialogContentProps) => {
    return <DialogContent {...props} sx={{
        backgroundColor: "background.default",
        minWidth: 360
    }}/>
}

export const DeletePopUp = ({children, onAccept}: { children: ReactNode, onAccept: () => Promise<void> }) => {
    const [loading, setLoading]: UseState<boolean> = useState(false);

    const handleClick = async (): Promise<void> => {
        setLoading(true);
        await onAccept();
        setLoading(false);
    }

    return (
        <PopUp title="Delete" buttonColor="error">
            {children}
            <JustifyBox sx={{justifyContent: "right"}}>
                <AsyncButton isLoading={loading} color="error" onClick={handleClick}>
                    OK
                </AsyncButton>
            </JustifyBox>
        </PopUp>
    )
}