/* Hooks */
import useAuth from "../hooks/useAuth";

/* components */
import { Outlet } from "react-router";
import UnauthorizedAccess from "../pages/UnauthorizedAccess";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <UnauthorizedAccess />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
