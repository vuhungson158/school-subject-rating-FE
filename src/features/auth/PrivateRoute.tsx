import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

export const PrivateRoute = () => {
  const isLoggined = useAppSelector((state: RootState) => state.auth.token);
  return isLoggined ? <Outlet /> : <Navigate to="/login" />;
};
