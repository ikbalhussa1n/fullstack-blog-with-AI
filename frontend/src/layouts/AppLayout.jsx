import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden font-sans antialiased text-foreground bg-background transition-colors duration-300">
        <AppSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden bg-background">
          <Navbar />
          
          {/* Page Content Wrapper -> Max Width ensures readability on ultrawide monitors */}
          <main className="flex-grow flex flex-col w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
