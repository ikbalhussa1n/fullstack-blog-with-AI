import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, User, Image as ImageIcon, Sparkles } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !photo) {
      return toast.error("All fields including a profile photo are required!");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("photo", photo);

      await register(data);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.24))] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-muted/20" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-chart-1/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-chart-5/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-card p-8 rounded-2xl shadow-sm border border-border relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">Create an account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join the community today
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative h-20 w-20">
              <label
                htmlFor="photo-upload"
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/40 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-7 w-7 text-muted-foreground/60" />
                )}
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <span className="text-xs text-muted-foreground">Upload Profile Photo *</span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="name"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-input rounded-lg bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                id="register-name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                name="email"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-input rounded-lg bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                id="register-email"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                className="block w-full pl-10 pr-3 py-2.5 border border-input rounded-lg bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                id="register-password"
              />
            </div>
            <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg shadow-sm text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60 transition-all"
            id="register-submit"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Creating account...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4" /> Sign Up
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
