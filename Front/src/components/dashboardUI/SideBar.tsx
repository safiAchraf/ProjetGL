/* Hooks */
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
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { NavLink } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

/* Icons */
import {
  Clock,
  Home,
  List,
  LogOut,
  ChevronsUpDown,
  Settings,
} from "lucide-react";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

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

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {/* LOGO */}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">DZ BEAUTY</span>
            <span className="truncate text-xs">Beauty, Redefined</span>
          </div>
        </div>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.avatar || ""}
                      alt={user?.name || ""}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.slice(0, 2)?.toUpperCase() || "CN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name || ""}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email || ""}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.avatar || ""}
                        alt={user?.name || ""}
                      />
                      <AvatarFallback className="rounded-lg">
                        {user?.name?.slice(0, 2)?.toUpperCase() || "CN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name || ""}
                      </span>
                      <span className="truncate text-xs">
                        {" "}
                        {user?.email || ""}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  style={{
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  <LogOut />
                  Log out
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
