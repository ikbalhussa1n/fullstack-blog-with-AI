import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Home, 
  LayoutDashboard, 
  PenSquare, 
  User as UserIcon, 
  ShieldAlert,
  LogOut,
  Info,
  Mail
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "./ui/sidebar";

export function AppSidebar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border">
      <SidebarHeader className="pt-6 pb-2 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:pt-6 transition-all">
         <div className="flex items-center gap-2 px-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <PenSquare className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
              <span className="font-bold text-sm tracking-tight text-foreground">AI Blog Platform</span>
              <span className="text-xs text-muted-foreground font-medium">Workspace</span>
            </div>
         </div>
      </SidebarHeader>

      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive("/")} 
                tooltip="Home"
                className="transition-all duration-200 ease-in-out font-medium"
              >
                <Link to="/" onClick={handleLinkClick}>
                  <Home className="w-5 h-5 opacity-80" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {isAuthenticated && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive("/dashboard")} 
                    tooltip="Dashboard"
                    className="transition-all duration-200 ease-in-out font-medium"
                  >
                    <Link to="/dashboard" onClick={handleLinkClick}>
                      <LayoutDashboard className="w-5 h-5 opacity-80" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive("/create")} 
                    tooltip="Write Blog"
                    className="transition-all duration-200 ease-in-out font-medium text-primary hover:text-primary hover:bg-primary/5"
                  >
                    <Link to="/create" onClick={handleLinkClick}>
                      <PenSquare className="w-5 h-5 opacity-80" />
                      <span>Write Blog</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive("/profile")} 
                    tooltip="Profile"
                    className="transition-all duration-200 ease-in-out font-medium"
                  >
                    <Link to="/profile" onClick={handleLinkClick}>
                      <UserIcon className="w-5 h-5 opacity-80" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {user?.role === "admin" && (
                  <SidebarMenuItem className="mt-6 border-t border-border/50 pt-6 group-data-[collapsible=icon]:pt-2 group-data-[collapsible=icon]:mt-2 group-data-[collapsible=icon]:border-t-0">
                    <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 -ml-2">
                      Administration
                    </SidebarGroupLabel>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive("/admin")} 
                      tooltip="Admin Dashboard"
                      className="transition-all duration-200 ease-in-out font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Link to="/admin" onClick={handleLinkClick}>
                        <ShieldAlert className="w-5 h-5 opacity-80" />
                        <span>Admin Panel</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>

        {/* Info Links */}
        <SidebarGroup className="mt-auto border-t border-border/40 pt-2">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Info
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive("/about")} 
                tooltip="About"
                className="transition-all duration-200 ease-in-out font-medium"
              >
                <Link to="/about" onClick={handleLinkClick}>
                  <Info className="w-5 h-5 opacity-80" />
                  <span>About</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive("/contact")} 
                tooltip="Contact"
                className="transition-all duration-200 ease-in-out font-medium"
              >
                <Link to="/contact" onClick={handleLinkClick}>
                  <Mail className="w-5 h-5 opacity-80" />
                  <span>Contact Us</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border group-data-[collapsible=icon]:p-2">
        {isAuthenticated ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={() => { handleLinkClick(); logout(); }} 
                tooltip="Sign Out"
                className="transition-all duration-200 ease-in-out font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-5 h-5 opacity-80" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild
                tooltip="Sign In"
                className="transition-all duration-200 ease-in-out font-medium text-primary hover:bg-primary/5"
              >
                <Link to="/login" onClick={handleLinkClick}>
                  <UserIcon className="w-5 h-5 opacity-80" />
                  <span>Sign In</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
