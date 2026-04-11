import React, { useEffect, useState, useMemo } from "react";
import blogService from "../services/blog.service";
import { BlogCard } from "../components/ui/BlogCard";
import Loader from "../components/ui/Loader";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Sparkles, PenSquare, LayoutDashboard, Flag, Zap, Feather } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = ["All", "Technology", "AI & ML", "Web Development", "Lifestyle", "Other"];

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "AI Blog Generation",
    description: "Instantly draft high-quality content out of simple prompts powered by our Llama integrations."
  },
  {
    icon: <Feather className="w-6 h-6 text-chart-2" />,
    title: "Write & Publish",
    description: "Use our clean rich interface to craft your ideas into beautiful published articles."
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-chart-4" />,
    title: "User Dashboard",
    description: "Manage your published works and track your content effortlessly in one space."
  },
  {
    icon: <Flag className="w-6 h-6 text-destructive" />,
    title: "Reporting System",
    description: "Help maintain a clean community block by flagging inappropriate content seamlessly."
  }
];

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAll();
        setBlogs(data.blogs || []);
      } catch (error) {
        // If 401, user is not logged in — don't show error toast for that
        if (error.response?.status !== 401) {
          toast.error("Failed to load blogs");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    let result = blogs;
    if (activeCategory !== "All") {
      result = result.filter((b) => b.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.content.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [blogs, activeCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 border-b">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-chart-1/10 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-chart-1/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-chart-5/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-chart-1 bg-chart-1/10 px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4" /> AI-Powered Blogging Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight max-w-4xl mx-auto leading-[1.1]"
          >
            Write Smarter with{" "}
            <span className="bg-gradient-to-r from-chart-1 via-chart-5 to-chart-4 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Discover, create, and share insightful articles. Leverage AI to generate
            drafts, refine ideas, and publish faster than ever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {isAuthenticated ? (
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm text-sm"
              >
                <PenSquare className="w-4 h-4" /> Start Writing
              </Link>
            ) : (
              <>
                <a
                  href="#latest-posts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all shadow-sm text-sm"
                >
                  Read Blogs
                </a>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm text-sm"
                >
                  Login to create your own blog <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Everything you need to succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our platform equips you with state-of-the-art tools to write, monitor, and scale your personal blogs professionally.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-muted w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Feed Section */}
      <section id="latest-posts" className="container mx-auto px-4 py-14">
        {/* Search + Filters */}
        <div className="mb-10 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
            {/* Search */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-input rounded-xl bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                id="search-blogs"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border"
          >
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">No blogs found</p>
            <p className="text-sm mb-6">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search.`
                : "Be the first to create one!"}
            </p>
            {!searchQuery && (
              isAuthenticated ? (
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
                >
                  <PenSquare className="w-4 h-4" /> Start Writing
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
                >
                  Login to create your own blog <ArrowRight className="w-4 h-4" />
                </Link>
              )
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
