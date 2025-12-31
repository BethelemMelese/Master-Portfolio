'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/home/HeroSection'
import StatisticsSection from '@/components/home/StatisticsSection'
import HeroGraphics from '@/components/home/HeroGraphics'
import SkillsSection from '@/components/home/SkillsSection'
import ExperienceSection from '@/components/home/ExperienceSection'

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-20 relative">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] md:min-h-[calc(100vh-12rem)]">
          {/* Left Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="order-2 lg:order-1 relative z-10 w-full"
          >
            <HeroSection />
            <StatisticsSection />
          </motion.div>

          {/* Right Side - Graphics */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] order-1 lg:order-2 z-10 w-full"
          >
            <HeroGraphics />
          </motion.div>
        </div>

        {/* Gradient Divider Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="h-px w-full mt-16 md:mt-20 origin-left"
          style={{
            background: 'linear-gradient(135deg, #8f0606 0%, #000000 60%)',
          }}
        />
      </div>

      {/* Skills Section */}
      <SkillsSection />

      {/* Gradient Divider Line */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="h-px w-full origin-left"
          style={{
            background: 'linear-gradient(135deg, #8f0606 0%, #000000 60%)',
          }}
        />
      </div>

      {/* Experience Section */}
      <ExperienceSection />
    </div>
  )
}
