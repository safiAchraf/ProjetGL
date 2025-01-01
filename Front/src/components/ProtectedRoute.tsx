/* Hooks */
import { useLocation } from "react-router";
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

  const location = useLocation();

  const routeMessages: { [key: string]: string } = {
    "/dashboard": "Welcome to the Dashboard!",
    "/dashboard/history": "Your Booking History",
    "/dashboard/reviews": "Manage Reviews",
    "/dashboard/settings": "Account Settings",
  };

  const currentMessage: string = routeMessages[location.pathname] || "";

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
        <nav className="w-full h-16 flex items-center justify-between px-6 shadow">
          <div className="text-zinc-800 text-lg font-semibold">
            {currentMessage}
          </div>

          {/* Toggle User/Manager */}
        </nav>

        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default ProtectedRoute;
