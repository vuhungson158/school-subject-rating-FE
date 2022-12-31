import { Component } from "react";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const navLinkItems: NavLinkItem[] = [
  {
    label: "科目",
    linkTo: "subject",
    icon: CastForEducationIcon,
    // component: Subject,
  },
  {
    label: "先生",
    linkTo: "teacher",
    // component: Teacher,
  },
  {
    label: "コメント",
    linkTo: "comment",
    // component: Comment,
  },
  {
    label: "他の",
    linkTo: "other",
    // component: undefined,
  },
  {
    label: "login",
    linkTo: "login",
    // component: LoginPage,
  },
];

interface NavLinkItem {
  label: string;
  linkTo: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  component?: Component;
}