import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import blogService from "../services/blog.service";
import authService from "../services/auth.service";
import Loader from "../components/ui/Loader";
import { ArrowLeft, Calendar, User, Share2, Link2, Check, Flag, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [isReporting, setIsReporting] = useState(false);

  const handleReport = async () => {
    if (!isAuthenticated) return toast.info("You must be logged in to report.");
    if (window.confirm("Are you sure you want to report this post?")) {
      setIsReporting(true);
      try {
        await blogService.update(blog._id, { report: true });
        setBlog({ ...blog, report: true });
        toast.success("Post has been reported successfully.");
      } catch (error) {
        toast.error("Failed to report post. You might not have permission.");
      } finally {
        setIsReporting(false);
      }
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getSingle(id);
        setBlog(data.blog);

        // Fetch author info
        if (data.blog?.author) {
          const authorId = typeof data.blog.author === "object" ? data.blog.author._id : data.blog.author;
          if (authorId) {
            try {
              const authorData = await authService.getUser(authorId);
              setAuthor(authorData);
            } catch {
              // Author fetch is non-critical
            }
          }
        }
      } catch (error) {
        console.error("Failed to load blog details");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog?.title || "");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">Blog not found</h2>
        <Link to="/" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const authorName = author?.name || blog.author?.name || "Unknown Author";
  const authorPhoto =
    author?.photo?.url ||
    blog.author?.photo?.url ||
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  return (
    <article className="min-h-screen pb-16">
      {/* Hero Image */}
      <div className="relative w-full h-[40vh] md:h-[50vh] xl:h-[55vh] bg-muted overflow-hidden">
        <img
          src={blog?.imageBlog?.url}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 container mx-auto px-4 pb-8 md:pb-12 z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors bg-background/60 px-3.5 py-1.5 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <div className="flex items-center text-sm text-muted-foreground bg-background/60 px-3 py-1 rounded-full backdrop-blur-sm">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {formatDate(blog.createdAt)}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight drop-shadow-sm max-w-4xl leading-[1.15]">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 md:mt-12 flex flex-col lg:flex-row gap-10">
        {/* Content */}
        <div className="w-full lg:w-[70%] max-w-3xl order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-none"
          >
            {blog.content.split("\n").map((paragraph, idx) => {
              if (!paragraph.trim()) return <div key={idx} className="h-4" />;
              return (
                <p
                  key={idx}
                  className="mb-5 leading-[1.85] text-foreground/90 text-[1.05rem]"
                >
                  {paragraph}
                </p>
              );
            })}
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[30%] order-1 lg:order-2">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Author Card */}
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">
                Written by
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={authorPhoto}
                  alt={authorName}
                  className="w-12 h-12 rounded-full object-cover border border-border"
                />
                <div>
                  <p className="font-semibold text-foreground">{authorName}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <User className="w-3 h-3" /> Author
                  </p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">
                Share this article
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors flex-1 justify-center"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" /> Copied!
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" /> Copy Link
                    </>
                  )}
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors flex-1 justify-center"
                >
                  <Share2 className="w-4 h-4" /> Twitter
                </button>
              </div>
            </div>

            {/* Report Content */}
            {isAuthenticated && user?.role !== "admin" && (
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold text-destructive">
                  Report Content
                </p>
                <button
                  onClick={handleReport}
                  disabled={isReporting || blog.report}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors disabled:opacity-50"
                  id="report-single-blog-btn"
                >
                  {isReporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flag className="w-4 h-4" />}
                  {blog.report ? "Already Reported" : isReporting ? "Reporting..." : "Report this post"}
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
};

export default BlogDetail;
