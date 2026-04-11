import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useDarkMode from "../../hooks/useDarkMode";
import { LogOut, User, PenSquare, Home, Menu, X, Sun, Moon, LayoutDashboard, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggle: toggleDarkMode } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = async () => {
    setProfileOpen(false);
    setMobileOpen(false);
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

  const closeMobile = () => setMobileOpen(false);

  const NavLink = ({ to, children, onClick, className = "" }) => (
    <Link
      to={to}
      onClick={() => { closeMobile(); onClick?.(); }}
      className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${className}`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0" onClick={closeMobile}>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-chart-1 via-primary to-chart-5 bg-clip-text text-transparent tracking-tight">
            AI Blog
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Dark mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-muted transition-colors"
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

          <NavLink to="/"><Home className="w-4 h-4" /> Home</NavLink>

          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <NavLink to="/admin" className="text-destructive font-semibold">
                  <ShieldAlert className="w-4 h-4" /> Admin
                </NavLink>
              )}
              <NavLink to="/dashboard"><LayoutDashboard className="w-4 h-4" /> Dashboard</NavLink>
              <NavLink
                to="/create"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 hover:text-primary-foreground shadow-sm"
              >
                <PenSquare className="w-4 h-4" /> Write
              </NavLink>

              {/* Profile Dropdown */}
              <div className="relative ml-2" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 cursor-pointer focus:outline-none"
                  id="profile-dropdown-trigger"
                >
                  <img
                    src={user?.photo?.url || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full border-2 border-border object-cover hover:border-primary transition-colors"
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-56 rounded-xl shadow-xl py-2 bg-popover text-popover-foreground ring-1 ring-border z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted/60 transition-colors"
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login">Sign In</NavLink>
              <NavLink
                to="/register"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 hover:text-primary-foreground shadow-sm"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="flex flex-col px-4 py-4 space-y-1">
              <NavLink to="/" className="py-3 px-3 rounded-lg hover:bg-muted">
                <Home className="w-4 h-4" /> Home
              </NavLink>

              {isAuthenticated ? (
                <>
                  {user?.role === "admin" && (
                    <NavLink to="/admin" className="py-3 px-3 rounded-lg hover:bg-muted text-destructive font-semibold">
                      <ShieldAlert className="w-4 h-4" /> Admin
                    </NavLink>
                  )}
                  <NavLink to="/dashboard" className="py-3 px-3 rounded-lg hover:bg-muted">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </NavLink>
                  <NavLink to="/create" className="py-3 px-3 rounded-lg hover:bg-muted">
                    <PenSquare className="w-4 h-4" /> Write
                  </NavLink>
                  <NavLink to="/profile" className="py-3 px-3 rounded-lg hover:bg-muted">
                    <User className="w-4 h-4" /> Profile
                  </NavLink>

                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                      <img
                        src={user?.photo?.url || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border border-border object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-3 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="py-3 px-3 rounded-lg hover:bg-muted">
                    Sign In
                  </NavLink>
                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="mt-2 text-center text-sm font-medium bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
