'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const PageLoader = () => {
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const prevPathnameRef = useRef(pathname)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setLoading(false)
        setIsInitialLoad(false)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isInitialLoad])

  // Handle route changes
  useEffect(() => {
    if (!isInitialLoad && pathname !== prevPathnameRef.current) {
      setLoading(true)
      prevPathnameRef.current = pathname

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }

      loadingTimeoutRef.current = setTimeout(() => {
        setLoading(false)
      }, 400)

      return () => {
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current)
        }
      }
    }
  }, [pathname, isInitialLoad])

  // Intercept link clicks to show loading immediately
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href]')
      
      if (link) {
        const href = link.getAttribute('href')
        if (href && href.startsWith('/') && href !== pathname) {
          setLoading(true)
        }
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Spinner */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-16 h-16 md:w-20 md:h-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-full h-full border-4 border-accent/20 border-t-accent rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 w-full h-full border-4 border-transparent border-r-accent/50 rounded-full"
              />
            </motion.div>
            
            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white text-sm md:text-base font-medium uppercase tracking-wider"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader

