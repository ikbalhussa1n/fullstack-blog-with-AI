import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogs } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sort blogs by createdAt descending and take latest 5
  const latestBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  // Extract unique authors from all blogs
  const uniqueAuthors = [];
  const seen = new Set();
  blogs.forEach((blog) => {
    if (blog.author && !seen.has(blog.author._id)) {
      seen.add(blog.author._id);
      uniqueAuthors.push(blog.author);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HERO */}
      <div className="bg-gray-100 rounded-xl p-12 text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover Stories & Ideas</h1>
        <p className="text-gray-600 text-lg">
          Explore amazing blogs and follow top writers.
        </p>
      </div>

      {/* LATEST BLOGS */}
      <div className="mb-12 p-5">
        <h3 className="text-2xl font-semibold mb-6">Latest Blogs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <img
                src={blog.imageBlog?.url}
                alt="blog"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">{blog.title}</h4>
                <p className="text-gray-600 mb-4">
                  {blog.content.slice(0, 100)}...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={blog.author?.photo?.url}
                      alt={blog.author?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-800">{blog.author?.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP WRITERS */}
      <div className="p-5">
        <h3 className="text-2xl font-semibold mb-4">Top Writers</h3>

        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 py-2">
          {uniqueAuthors.map((author) => (
            <div
              key={author._id}
              className="flex flex-col items-center cursor-pointer min-w-[80px]"
              onClick={() => navigate(`/writer/${author._id}`)}
            >
              <img
                src={author.photo?.url}
                alt={author.name}
                className="w-14 h-14 rounded-full mb-2"
              />
              <p className="text-center text-sm">{author.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
