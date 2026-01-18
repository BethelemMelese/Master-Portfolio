"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Shield,
  TrendingUp,
  Users,
  Target,
  Zap,
  Globe,
  Check,
  Fingerprint,
  PieChart,
  ArrowLeftRight,
  Moon,
  Apple,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectDetailContentProps {
  project: Project | null;
  thumbnailUrl?: string;
  imageUrls?: string[];
  nextProject?: {
    slug: string;
    title: string;
    thumbnailUrl?: string;
  } | null;
}

// Icon mapping helper
const getIconComponent = (iconName?: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Fingerprint: <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
    PieChart: <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
    ArrowLeftRight: <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
    Moon: <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
    Shield: <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
    Zap: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
    Users: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
    Target: <Target className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
    Globe: <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
    Check: <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />,
  }
  return iconMap[iconName || ''] || <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
}

const ProjectDetailContent = ({
  project,
  thumbnailUrl,
  imageUrls = [],
  nextProject,
}: ProjectDetailContentProps) => {
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">Project not found</p>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              {project.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.1 + index * 0.1,
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                  className={`px-3 sm:px-4 py-2 text-xs md:text-sm font-medium uppercase tracking-wider rounded-full border ${
                    index === 0
                      ? "text-accent bg-accent/10 border-accent/30"
                      : "text-white bg-white/10 border-white/20"
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-5 sm:mb-6 md:mb-8 leading-relaxed max-w-4xl"
          >
            {project.shortDescription}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors duration-300 text-sm sm:text-base"
              >
                <span>View Prototype</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-card text-white rounded-lg border border-white/20 font-medium hover:bg-white/5 transition-colors duration-300 text-sm sm:text-base"
              >
                <span>Case Study Slide Deck</span>
                <Download className="w-4 h-4" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Hero Image/Mockup Section - Single Image */}
        {thumbnailUrl && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={scaleIn}
            className="mb-12 sm:mb-16 md:mb-24"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden bg-gray-800"
            >
              <Image
                src={thumbnailUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        )}

        {/* Problem, Target Audience, Goal Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-16 md:mb-24"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-lg border border-white/10 p-4 sm:p-5 md:p-6 lg:p-8 hover:border-accent/50 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <h3 className="text-accent text-base sm:text-lg font-semibold mb-2 sm:mb-3 uppercase tracking-wide">
              The Problem
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {project.problem || 'High user abandonment during onboarding and a cluttered interface that alienated target demographics.'}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-card rounded-lg border border-white/10 p-4 sm:p-5 md:p-6 lg:p-8 hover:border-accent/50 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <h3 className="text-accent text-base sm:text-lg font-semibold mb-2 sm:mb-3 uppercase tracking-wide">
              Target Audience
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {project.targetAudience || 'Gen Z and young millennials who expect speed, transparency, and modern aesthetic.'}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-card rounded-lg border border-white/10 p-4 sm:p-5 md:p-6 lg:p-8 hover:border-accent/50 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <h3 className="text-accent text-base sm:text-lg font-semibold mb-2 sm:mb-3 uppercase tracking-wide">
              The Goal
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {project.goal || 'Create a frictionless onboarding experience and a trustworthy, scalable design system.'}
            </p>
          </motion.div>
        </motion.div>

        {/* Role & Ownership and Process Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: Role & Ownership */}
            <div>
              <h3 className="text-white text-2xl font-bold mb-2">
                Role & Ownership
              </h3>
              <div className="h-0.5 w-16 bg-accent mb-4"></div>
              <p className="text-white text-lg mb-2">
                {project.role || "Lead Product Designer"}
              </p>
              {project.completedDate && (
                <p className="text-text-secondary">
                  {new Date(project.completedDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* Right: Process - Two Columns */}
            {project.process && project.process.length > 0 ? (
              <div>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.process.map((step, index) => (
                    <div key={index} className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">
                            {step.title}
                          </h4>
                          <p className="text-text-secondary text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          User Research
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          Conducted user interviews and analyzed drop-off data.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          UI Design
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          Created high-fidelity mockups and interaction patterns.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          UX Strategy
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          Defined information architecture and user flows.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Prototyping
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          Built interactive prototypes for usability testing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Key Features Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-lg border border-white/10 p-6 sm:p-8 md:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
              {/* Left: Key Features List */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
                >
                  Key Features
                </motion.h3>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-0.5 bg-accent mb-6 sm:mb-8 md:mb-12"
                ></motion.div>
                <div className="space-y-3 sm:space-y-4">
                  {project.keyFeatures && project.keyFeatures.length > 0 ? (
                    project.keyFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInLeft}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 bg-background/50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/10 cursor-pointer transition-colors duration-300 hover:border-accent/30"
                      >
                        {getIconComponent(feature.icon)}
                        <span className="text-white font-medium text-sm sm:text-base">
                          {feature.name}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <>
                      <motion.div
                        variants={fadeInLeft}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 bg-background/50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/10 cursor-pointer transition-colors duration-300 hover:border-accent/30"
                      >
                        <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                        <span className="text-white font-medium text-sm sm:text-base">
                          Biometric Login & Security
                        </span>
                      </motion.div>
                      <motion.div
                        variants={fadeInLeft}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 bg-background/50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/10 cursor-pointer transition-colors duration-300 hover:border-accent/30"
                      >
                        <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                        <span className="text-white font-medium text-sm sm:text-base">
                          Real-time Spending Analytics
                        </span>
                      </motion.div>
                      <motion.div
                        variants={fadeInLeft}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 bg-background/50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/10 cursor-pointer transition-colors duration-300 hover:border-accent/30"
                      >
                        <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                        <span className="text-white font-medium text-sm sm:text-base">
                          One-tap Peer Transfers
                        </span>
                      </motion.div>
                      <motion.div
                        variants={fadeInLeft}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 bg-background/50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/10 cursor-pointer transition-colors duration-300 hover:border-accent/30"
                      >
                        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                        <span className="text-white font-medium text-sm sm:text-base">
                          Adaptive Dark Mode UI
                        </span>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Right: Feature Visual - Regular Image */}
              {imageUrls.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-gray-800"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={imageUrls[0]}
                      alt={`${project.title} - Feature showcase`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Tools & Technologies Section */}
        {project.techStack && project.techStack.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-8 md:mb-12 uppercase tracking-wide text-center">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {project.techStack.map((tool, index) => {
                // Map tool names to icons and colors
                const toolLower = tool.toLowerCase();
                let IconComponent: React.ReactNode = null;

                if (toolLower.includes("figma")) {
                  // Figma icon (orange square with F)
                  IconComponent = (
                    <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">F</span>
                    </div>
                  );
                } else if (toolLower.includes("principle")) {
                  // Principle icon (purple circle with P)
                  IconComponent = (
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                  );
                } else if (toolLower.includes("jira")) {
                  // Jira icon (blue square with checkmark)
                  IconComponent = (
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  );
                } else if (
                  toolLower.includes("illustrator") ||
                  toolLower.includes("adobe")
                ) {
                  // Adobe Illustrator icon (orange square with AI)
                  IconComponent = (
                    <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">AI</span>
                    </div>
                  );
                } else if (toolLower.includes("ios") || toolLower.includes("apple")) {
                  // iOS/Apple icon (green square with Apple icon)
                  IconComponent = (
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                      <Apple className="w-3 h-3 text-white" />
                    </div>
                  );
                } else {
                  // Default icon (gray with first letter)
                  IconComponent = (
                    <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {tool.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 sm:gap-3 bg-card rounded-lg px-3 sm:px-4 py-2 sm:py-3 border border-white/10 cursor-pointer transition-colors duration-300 hover:border-accent/30"
                  >
                    {IconComponent}
                    <span className="text-white font-medium text-sm sm:text-base">
                      {tool}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}


        {/* Project Impact Section */}
        {project.impactMetrics && project.impactMetrics.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-16 md:mb-24"
          >
            {project.impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-lg border border-white/10 p-6 sm:p-8 text-center"
              >
                <div className="text-accent text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">
                  {metric.value}
                </div>
                <p className="text-white text-base sm:text-lg font-semibold mb-2">
                  {metric.label}
                </p>
                {metric.description && (
                  <p className="text-text-secondary text-sm">
                    {metric.description}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : null}

        {/* What I Learned Section */}
        {project.learnings && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12 sm:mb-16 md:mb-24"
          >
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-accent text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8"
            >
              What I Learned
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl"
            >
              <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed">
                {project.learnings}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Next Project Section */}
        {nextProject && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="relative"
          >
            <Link href={`/projects/${nextProject.slug}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-card border border-white/10 hover:border-accent/50 transition-all duration-300 group cursor-pointer"
              >
                {nextProject.thumbnailUrl && (
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={nextProject.thumbnailUrl}
                      alt={nextProject.title}
                      fill
                      className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    />
                  </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-accent text-xl sm:text-2xl md:text-3xl font-bold mb-2 uppercase tracking-wide">
                        Next Project
                      </h3>
                      <h4 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                        {nextProject.title}
                      </h4>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-accent transition-colors duration-300"
                    >
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailContent;
