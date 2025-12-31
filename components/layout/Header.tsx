'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    // { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-sm border-b border-background/50"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 group z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-accent flex items-center justify-center rounded-sm sm:rounded"
            >
              <span className="text-white font-bold text-sm sm:text-base md:text-lg">B</span>
            </motion.div>
            <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg tracking-wider uppercase">
              BETISHA
            </span>
          </Link>

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden md:flex items-center gap-3 md:gap-4 lg:gap-6">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, ease: 'easeOut' }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`relative inline-block text-xs md:text-sm lg:text-base font-medium uppercase tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {/* Animated underline for active state */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
                        style={{
                          boxShadow: '0 0 8px rgba(143, 6, 6, 0.6)',
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="outline"
              size="sm"
              asChild
                className="inline-flex items-center justify-center h-8 md:h-9 lg:h-10 px-3 md:px-4 lg:px-6 rounded-md bg-accent hover:bg-accent/90 border-0 text-white text-xs md:text-sm font-medium uppercase tracking-wide transition-all hover:scale-105 active:scale-95"
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 p-2 text-white hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-14 sm:top-16 right-0 bottom-0 w-[280px] sm:w-64 bg-[#0a0a0a] backdrop-blur-md border-l border-white/10 z-40 md:hidden shadow-2xl"
            >
              <nav className="flex flex-col p-4 sm:p-6 gap-3 sm:gap-4">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`relative inline-block text-sm sm:text-base font-medium uppercase tracking-wide transition-all duration-300 py-2 sm:py-2.5 px-4 rounded-lg ${
                          isActive 
                            ? 'text-white bg-accent/20 border border-accent/50' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                        {/* Animated dot indicator for mobile active state */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 20,
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full"
                            style={{
                              boxShadow: '0 0 8px rgba(143, 6, 6, 0.8)',
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-3 sm:pt-4 flex justify-center"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="inline-flex items-center justify-center h-9 sm:h-10 px-5 sm:px-6 rounded-md bg-accent hover:bg-accent/90 border-0 text-white text-xs sm:text-sm font-medium uppercase tracking-wide"
                  >
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Contact
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
