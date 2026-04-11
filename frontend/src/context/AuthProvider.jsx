import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blog/all", {
          withCredentials: true,
        });
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getBlogs();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
