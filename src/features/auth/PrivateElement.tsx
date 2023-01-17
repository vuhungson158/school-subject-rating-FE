import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Permission, UserRole } from "../../model";

export const PrivateElement = ({
  permission,
  children,
}: {
  permission: Permission;
  children: JSX.Element;
}) => {
  const role = useAppSelector((state: RootState) => state.auth.user?.role);
  const valid = role && UserRole[role].includes(permission);

  if (valid) return children;

  return <></>;
};
