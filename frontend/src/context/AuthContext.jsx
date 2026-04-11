import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated by fetching profile
    // This relies on the HTTP-only cookie which is automatically sent
    const checkAuthStatus = async () => {
      try {
        const profileData = await authService.getMyProfile();
        if (profileData && profileData._id) {
          setUser(profileData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    // Assuming backend returns { message, name, email, token }
    // Fetch full profile info right after to get roles/photo
    const profileData = await authService.getMyProfile();
    setUser(profileData);
    setIsAuthenticated(true);
    return data;
  };

  const register = async (formData) => {
    const data = await authService.register(formData);
    // Backend creates token and sets cookie
    const profileData = await authService.getMyProfile();
    setUser(profileData);
    setIsAuthenticated(true);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const val = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={val}>
      {children}
    </AuthContext.Provider>
  );
};
