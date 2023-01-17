import { Button, ButtonProps } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Permission, UserRole } from "../../model";
import { authActions } from "./";

interface Props extends ButtonProps {
  permission: Permission;
}

export const PrivateButton = ({ permission, ...buttonProps }: Props) => {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state: RootState) => state.auth.user?.role);
  const valid = role && UserRole[role].includes(permission);

  return (
    <Button
      {...buttonProps}
      onClick={
        valid
          ? buttonProps.onClick
          : () => {
              dispatch(authActions.setLoginBackdropOpen(true));
            }
      }
    />
  );
};
