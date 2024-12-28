/* Hooks */
import { useNavigate } from "react-router";

/* Icons */
import { Frown } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-red-100 rounded-full">
            <Frown className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          It seems you&apos;ve wandered off the beaten path. The page
          you&apos;re looking for doesn&apos;t exist, or it might have been
          moved.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>

        <p className="mt-8 text-gray-500 italic">
          Let’s find your perfect style together! 💄
        </p>
      </div>
    </div>
  );
};

export default NotFound;
