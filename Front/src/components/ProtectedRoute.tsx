/* components */
import { Outlet } from "react-router";

const ProtectedRoute: React.FC = () => {
  return <Outlet />;
};

export default ProtectedRoute;
