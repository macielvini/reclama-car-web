import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./app-routes";
import { useAuth } from "../hooks/useAuth";
import AuthRoutes from "./auth-routes";

const Routes = () => {
  const { credentials } = useAuth();

  return (
    <BrowserRouter>
      <AuthRoutes />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default Routes;
