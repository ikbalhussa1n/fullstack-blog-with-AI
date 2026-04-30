import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useDarkMode from "../../hooks/useDarkMode";
import { LogOut, User, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggle: toggleDarkMode } = useDarkMode();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/");
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simple Breadcrumb logic based on pathname
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path.startsWith("/dashboard")) return "Dashboard";
    if (path.startsWith("/create")) return "Write Blog";
    if (path.startsWith("/profile")) return "Your Profile";
    if (path.startsWith("/admin")) return "Administration";
    if (path.startsWith("/blog/")) return "Reading";
    return "";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm flex-none transition-all duration-300">
      <div className="flex h-16 items-center px-4 md:px-6 w-full">
        <div className="flex items-center gap-4">
          {/* Sidebar Trigger (Left) */}
          <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />

          {/* Dynamic Page Title / Breadcrumb */}
          <div className="hidden sm:flex items-center">
            <span className="text-sm font-semibold text-muted-foreground select-none">
              {getPageTitle()}
            </span>
          </div>
        </div>
        
        <div className="flex-1" />

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Dark mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
            title="Toggle Dark Mode"
            id="dark-mode-toggle"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>

          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 cursor-pointer focus:outline-none rounded-full ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="profile-dropdown-trigger"
              >
                <img
                  src={user?.photo?.url || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full border-2 border-border object-cover hover:border-primary transition-colors shadow-sm"
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 rounded-xl shadow-xl py-2 bg-popover text-popover-foreground ring-1 ring-border/50 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border/50 bg-muted/20">
                      <p className="text-sm font-semibold truncate leading-none mb-1.5">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate leading-none">{user?.email}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted/80 transition-colors"
                      >
                        <User className="w-4 h-4 opacity-70" /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-md text-destructive hover:bg-destructive/10 transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4 opacity-70" /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
