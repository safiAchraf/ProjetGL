/* Hooks */
import useAuth from "../hooks/useAuth";

/* Providers */
import { SidebarProvider } from "./ui/sidebar";

/* components */
import { Outlet } from "react-router";
import DashboardSidebar from "./dashboardUI/SideBar";
import UnauthorizedAccess from "../pages/UnauthorizedAccess";

/* Icons */
import { Loader2 } from "lucide-react";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin" size={64} />
        <span>Moving at speed of light. Hold tight!</span>
      </main>
    );
  }

  if (!isLoading && !isAuthenticated) {
    return <UnauthorizedAccess />;
  }

  return (
    <SidebarProvider defaultOpen>
      <DashboardSidebar />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default ProtectedRoute;
