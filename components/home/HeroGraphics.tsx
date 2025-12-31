'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const HeroGraphics = () => {
  return (
    <div className="relative w-full h-full">
      {/* Centered container for positioning */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
        {/* Background glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-accent rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] animate-pulse"
        />

        {/* Card 1 - Upper Right */}
        <motion.div
          initial={{ opacity: 0, x: 80, y: -20, rotate: 10, filter: 'blur(20px)' }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 6, filter: 'blur(0px)' }}
          transition={{ 
            duration: 1,
            delay: 0.4,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
          whileHover={{ 
            rotate: 3,
            transition: { duration: 0.5 }
          }}
          className="absolute top-[8%] sm:top-[10%] md:top-[12%] right-[2%] sm:right-[4%] md:right-[6%] w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl z-10 flex flex-col p-3 sm:p-4"
        >
          {/* UI Preview Area */}
          <div className="w-full h-32 rounded-lg bg-gradient-to-br from-gray-800 to-black mb-4 overflow-hidden">
            {/* Browser Controls */}
            <div className="flex items-center gap-2 p-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            {/* Simulated UI elements */}
            <div className="mt-2 mx-2 h-2 w-1/2 bg-white/10 rounded" />
            <div className="mt-2 mx-2 h-16 bg-white/5 rounded" />
          </div>
          
          {/* Text lines */}
          <div className="h-2 w-3/4 bg-white/20 rounded mb-2" />
          <div className="h-2 w-1/2 bg-white/10 rounded mb-4" />
          
          {/* Footer with icon and heart */}
          <div className="mt-auto flex justify-between items-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent text-xs font-bold"
            >
              AD
            </motion.div>
            <Heart className="w-4 h-4 text-white/40" />
          </div>
        </motion.div>

        {/* Card 2 - Lower Left (significantly overlaps bottom-left of Card 1) */}
        <motion.div
          initial={{ opacity: 0, x: -80, y: 20, rotate: -10, filter: 'blur(20px)' }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: -3, filter: 'blur(0px)' }}
          transition={{ 
            duration: 1,
            delay: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
          whileHover={{ 
            rotate: 0,
            scale: 1.08,
            y: -8,
            boxShadow: '0 20px 40px rgba(143, 6, 6, 0.3)',
            transition: { duration: 0.5, ease: 'easeOut' }
          }}
          className="absolute top-[38%] sm:top-[40%] md:top-[42%] left-[2%] sm:left-[2%] md:left-[2%] w-56 h-40 sm:w-64 sm:h-44 md:w-72 md:h-48 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl shadow-2xl z-20 p-4 sm:p-5 flex flex-col justify-between group/card cursor-pointer"
        >
          {/* Icon and Label */}
          <div className="flex justify-between items-start ">
            <motion.div
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="p-2 bg-accent/20 rounded-lg text-accent"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </motion.div>
            <motion.span 
              className="text-xs text-text-secondary font-mono"
              whileHover={{ opacity: 1 }}
            >
              SYS-01
            </motion.span>
          </div>

          {/* Text Content */}
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-white font-bold text-base sm:text-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Design System
            </motion.h3>
            <p className="text-text-secondary text-xs sm:text-sm">Consistent & Scalable</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '66.67%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="h-full bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroGraphics
