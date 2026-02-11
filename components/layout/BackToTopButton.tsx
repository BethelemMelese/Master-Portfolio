'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const SCROLL_THRESHOLD = 400

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const tickingRef = useRef(false)

  const updateState = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight

    setIsVisible(scrollTop > SCROLL_THRESHOLD)
    setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    tickingRef.current = false
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateState)
        tickingRef.current = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [updateState])

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  const circumference = 2 * Math.PI * 24
  const strokeOffset = circumference * (1 - progress)
  const accentColor = 'var(--accent-color, #8f0606)'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-4 z-40 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Scroll back to top"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:h-14 sm:w-14"
          >
            <svg
              className="absolute inset-0 -rotate-90"
              viewBox="0 0 60 60"
              fill="none"
              aria-hidden
            >
              <circle
                cx="30"
                cy="30"
                r="24"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="4"
              />
              <motion.circle
                cx="30"
                cy="30"
                r="24"
                stroke={accentColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
              />
            </svg>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-colors duration-200 group-hover:bg-accent/90 sm:h-12 sm:w-12">
              <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    let mediaQuery: MediaQueryList | null = null

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery ? mediaQuery.matches : false)
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      updatePreference()
      mediaQuery.addEventListener('change', updatePreference)
    }

    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', updatePreference)
      }
    }
  }, [])

  return prefersReducedMotion
}

export default BackToTopButton

