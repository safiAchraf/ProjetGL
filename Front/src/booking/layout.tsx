import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <main className="py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
