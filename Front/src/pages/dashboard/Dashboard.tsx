/* Hooks */
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

/* Components */
import { Link as RouterLink } from "react-router";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
          <RouterLink
            to="/"
            data-aos="fade-up"
            data-aos-delay="350"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Home
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
