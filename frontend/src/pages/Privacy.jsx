import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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

        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <div className="prose prose-sm max-w-none text-foreground [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted-foreground [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_li]:leading-relaxed">
          <h2>1. Information We Collect</h2>
          <p>When you register for an account, we collect your name, email address, and profile photo. When you create blog posts, we store the content you provide. We also collect basic usage data such as your IP address and browser type to improve our service.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6">
            <li>Provide, maintain, and improve our blogging platform</li>
            <li>Process and display your published blog content</li>
            <li>Send you important service-related notifications</li>
            <li>Protect against abuse and enforce our community guidelines</li>
            <li>Power AI-assisted content generation features when you request them</li>
          </ul>

          <h2>3. Data Storage & Security</h2>
          <p>Your data is stored securely using MongoDB Atlas with encryption at rest and in transit. Profile images are stored on Cloudinary's secure CDN. We implement industry-standard security practices including JWT-based authentication and bcrypt password hashing.</p>

          <h2>4. Third-Party Services</h2>
          <p>We use the following third-party services that may process your data:</p>
          <ul className="list-disc pl-6">
            <li><strong>MongoDB Atlas</strong> — Database hosting</li>
            <li><strong>Cloudinary</strong> — Image hosting and processing</li>
            <li><strong>AI Language Models</strong> — Content generation assistance</li>
          </ul>

          <h2>5. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time through your Profile settings. You can also request a complete data export or account deletion by contacting us.</p>

          <h2>6. Cookies</h2>
          <p>We use essential cookies for authentication (JWT tokens). We do not use advertising or third-party tracking cookies. See our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link> for more details.</p>

          <h2>7. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any significant changes by posting a notice on our platform.</p>

          <h2>8. Contact</h2>
          <p>If you have questions about this Privacy Policy, please visit our <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
