"use client";

import { useState } from "react";
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
  prevProject?: {
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
  prevProject,
}: ProjectDetailContentProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  const galleryImages =
    imageUrls.length > 0
      ? imageUrls
      : thumbnailUrl
      ? [thumbnailUrl]
      : [];

  const handlePrevImage = () => {
    if (galleryImages.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (galleryImages.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const openImageModal = (index: number) => {
    if (galleryImages.length === 0) return;
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
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

        {/* Hero Image/Mockup Section - Static first image with preview */}
        {galleryImages.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={scaleIn}
            className="mb-12 sm:mb-16 md:mb-24"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-gray-800 cursor-pointer"
              onClick={() => openImageModal(0)}
            >
              <Image
                key={galleryImages[0]}
                src={galleryImages[0]}
                alt={project.title}
                fill
                className="object-contain"
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

            {/* Right: Feature Visual - Slider + preview */}
              {galleryImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-gray-800 cursor-pointer"
                  onClick={() => openImageModal(currentImageIndex)}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      key={galleryImages[currentImageIndex]}
                      src={galleryImages[currentImageIndex]}
                      alt={`${project.title} - Feature showcase`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>

                  {galleryImages.length > 1 && (
                    <>
                      {/* Navigation Arrows */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        aria-label="Previous image"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        aria-label="Next image"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {galleryImages.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                            className={`h-2.5 w-2.5 rounded-full border border-white/40 transition-all ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white/20 hover:bg-white/40"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
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

        {/* Project Navigation Section: Previous / Next + Back to Gallery */}
        {(prevProject || nextProject) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-16"
          >
            <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
              <span className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
                Keep Exploring
              </span>
              <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Navigate Between Case Studies
              </h3>
            </div>

            {/* Previous / Next cards */}
            <div
              className={`grid gap-4 md:gap-6 ${
                prevProject && nextProject ? "md:grid-cols-2" : "md:grid-cols-1"
              }`}
            >
              {/* Previous Project Card */}
              {prevProject && (
                <Link href={`/projects/${prevProject.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="relative w-full h-[170px] sm:h-[210px] md:h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 via-card to-black/40 border border-white/10 hover:border-accent/60 hover:shadow-[0_0_40px_rgba(244,114,182,0.35)] transition-all duration-300 group cursor-pointer backdrop-blur-md"
                  >
                    {prevProject.thumbnailUrl && (
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={prevProject.thumbnailUrl}
                          alt={prevProject.title}
                          fill
                          className="object-contain opacity-35 group-hover:opacity-55 transition-opacity duration-300"
                        />
                      </motion.div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent flex flex-col justify-center p-4 sm:p-5">
                      <p className="flex items-center gap-1 text-text-secondary text-xs sm:text-sm mb-1 uppercase tracking-wide">
                        <ArrowRight className="w-3 h-3 rotate-180 text-accent" />
                        Previous Project
                      </p>
                      <h4 className="text-white text-lg sm:text-xl font-semibold line-clamp-2">
                        {prevProject.title}
                      </h4>
                    </div>
                  </motion.div>
                </Link>
              )}

              {/* Next Project Card */}
              {nextProject && (
                <Link href={`/projects/${nextProject.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="relative w-full h-[170px] sm:h-[210px] md:h-[240px] rounded-2xl overflow-hidden bg-gradient-to-bl from-white/5 via-card to-black/40 border border-white/10 hover:border-accent/60 hover:shadow-[0_0_40px_rgba(244,114,182,0.35)] transition-all duration-300 group cursor-pointer backdrop-blur-md"
                  >
                    {nextProject.thumbnailUrl && (
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={nextProject.thumbnailUrl}
                          alt={nextProject.title}
                          fill
                          className="object-contain opacity-35 group-hover:opacity-55 transition-opacity duration-300"
                        />
                      </motion.div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/60 to-transparent flex flex-col justify-center items-end p-4 sm:p-5 text-right">
                      <p className="flex items-center justify-end gap-1 text-text-secondary text-xs sm:text-sm mb-1 uppercase tracking-wide">
                        Next Project
                        <ArrowRight className="w-3 h-3 text-accent" />
                      </p>
                      <h4 className="text-white text-lg sm:text-xl font-semibold line-clamp-2">
                        {nextProject.title}
                      </h4>
                    </div>
                  </motion.div>
                </Link>
              )}
            </div>

            {/* Compact Back to Gallery button */}
            <div className="mt-6 flex justify-center">
              <Link href="/projects">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/10 px-5 sm:px-6 py-2.5 text-sm sm:text-base font-medium text-white shadow-[0_0_20px_rgba(244,114,182,0.35)] hover:bg-accent/20 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Back to project gallery</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Fullscreen Image Modal */}
        {isImageModalOpen && galleryImages.length > 0 && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 py-8"
            onClick={closeImageModal}
          >
            <div
              className="relative w-full max-w-5xl h-[60vh] sm:h-[70vh] md:h-[80vh] rounded-lg overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={`modal-${galleryImages[currentImageIndex]}`}
                src={galleryImages[currentImageIndex]}
                alt={project.title}
                fill
                className="object-contain"
                priority
              />

              {/* Close button */}
              <button
                type="button"
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors text-xl leading-none"
                aria-label="Close image preview"
              >
                ×
              </button>

              {/* Navigation arrows inside modal */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ArrowRight className="h-5 w-5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Dots indicator */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={`modal-dot-${index}`}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2.5 w-2.5 rounded-full border border-white/50 transition-all ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailContent;
