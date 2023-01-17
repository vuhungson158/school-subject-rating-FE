import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const Accordion = ({
  open,
  onClick,
  icon,
  label,
  content,
}: {
  open: boolean;
  onClick: () => void;
  icon: JSX.Element;
  label: string;
  content: JSX.Element;
}) => (
  <>
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {content}
      </List>
    </Collapse>
  </>
);
