'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'

interface Stat {
  value: string
  label: string
}

// Default stats as fallback
const defaultStats: Stat[] = [
  { value: '7+', label: 'Years Exp.' },
  { value: '50+', label: 'Projects' },
  { value: '12', label: 'Awards' },
]

// Counter hook for animated numbers
const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInView = useInView(ref, { once: false, margin: '-50px' })

  useEffect(() => {
    if (!isInView) {
      // Reset when out of view
      setCount(start)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    // Start animation when in view
    setCount(start)

    let startTime: number | null = null

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(start + (end - start) * easeOutQuart))

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
        animationFrameRef.current = null
      }
    }

    // Small delay to ensure smooth start
    timeoutRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animate)
    }, 200)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isInView, end, duration, start])

  return { count, ref }
}

// Component for animated counter
const Counter = ({ 
  value, 
  delay = 0 
}: { 
  value: string
  delay?: number 
}) => {
  // Extract numeric value and suffix (e.g., "7+" -> 7, "+")
  const numericMatch = value.match(/(\d+)(.*)/)
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0
  const suffix = numericMatch ? numericMatch[2] : ''

  const { count, ref } = useCountUp(numericValue, 2000, 0)

  return (
    <motion.div
      ref={ref}
      className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 1 + delay,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
    >
      {count}{suffix}
    </motion.div>
  )
}

interface StatisticsSectionProps {
  resumeUrl?: string
  stats?: Stat[]
}

const StatisticsSection = ({ resumeUrl, stats }: StatisticsSectionProps) => {
  // Use provided stats or fallback to default
  const displayStats = stats && stats.length > 0 ? stats : defaultStats

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16"
      >
        {displayStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              delay: 0.9 + index * 0.12,
              duration: 0.6,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: 'easeOut' }
            }}
            className="text-center"
          >
            <Counter value={stat.value} delay={index * 0.12} />
            <motion.div 
              className="text-text-secondary text-xs sm:text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                delay: 1.1 + index * 0.12,
                duration: 0.4
              }}
            >
              {stat.label}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Download Resume Button */}
      {resumeUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <Link
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-accent rounded-lg text-white hover:bg-white/5 hover:border-accent/50 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </Link>
        </motion.div>
      )}
    </div>
  )
}

export default StatisticsSection
