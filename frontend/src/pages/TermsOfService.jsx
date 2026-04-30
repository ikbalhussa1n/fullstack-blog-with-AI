import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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

        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <div className="prose prose-sm max-w-none text-foreground [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted-foreground [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_li]:leading-relaxed">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using AI Blog, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.</p>

          <h2>2. Account Registration</h2>
          <p>To use certain features, you must create an account. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account. You must provide accurate and complete information during registration.</p>

          <h2>3. User Content</h2>
          <p>You retain ownership of all content you publish on AI Blog. However, by posting content, you grant us a non-exclusive, worldwide license to display, distribute, and promote your content on our platform. You are solely responsible for the content you publish and must ensure it does not:</p>
          <ul className="list-disc pl-6">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on any third-party intellectual property rights</li>
            <li>Contain harmful, abusive, or misleading content</li>
            <li>Include spam, malware, or unauthorized advertising</li>
          </ul>

          <h2>4. AI-Generated Content</h2>
          <p>Our platform provides AI-assisted content generation tools. Content generated using these tools is provided "as-is" and you are responsible for reviewing, editing, and verifying all AI-generated content before publishing. We do not guarantee the accuracy, originality, or quality of AI-generated content.</p>

          <h2>5. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6">
            <li>Use the platform for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to other accounts</li>
            <li>Interfere with or disrupt the platform's infrastructure</li>
            <li>Scrape, crawl, or use automated tools to extract data</li>
            <li>Impersonate other users or entities</li>
          </ul>

          <h2>6. Content Moderation & Reporting</h2>
          <p>We reserve the right to remove any content that violates these terms. Users can report inappropriate content using the built-in reporting feature. Repeated violations may result in account suspension or termination.</p>

          <h2>7. Termination</h2>
          <p>We may suspend or terminate your account at our discretion if you violate these terms. You may also delete your account at any time through your Profile settings.</p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>AI Blog is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>

          <h2>9. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, AI Blog shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.</p>

          <h2>10. Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>

          <h2>11. Contact</h2>
          <p>If you have questions about these Terms, please visit our <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
