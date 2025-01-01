/* Hooks */
import useAuth from "../hooks/useAuth";

/* Providers */
import { SidebarProvider } from "./ui/sidebar";

/* components */
import { Outlet } from "react-router";
import DashboardSidebar from "./dashboardUI/SideBar";
import UnauthorizedAccess from "../pages/UnauthorizedAccess";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <UnauthorizedAccess />;
  }

  return (
    <SidebarProvider defaultOpen>
      <DashboardSidebar />

      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default ProtectedRoute;
