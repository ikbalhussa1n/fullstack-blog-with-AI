import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <div className="prose prose-sm max-w-none text-foreground [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted-foreground [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_li]:leading-relaxed">
          <h2>1. What Are Cookies</h2>
          <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>

          <h2>2. How We Use Cookies</h2>
          <p>AI Blog uses a minimal set of cookies, strictly for functional purposes:</p>
          <ul className="list-disc pl-6">
            <li><strong>Authentication Token (JWT)</strong> — Stored as an HTTP-only cookie to keep you logged in securely across sessions</li>
            <li><strong>Sidebar State</strong> — Remembers whether you collapsed or expanded the sidebar navigation</li>
            <li><strong>Dark Mode Preference</strong> — Stored in localStorage (not a cookie) to remember your theme choice</li>
          </ul>

          <h2>3. What We Don't Use</h2>
          <p>We do <strong>not</strong> use:</p>
          <ul className="list-disc pl-6">
            <li>Advertising cookies</li>
            <li>Third-party tracking pixels</li>
            <li>Analytics cookies (e.g., Google Analytics)</li>
            <li>Social media tracking cookies</li>
          </ul>

          <h2>4. Managing Cookies</h2>
          <p>You can manage or delete cookies through your browser settings. Please note that disabling the authentication cookie will require you to log in again each time you visit the platform.</p>

          <h2>5. Changes to This Policy</h2>
          <p>We may update this Cookie Policy as we add new features. We will post the revised policy on this page with an updated date.</p>

          <h2>6. Contact</h2>
          <p>If you have questions about our use of cookies, please visit our <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default CookiePolicy;
