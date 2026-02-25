import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blog/all");
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBlogs();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
