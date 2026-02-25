import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Blogs = () => {
  const { blogs } = useContext(AuthContext);
  console.log(blogs);
  if (!blogs || blogs.length === 0) return <p>Loading blogs...</p>;

  return <div></div>;
};

export default Blogs;
