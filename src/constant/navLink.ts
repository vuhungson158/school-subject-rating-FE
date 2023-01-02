import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Subject from "../features/subject";

export const navLinkItems: NavLinkItem[] = [
  {
    linkTo: "subject",
    icon: CastForEducationIcon,
    component: Subject,
  },
  {
    linkTo: "teacher",
    component: undefined,
  },
  {
    linkTo: "other",
    component: undefined,
  },
];

interface NavLinkItem {
  linkTo: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  component?: () => JSX.Element;
}