import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Trash2, Edit3, Flag, CheckCircle, Loader2 } from "lucide-react";
import blogService from "../../services/blog.service";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export const BlogCard = ({ blog, isDashboard = false, onDelete, onResolve }) => {
  const { user, isAuthenticated } = useAuth();
  const [isReporting, setIsReporting] = useState(false);

  const authorName = blog.author?.name || "Unknown Author";
  const authorPhoto =
    blog.author?.photo?.url ||
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateContent = (text, maxLen = 120) => {
    if (!text) return "";
    const clean = text.replace(/<[^>]*>?/gm, "");
    return clean.length > maxLen ? clean.slice(0, maxLen) + "…" : clean;
  };

  const handleReport = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return toast.info("You must be logged in to report a post.");
    }
    if (window.confirm("Are you sure you want to report this post?")) {
      setIsReporting(true);
      try {
        await blogService.update(blog._id, { report: true });
        toast.success("Post has been reported.");
      } catch (error) {
        toast.error("Failed to report post. You might not have permission.");
      } finally {
        setIsReporting(false);
      }
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all group flex flex-col h-full"
    >
      <Link
        to={`/blog/${blog._id}`}
        className="block relative w-full h-52 overflow-hidden"
      >
        <img
          src={blog.imageBlog?.url}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
            {blog.category}
          </span>
          {blog.report && user?.role === "admin" && (
            <span className="bg-destructive/90 text-destructive-foreground text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm flex items-center gap-1">
              <Flag className="w-3 h-3" /> Reported
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow relative">
        <Link to={`/blog/${blog._id}`} className="flex-grow">
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {blog.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {truncateContent(blog.content)}
          </p>
        </Link>

        {/* Global Action: Report */}
        {isAuthenticated && user?.role !== "admin" && (
          <button
             onClick={handleReport}
             disabled={isReporting || blog.report}
             className="absolute right-5 bottom-20 p-2 bg-background border border-border rounded-full shadow-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all z-10 disabled:opacity-50"
             title={blog.report ? "Already Reported" : "Report Post"}
          >
            {isReporting ? <Loader2 className="w-4 h-4 animate-spin text-destructive" /> : <Flag className="w-4 h-4" />}
          </button>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2.5">
            <img
              src={authorPhoto}
              alt={authorName}
              className="w-7 h-7 rounded-full object-cover border border-border"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground leading-tight">
                {authorName}
              </span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {formatDate(blog.createdAt)}
              </span>
            </div>
          </div>

          {/* FRONTEND STRICT OWNERSHIP REQUIREMENT */}
          {isDashboard && (user?._id === blog.author?._id || user?.role === "admin") && (
            <div className="flex gap-1.5">
              {onResolve && (
                <button
                  onClick={() => onResolve(blog._id)}
                  className="p-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors"
                  title="Resolve Report"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                </button>
              )}
              {/* Edit button explicitly only allowed for actual owner based on prompt restriction */}
              {!onResolve && user?._id === blog.author?._id && (
                <Link
                  to={`/edit/${blog._id}`}
                  className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                  title="Edit"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </Link>
              )}
              <button
                onClick={() => onDelete(blog._id)}
                className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};
