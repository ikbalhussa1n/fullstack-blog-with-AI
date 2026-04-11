import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

import { useLocation, useNavigate } from "react-router-dom";
import { Home, Folder, Plus, Settings, Mail } from "lucide-react";
import Footer from "./Footer";

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();
  const navigate = useNavigate();

  const handleNavAndSidebar = (path) => {
    navigate(path);

    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const location = useLocation();
  const hideSidebar = [
    "/dashboard",
    "/contact-us",
    "/login",
    "/Register",
  ].includes(location.pathname);

  return (
    <>
      {/* {!hideSidebar && ( */}
      <Sidebar variant="floating" className="pt-16">
        <SidebarHeader className="gap-3 pt-5">
          <button
            className="w-full bg-green-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-2xl shadow-md
                     hover:bg-green-700 focus:outline-none focus:ring-2  transition-colors"
          >
            Write Blog
          </button>

          <button
            className="w-full bg-gray-100 text-gray-800  cursor-pointer font-semibold py-2 px-4 rounded-2xl shadow-sm
                     hover:bg-gray-200 focus:outline-none   transition-colors"
          >
            My Blogs
          </button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="pt-2">
              <h4>Categories</h4>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavAndSidebar("/blogs")}
                >
                  <Home size={16} />
                  Overview
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Folder size={16} />
                  Technology
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Folder size={16} />
                  AI & Machine Learning
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Folder size={16} />
                  Web Development
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Folder size={16} />
                  Productivity
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Folder size={16} />
                  Tutorials
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Folder size={16} />
                  Reviews
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Folder size={16} />
                  Lifestyle
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* <SidebarFooter /> */}
        <SidebarFooter className="">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Mail />
                <h6
                  className="cursor-pointer font-medium"
                  onClick={() => handleNavAndSidebar("/contact-us")}
                >
                  Contact Us
                </h6>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
