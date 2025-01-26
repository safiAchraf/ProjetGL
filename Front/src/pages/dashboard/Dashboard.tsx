import DashboardCards from "../../components/dashboardUI/DashboardCards";
import DashboardCharts from "../../components/dashboardUI/DashboardCharts";
import DashboardReviews from "../../components/dashboardUI/DashboardReviews";
import useAuth from "../../hooks/useAuth";
import { useEffect , useState  } from "react";
import { useNavigate } from "react-router";

import { api } from "../../api/axios";

export default function Dashboard() {
	const navigate = useNavigate();
	const { salon, isLoading, isAuthenticated, setSalon } = useAuth();
	const [showDialog, setShowDialog] = useState(false);

	useEffect(() => {
		if (!isLoading) {
			if (!isAuthenticated) {
				navigate("/login");
			} else if (!salon) {
				const fetchSalon = async () => {
					try {
						const response = await api.get("/api/salons/userHaveSalon");
						setSalon(response.data);
					} catch (error) {
						console.error("Failed to fetch salon: ", error);
						setShowDialog(true);
					}
				};
				fetchSalon();
				if (!salon) setShowDialog(true);
			}
		}
	}, [isLoading, isAuthenticated, salon, navigate]);

	const handleCreateSalon = () => {
		navigate("/create");
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
				<div className="animate-pulse text-gray-500">Loading dashboard...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Creation Dialog */}
				{showDialog && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-xl p-8 max-w-md w-full space-y-6">
							<h2 className="text-2xl font-bold text-gray-900">
								Setup Your Salon
							</h2>
							<p className="text-gray-600">
								You need to create a salon profile to access the full dashboard
								features.
							</p>
							<div className="flex gap-4 justify-end">
								<button
									onClick={handleCreateSalon}
									className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
								>
									Create Salon
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Dashboard Content */}
				{salon ? (
					<>
						<DashboardCards />
						<DashboardCharts />
						<DashboardReviews />
					</>
				) : (
					!showDialog && (
						<div className="text-center py-12 text-gray-500">
							You don't have permission to view this dashboard
						</div>
					)
				)}
			</div>
		</div>
	);
}
