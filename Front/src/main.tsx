/* Hooks */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

/* Custom Hooks & Providers */
import { BookingProvider } from "./hooks/BookingProvider.tsx";

/* Custom Components */
import App from "./App.tsx";
import Unauthorized from "./dashboard/unauthorized.tsx";
import Layout from "./booking/layout.tsx";

/* Styles */
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/booking",
    element: <Layout />,
    children: [
      /* {
        index: true,
        element: <SelectService />,
      }, */
      /* {
        path: "professionals",
        element: <Professionals />,
      }, */
      /*  {
        path: "selecttime",
        element: <SelectTime />,
      }, */
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

const root: HTMLElement = document.getElementById("root")!;

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
