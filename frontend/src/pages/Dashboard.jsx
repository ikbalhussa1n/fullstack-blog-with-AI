import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogService from "../services/blog.service";
import { BlogCard } from "../components/ui/BlogCard";
import Loader from "../components/ui/Loader";
import { toast } from "react-toastify";
import { PlusCircle, FileText, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Retrieve active user for strict filtering

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const data = await blogService.getMyBlogs();
      // FALLBACK/STRICT RULE: Filter explicitly on frontend using Auth Context
      const filteredBlogs = (data.blogs || []).filter(
        (blog) => blog.author?._id === user?._id
      );
      setBlogs(filteredBlogs);
    } catch (error) {
      toast.error("Failed to load your blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      // Optimistic UI: remove from list immediately
      const previousBlogs = [...blogs];
      setBlogs(blogs.filter((blog) => blog._id !== id));
      try {
        await blogService.delete(id);
        toast.success("Blog deleted successfully");
      } catch (error) {
        toast.error("Failed to delete blog");
        setBlogs(previousBlogs); // Rollback
      }
    }
  };

  // Compute stats
  const uniqueCategories = [...new Set(blogs.map((b) => b.category))];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage and track your published content
          </p>
        </div>
        <Link
          to="/create"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm font-medium text-sm"
        >
          <PlusCircle className="w-4 h-4" /> New Post
        </Link>
      </div>

      {/* Stats Cards */}
      {blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{blogs.length}</p>
              <p className="text-sm text-muted-foreground">Total Posts</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-chart-2/10">
              <FolderOpen className="w-6 h-6 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{uniqueCategories.length}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Blog Grid */}
      {blogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 bg-card rounded-2xl border border-dashed border-border shadow-sm"
        >
          <PlusCircle className="w-14 h-14 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Start sharing your knowledge with the community.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 text-primary border border-primary/20 hover:bg-primary/10 px-6 py-2.5 rounded-xl font-medium transition-colors text-sm"
          >
            <PlusCircle className="w-4 h-4" /> Create Your First Post
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <BlogCard blog={blog} isDashboard={true} onDelete={handleDelete} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
