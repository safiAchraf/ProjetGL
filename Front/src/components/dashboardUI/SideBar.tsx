/* Hooks */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

/* Components */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NavLink } from "react-router";

/* Icons */
import {
  ChevronUp,
  Clock,
  Home,
  List,
  Settings,
  User2,
  LogOut,
  Loader2,
} from "lucide-react";

const DashboardSidebar = () => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoading, logout } = useAuth();

  const items = [
    { title: "Home", url: "/dashboard", icon: Home },
    { title: "History", url: "/dashboard/history", icon: Clock },
    { title: "Reviews Center", url: "/dashboard/reviews", icon: List },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <>
        <Loader2 className="animate-spin" size={20} />
        <span>Loading...</span>
      </>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-4xl p-4 text-center">DZ BEAUTY</h1>
      </SidebarHeader>
      <SidebarContent className="mt-36">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="p-6"
                isActive={pathname.toLowerCase() === item.url.toLowerCase()}
              >
                <NavLink to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu
              open={isDropdownMenuOpen}
              onOpenChange={setIsDropdownMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="w-5 h-5" />
                  <span>Username</span>
                  <ChevronUp className="ml-auto w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="start"
                className="w-56 bg-white rounded-lg border border-gray-200 shadow-lg py-1 animate-in fade-in-0 zoom-in-95"
              >
                <DropdownMenuItem>
                  <NavLink
                    to="/dashboard/settings"
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700"
                    onClick={() => setIsDropdownMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      setIsDropdownMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
