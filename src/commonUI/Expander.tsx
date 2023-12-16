import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    List,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import {useState} from "react";
import {UseState} from "../common/WrapperType";

interface Props {
    label: string;
    icon?: JSX.Element;
    children: JSX.Element;
}

export const SidebarExpander = ({label, icon, children}: Props) => {
    const [open, setOpen]: UseState<boolean> = useState(true);

    return (
        <Accordion defaultExpanded sx={{bgcolor: "background.default", marginBottom: 2}}>
            <AccordionSummary onClick={() => setOpen(!open)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} sx={{color: "warning.main"}}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
                <List component="div" disablePadding>
                    <Box>{children}</Box>
                </List>
            </AccordionDetails>
        </Accordion>
    );
};


export const Expander = ({label, icon, children}: {
    label: string;
    icon?: JSX.Element;
    children: JSX.Element;
}) => {
    const [open, setOpen]: UseState<boolean> = useState(true);

    return (
        <Accordion defaultExpanded sx={{marginBottom: 2}}>
            <AccordionSummary onClick={() => setOpen(!open)} expandIcon={<ExpandMoreIcon/>}>
                {icon ?? <ListItemIcon>{icon}</ListItemIcon>}
                <Typography variant="h5">{label}</Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
                <List component="div" disablePadding>
                    <Box>{children}</Box>
                </List>
            </AccordionDetails>
        </Accordion>
    );
};