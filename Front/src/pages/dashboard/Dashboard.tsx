import { useNavigate } from "react-router";
import DashboardCards from "../../components/dashboardUI/DashboardCards";
import DashboardCharts from "../../components/dashboardUI/DashboardCharts";
import DashboardReviews from "../../components/dashboardUI/DashboardReviews";
import useAuth from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, salon, hasCheckedSalon } = useAuth();

  if (isLoading || !hasCheckedSalon) {
    return (
      <div className="h-screen flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-gray-700" />
          <p className="text-gray-600">Preparing your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect users without a salon
  if (isAuthenticated && hasCheckedSalon && !salon) {
    navigate("/create");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardCards />
        <DashboardCharts />
        <DashboardReviews />
      </div>
    </div>
  );
}
