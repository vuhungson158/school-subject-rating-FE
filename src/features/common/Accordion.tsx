import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Accordion as Acc,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

interface Props {
  label: string;
  icon: JSX.Element;
  children: JSX.Element;
}

export const Accordion = ({ label, icon, children }: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <Acc defaultExpanded sx={{ bgcolor: "background.default" }}>
      <AccordionSummary onClick={() => setOpen(!open)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} sx={{ color: "warning.main" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <List component="div" disablePadding>
          <Box>{children}</Box>
        </List>
      </AccordionDetails>
    </Acc>
  );
};
