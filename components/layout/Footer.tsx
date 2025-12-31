"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/betty-melese/" },
    { name: "Github", href: "https://github.com/BethelemMelese" },
    { name: "Email", href: "mailto:melesebety2673@gmail.com" },
    { name: "Blog", href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="text-text-secondary text-xs sm:text-sm text-center sm:text-left"
            >
              © 2025 Betisha. Crafted with precision.
            </motion.p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-accent flex items-center gap-2 group transition-colors duration-300 text-xs sm:text-sm font-medium"
                  >
                    <span className="whitespace-nowrap">{link.name}</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-y-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
