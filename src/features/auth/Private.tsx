import { Button, ButtonProps } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { actions } from "./index";
import { Permission, Role } from "./Role";

export const PrivateElement = ({
  permission,
  children,
}: {
  permission: Permission;
  children: JSX.Element;
}) => {
  const role = useAppSelector((state: RootState) => state.auth.user?.role);
  const valid = role && Role[role].includes(permission);

  if (valid) return children;

  return <></>;
};

export const PrivateRoute = () => {
  const isLoggined = useAppSelector((state: RootState) => state.auth.token);
  return isLoggined ? <Outlet /> : <Navigate to="/login" />;
};


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
