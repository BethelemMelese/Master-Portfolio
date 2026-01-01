"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AvailabilityTag from "./AvailabilityTag";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99], // Custom cubic-bezier for smooth graduation
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl"
    >
      {/* Availability Tag */}
      <motion.div variants={itemVariants} className="mb-6">
        <AvailabilityTag />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-white"
      >
        <motion.span
          className="text-white inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          Crafting <br />
        </motion.span>
        <motion.span
          className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            textShadow: [
              "0 0 0px rgba(143, 6, 6, 0)",
              "0 0 20px rgba(143, 6, 6, 0.5)",
              "0 0 0px rgba(143, 6, 6, 0)",
            ],
          }}
          transition={{
            opacity: {
              duration: 0.8,
              delay: 0.4,
              ease: [0.6, -0.05, 0.01, 0.99],
            },
            scale: {
              duration: 0.8,
              delay: 0.4,
              ease: [0.6, -0.05, 0.01, 0.99],
            },
            textShadow: { duration: 3, repeat: Infinity, delay: 1 },
          }}
        >
          Intuitive
        </motion.span>
        <motion.span
          className="text-white inline-block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          {" "}
          Digital Future.
        </motion.span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="mb-8 sm:mb-10 md:mb-12 mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed"
      >
        I'm Betisha, a Software Designer based in San Francisco. I blend
        aesthetic elegance with functional depth to build design systems and
        digital experiences that scale.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          size="lg"
          className="flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-accent hover:bg-red-800 text-white text-base font-bold transition-all hover:shadow-[0_0_25px_-5px_rgba(141,7,7,0.5)] active:scale-[0.98]"
          asChild
        >
          <Link href="/projects" className="flex items-center gap-2">
            <span>View My Work</span>
            <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild
          className="flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-transparent border border-white/20 hover:border-white/50 text-white text-base font-medium transition-all hover:bg-white/5 active:scale-[0.98]"
        >
          <Link href="/about">
            <span>Read About Me</span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
