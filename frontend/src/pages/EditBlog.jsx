import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import blogService from "../services/blog.service";
import { toast } from "react-toastify";
import Loader from "../components/ui/Loader";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getSingle(id);
        const blog = data.blog;
        
        if (blog) {
          // STRICT FRONTEND OWNERSHIP ENFORCEMENT
          const authorId = blog.author?._id || blog.author;
          if (user?._id !== authorId && user?.role !== "admin") {
            toast.error("Unauthorized: You do not own this blog.");
            return navigate("/dashboard");
          }

          setFormData({
            title: blog.title,
            category: blog.category,
            content: blog.content,
          });
        }
      } catch (error) {
        toast.error("Failed to load blog for editing");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchBlog();
    }
  }, [id, navigate, user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.content) {
      return toast.error("All fields are required!");
    }
    setIsSubmitting(true);
    try {
      await blogService.update(id, formData);
      toast.success("Blog updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setIsSubmitting(false);
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
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Edit Post</h1>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title + Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium text-foreground">Title</label>
              <input
                type="text"
                name="title"
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary text-lg font-semibold transition-all"
                value={formData.title}
                onChange={handleInputChange}
                required
                id="edit-blog-title"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                name="category"
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                value={formData.category}
                onChange={handleInputChange}
                required
                id="edit-blog-category"
              >
                <option value="Technology">Technology</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Web Development">Web Development</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Content</label>
            <textarea
              name="content"
              rows={14}
              className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y text-sm leading-relaxed transition-all"
              value={formData.content}
              onChange={handleInputChange}
              required
              id="edit-blog-content"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 text-sm font-medium text-muted-foreground border border-input rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-all text-sm"
              id="save-blog-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditBlog;
