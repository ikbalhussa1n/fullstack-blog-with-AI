import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogService from "../services/blog.service";
import { BlogCard } from "../components/ui/BlogCard";
import Loader from "../components/ui/Loader";
import { toast } from "react-toastify";
import { ShieldAlert, CheckCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [reportedBlogs, setReportedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportedBlogs();
  }, []);

  const fetchReportedBlogs = async () => {
    try {
      const data = await blogService.getAll();
      const flagged = (data.blogs || []).filter(blog => blog.report === true);
      setReportedBlogs(flagged);
    } catch (error) {
      toast.error("Failed to load reported blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this reported blog?")) {
      const previous = [...reportedBlogs];
      setReportedBlogs(reportedBlogs.filter((blog) => blog._id !== id));
      try {
        await blogService.delete(id);
        toast.success("Blog deleted successfully");
      } catch (error) {
        toast.error("Failed to delete blog");
        setReportedBlogs(previous);
      }
    }
  };

  const handleResolve = async (id) => {
    if (window.confirm("Are you sure you want to resolve and clear this report?")) {
      const previous = [...reportedBlogs];
      setReportedBlogs(reportedBlogs.filter((blog) => blog._id !== id));
      try {
        await blogService.update(id, { report: false });
        toast.success("Report resolved successfully");
      } catch (error) {
        toast.error("Failed to resolve report");
        setReportedBlogs(previous);
      }
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight text-destructive flex items-center gap-2">
            <ShieldAlert className="w-8 h-8" /> 
            Admin Reports
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review and manage blogs that have been flagged by users.
          </p>
        </div>
      </div>

      {reportedBlogs.length === 0 ? (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-center py-24 bg-card rounded-2xl border border-dashed border-border shadow-sm"
        >
          <CheckCircle className="w-14 h-14 mx-auto mb-4 text-green-500/50" />
          <h3 className="text-xl font-semibold mb-2">Clean Queue</h3>
          <p className="text-muted-foreground text-sm">
            There are no active reports at this time.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {reportedBlogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="relative"
            >
              <div className="absolute -top-3 -right-3 z-10">
                <span className="flex h-6 w-6 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-destructive items-center justify-center pointer-events-none"></span>
                </span>
              </div>
              <BlogCard blog={blog} isDashboard={true} onDelete={handleDelete} onResolve={handleResolve} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
