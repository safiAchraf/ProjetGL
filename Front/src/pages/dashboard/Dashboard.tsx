import DashboardCards from "../../components/dashboardUI/DashboardCards";
import DashboardCharts from "../../components/dashboardUI/DashboardCharts";
import DashboardReviews from "../../components/dashboardUI/DashboardReviews";

export default function Dashboard() {
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
