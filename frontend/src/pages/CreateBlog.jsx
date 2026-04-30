import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blog.service";
import aiService from "../services/ai.service";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Loader2, Send, Sparkles, X, Wand2 } from "lucide-react";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // AI Writer state
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.content) {
      return toast.error("All text fields are required!");
    }
    if (!image) {
      return toast.error("An image for the blog is required.");
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content);
      data.append("imageBlog", image);

      await blogService.create(data);
      toast.success("Blog post created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  // AI generation
  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) {
      return toast.error("Please enter a topic for AI generation.");
    }
    if (!aiService.isAvailable()) {
      return toast.error("AI is not configured. Add VITE_GROQ_API_KEY to your .env file.");
    }

    setAiGenerating(true);
    setAiResult("");
    try {
      const content = await aiService.generateBlogContent(aiTopic);
      setAiResult(content);
      toast.success("AI content generated!");
    } catch (error) {
      toast.error(error.message || "AI generation failed");
    } finally {
      setAiGenerating(false);
    }
  };

  const insertAiContent = () => {
    if (aiResult) {
      setFormData((prev) => ({
        ...prev,
        content: prev.content ? prev.content + "\n\n" + aiResult : aiResult,
      }));
      toast.success("AI content inserted into editor!");
      setAiPanelOpen(false);
      setAiResult("");
      setAiTopic("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Create New Post</h1>
          <button
            type="button"
            onClick={() => setAiPanelOpen(!aiPanelOpen)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-chart-1/10 to-chart-5/10 text-chart-1 border border-chart-1/20 rounded-xl hover:from-chart-1/20 hover:to-chart-5/20 transition-all"
            id="ai-writer-toggle"
          >
            <Sparkles className="w-4 h-4" />
            AI Writer
          </button>
        </div>

        {/* AI Writer Panel */}
        <AnimatePresence>
          {aiPanelOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-gradient-to-br from-chart-1/5 via-background to-chart-5/5 border border-chart-1/20 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-chart-1">
                    <Wand2 className="w-4 h-4" />
                    AI Content Generator
                  </div>
                  <button
                    onClick={() => setAiPanelOpen(false)}
                    className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Enter a topic and let AI generate blog content for you. You can then insert it into the editor.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. The future of AI in web development..."
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:ring-2 focus:ring-chart-1/50 focus:border-chart-1 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleAiGenerate()}
                    id="ai-topic-input"
                  />
                  <button
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={aiGenerating}
                    className="px-4 py-2.5 bg-chart-1 text-white font-medium rounded-lg hover:bg-chart-1/90 disabled:opacity-60 transition-all text-sm flex items-center gap-2 shrink-0"
                    id="ai-generate-btn"
                  >
                    {aiGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Generate
                      </>
                    )}
                  </button>
                </div>

                {/* AI Result */}
                {aiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="max-h-64 overflow-y-auto bg-background/80 border border-border rounded-lg p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {aiResult}
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setAiResult("")}
                        className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-input rounded-lg transition-colors"
                      >
                        Discard
                      </button>
                      <button
                        type="button"
                        onClick={insertAiContent}
                        className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                        id="ai-insert-btn"
                      >
                        Insert into Editor
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-muted-foreground/30 rounded-xl cursor-pointer bg-muted/10 hover:bg-muted/30 transition-colors overflow-hidden relative group"
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium flex items-center gap-2 drop-shadow-md text-sm">
                      <ImagePlus className="w-5 h-5" /> Change Cover Image
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
                  <ImagePlus className="w-10 h-10 mb-3 opacity-40" />
                  <p className="mb-1 text-sm font-semibold">Click to upload cover image</p>
                  <p className="text-xs opacity-70">PNG, JPG or GIF (MAX. 5MB)</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Title + Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium text-foreground">Title</label>
              <input
                type="text"
                name="title"
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary text-lg font-semibold transition-all"
                placeholder="Enter a captivating title..."
                value={formData.title}
                onChange={handleInputChange}
                required
                id="blog-title"
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
                id="blog-category"
              >
                <option value="" disabled>Select category</option>
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
              placeholder="Write your content here... Use the AI Writer button above to generate content!"
              value={formData.content}
              onChange={handleInputChange}
              required
              id="blog-content"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4 border-t border-border">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-all shadow-sm"
              id="publish-blog-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBlog;
