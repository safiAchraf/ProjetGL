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
import Confirmation from "./pages/booking/Confirmation.tsx";
import Success from "./pages/booking/Success.tsx";

/* Dashboard Page */
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Reservations from "./pages/dashboard/Reservations.tsx";
import Review from "./pages/dashboard/Review.tsx";
import Settings from "./pages/dashboard/Settings.tsx";
import Coupons from "./pages/dashboard/Coupons.tsx";
import Salon from "./pages/dashboard/Salon.tsx";

/* User Page */
import Orders from "./pages/dashboard/Orders.tsx";
import Services from "./pages/dashboard/Services.tsx";

/* Create Salon */
import CreateSalon from "./pages/CreateSalon.tsx";

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
  { path: "/create", element: <CreateSalon /> },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "salon",
        element: <Salon />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "reviews",
        element: <Review />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "coupons",
        element: <Coupons />,
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
      {
        path: "confirmation",
        element: <Confirmation />,
      },
      {
        path: "success",
        element: <Success />,
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
            autoClose={1000}
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
