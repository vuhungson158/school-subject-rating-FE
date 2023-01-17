import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PsychologyIcon from "@mui/icons-material/Psychology";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dashboard } from "../features/common";
import { Subject } from "../features/subject";
import { Teacher } from "../features/teacher";
export const navLinkItems: NavLinkItem[] = [
  {
    linkTo: "dashboard",
    icon: DashboardIcon,
    component: Dashboard,
  },
  {
    linkTo: "teacher",
    icon: PsychologyIcon,
    component: Teacher,
  },
  {
    linkTo: "subject",
    icon: CastForEducationIcon,
    component: Subject,
  },
];

interface NavLinkItem {
  linkTo: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  component?: () => JSX.Element;
}
