'use client'

import { motion } from 'framer-motion'

const AvailabilityTag = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -10, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ 
        duration: 0.6,
        delay: 0.2,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 w-fit"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-2 h-2 rounded-full bg-accent"
      />
      <span className="text-xs font-semibold tracking-wider text-accent uppercase">
        Available for work
      </span>
    </motion.div>
  )
}

export default AvailabilityTag
