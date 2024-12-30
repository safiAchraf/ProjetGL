/* Hooks */
import { useNavigate } from "react-router";

/* Assets */
import { ArrowLeft, Home, Lock } from "lucide-react";

const UnauthorizedAccess = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="text-center p-8 max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-red-100 rounded-full">
            <Lock className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>

        <p className="text-gray-600 mb-8">
          Sorry, you don't have permission to access this page. Please log in
          with appropriate credentials.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9/12 mx-auto bg-gray-100 text-gray-700 py-2 px-8 pr-12 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-9/12 mx-auto bg-gray-100 text-gray-700 py-2 px-8 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Home />
            Back to Home
          </button>
        </div>
      </section>
    </main>
  );
};

export default UnauthorizedAccess;
