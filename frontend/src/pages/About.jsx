import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Sparkles, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">About AI Blog</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            We're building the future of content creation — a platform where writers, thinkers, and creators come together to share ideas, powered by cutting-edge AI.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {[
            {
              icon: <Target className="w-5 h-5 text-primary" />,
              title: "Our Mission",
              text: "To democratize content creation by giving every writer access to powerful AI tools that help them ideate, draft, and publish high-quality articles effortlessly."
            },
            {
              icon: <Sparkles className="w-5 h-5 text-chart-2" />,
              title: "AI-First Approach",
              text: "Our platform integrates advanced language models to assist with blog generation, letting you focus on the ideas while AI handles the heavy lifting of drafting."
            },
            {
              icon: <Users className="w-5 h-5 text-chart-4" />,
              title: "Community Driven",
              text: "We believe in the power of community. Every feature — from reporting tools to user dashboards — is designed to foster a healthy, collaborative environment."
            },
            {
              icon: <Heart className="w-5 h-5 text-destructive" />,
              title: "Built with Passion",
              text: "AI Blog is a full-stack MERN application crafted with care. From MongoDB to React, every layer is optimized for performance, security, and developer experience."
            }
          ].map((card, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-background p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-foreground">{card.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="rounded-2xl border border-border bg-muted/20 p-8 mb-14">
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS", "Cloudinary", "Llama AI", "Framer Motion"].map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-xs font-medium rounded-full bg-background border border-border text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-10 border-t border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-2">Ready to start writing?</h2>
          <p className="text-sm text-muted-foreground mb-6">Join our community of writers today.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm text-sm"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
