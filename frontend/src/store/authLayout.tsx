import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./AuthContextProvider";

export const AuthLayout = () => {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
};
