import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const ProtectedRoute: FC<PropsWithChildren<{}>> = ({ children }) => {
  return localStorage.getItem("id") ? (
    <>{children}</>
  ) : (
    <Navigate to={"/login"} />
  );
};
