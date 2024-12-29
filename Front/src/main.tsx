import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* Provider */
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

/* Components */
import NotFound from "./pages/NotFound.tsx";
import UnauthorizedAccess from "./pages/UnauthorizedAccess.tsx";

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
      /*  {
        path: "reservation",
        element: <SelectTime />,
      }, */
    ],
  },
]);

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <BookingProvider>
      <>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
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
  </StrictMode>
);
