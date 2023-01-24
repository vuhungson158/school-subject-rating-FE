import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
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
    <Box>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Box paddingX={4}>{children}</Box>
        </List>
      </Collapse>
      <Divider />
    </Box>
  );
};
