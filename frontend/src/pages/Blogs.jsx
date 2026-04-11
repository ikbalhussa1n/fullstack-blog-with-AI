import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const truncate = (text, length = 200) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + " ..." : text;
};

const Blogs = () => {
  const { blogs } = useContext(AuthContext);

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Blogs</h1>

      {blogs && blogs.length > 0 ? (
        <div className="flex flex-col gap-8">
          {blogs.slice(0, 4).map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full"
            >
              {/* Image */}
              <div className="w-full md:w-40 h-32 md:h-auto flex-shrink-0">
                <img
                  src={
                    blog.imageBlog?.url || "https://via.placeholder.com/400x300"
                  }
                  alt={blog.title.replace(/"/g, "")}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <h2 className="text-2xl font-bold mb-4">
                  {blog.title.replace(/"/g, "")}
                </h2>
                <p className="text-gray-700 mb-4">
                  {truncate(blog.content, 200)}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Category: {blog.category.replace(/"/g, "")}
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <a
                    href={`/blog/${blog._id}`}
                    className="bg-green-600 text-white px-5 py-2 rounded-2xl hover:bg-green-700"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs available.</p>
      )}
    </div>
  );
};

export default Blogs;
