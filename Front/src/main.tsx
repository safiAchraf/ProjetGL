import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* Context Providers */
import { AuthProvider } from "./context/AuthContext.tsx";
import { BookingProvider } from "./context/BookingContext.tsx";

/* Router */
import { createBrowserRouter, RouterProvider } from "react-router";

/* Notification */
import { ToastContainer } from "react-toastify";

/* Main App */
import App from "./App.tsx";

/* Booking Page */
import Layout from "./pages/booking/Layout.tsx";
import SelectSalon from "./pages/booking/SelectSalon.tsx";
import SelectServices from "./pages/booking/SelectServices.tsx";
import SelectTime from "./pages/booking/SelectTime.tsx";

/* Dashboard Page */
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import History from "./pages/dashboard/History.tsx";
import Review from "./pages/dashboard/Review.tsx";
import Settings from "./pages/dashboard/Settings.tsx";

/* Components */
import NotFound from "./pages/NotFound.tsx";
import UnauthorizedAccess from "./pages/UnauthorizedAccess.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

/* Styles */
import "./index.css";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedAccess />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "reviews",
        element: <Review />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/booking",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SelectSalon />,
      },
      {
        path: "services",
        element: <SelectServices />,
      },
      {
        path: "reservation",
        element: <SelectTime />,
      },
    ],
  },
]);

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <BookingProvider>
        <>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            limit={3}
          />
        </>
      </BookingProvider>
    </AuthProvider>
  </StrictMode>
);
