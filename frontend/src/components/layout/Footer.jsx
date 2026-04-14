import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Heart, PenSquare, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Home", to: "/" },
        { label: "Dashboard", to: "/dashboard" },
        { label: "Write a Post", to: "/create" },
        { label: "Profile", to: "/profile" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms of Service", to: "/terms" },
        { label: "Cookie Policy", to: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Github className="w-4 h-4" />, href: "https://github.com", label: "GitHub" },
    { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-border/50 bg-muted/20 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand Column — spans 2 on md+ */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <PenSquare className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-extrabold bg-gradient-to-r from-chart-1 via-primary to-chart-5 bg-clip-text text-transparent tracking-tight">
                AI Blog
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
              A modern full-stack blogging platform with AI-powered content generation. Write smarter, share faster, inspire further.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-muted/60 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-foreground mb-4 tracking-widest uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-5 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} AI Blog. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-destructive fill-destructive" /> using MERN + AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
