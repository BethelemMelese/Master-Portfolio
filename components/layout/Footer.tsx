"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity/client";
import { aboutQuery } from "@/lib/sanity/queries";
import { SocialLink } from "@/types";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState<Array<{ name: string; href: string }>>([]);

  // Map platform value to display name
  const getPlatformName = (platform: string): string => {
    const nameMap: Record<string, string> = {
      github: "Github",
      linkedin: "LinkedIn",
      twitter: "Twitter",
      email: "Email",
      other: "Other",
    };
    return nameMap[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const aboutData = await client.fetch(aboutQuery);
        if (aboutData?.socialLinks && Array.isArray(aboutData.socialLinks)) {
          const links = aboutData.socialLinks
            .filter((link: SocialLink) => link.url && link.platform)
            .map((link: SocialLink) => ({
              name: getPlatformName(link.platform),
              href: link.url,
            }));
          setSocialLinks(links);
        } else {
          // Fallback to default links if no data from CMS
          setSocialLinks([
            { name: "LinkedIn", href: "https://www.linkedin.com/in/betty-melese/" },
            { name: "Github", href: "https://github.com/BethelemMelese" },
            { name: "Email", href: "mailto:melesebety2673@gmail.com" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
        // Fallback to default links on error
        setSocialLinks([
          { name: "LinkedIn", href: "https://www.linkedin.com/in/betty-melese/" },
          { name: "Github", href: "https://github.com/BethelemMelese" },
          { name: "Email", href: "mailto:melesebety2673@gmail.com" },
        ]);
      }
    };

    fetchSocialLinks();
  }, []);

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
              © {currentYear} Betisha. Crafted with precision.
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
