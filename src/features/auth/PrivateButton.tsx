import { Button, ButtonProps } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { actions } from "./";
import { Permission, Role } from "./Role";

interface Props extends ButtonProps {
  permission: Permission;
}

export const PrivateButton = ({ permission, ...buttonProps }: Props) => {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state: RootState) => state.auth.user?.role);
  const valid = role && Role[role].includes(permission);

  return (
    <Button
      {...buttonProps}
      onClick={
        valid
          ? buttonProps.onClick
          : () => {
              dispatch(actions.setLoginBackdropOpen(true));
            }
      }
    />
  );
};
