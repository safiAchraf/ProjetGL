/* Hooks */
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

/* Providers */
import { SidebarProvider } from "./ui/sidebar";

/* components */
import { Outlet } from "react-router";
import DashboardSidebar from "./dashboardUI/SideBar";
import UnauthorizedAccess from "../pages/UnauthorizedAccess";

/* Icons */
import { Loader2 } from "lucide-react";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, salon, hasCheckedSalon } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setFakeLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [fakeLoading]);

  if (isLoading || (isAuthenticated && !hasCheckedSalon) || fakeLoading) {
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

  if (isAuthenticated && !salon && hasCheckedSalon) {
    navigate("/create");
  }

  return (
    <SidebarProvider defaultOpen>
      {!(pathname.includes("history") || pathname.includes("settings")) && (
        <DashboardSidebar />
      )}
      <main className="w-full h-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default ProtectedRoute;
