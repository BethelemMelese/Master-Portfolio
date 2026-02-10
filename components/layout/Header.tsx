'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    // { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
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

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease: 'easeOut' }}
              className="flex items-center gap-1 px-2 py-1.5 bg-card rounded-lg"
            >
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05, ease: 'easeOut' }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`relative inline-block px-3 py-1.5 text-xs md:text-sm font-medium transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2 z-10">
            {/* Language Selector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-card rounded-lg text-gray-300 hover:text-white transition-colors text-xs md:text-sm font-medium"
              >
                English
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {isLanguageOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setIsLanguageOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 bg-card rounded-lg shadow-lg border border-white/10 z-50 min-w-[120px]"
                    >
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                        English
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Us Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="sm"
                asChild
                className="inline-flex items-center justify-center h-8 md:h-9 px-3 md:px-4 rounded-lg bg-card hover:bg-card/80 border-0 text-gray-300 hover:text-white text-xs md:text-sm font-medium transition-colors"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>

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
              className="fixed inset-0 transition-all duration-300 ease-in-out bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-14 sm:top-16 right-0 bottom-0 w-[280px] sm:w-64 bg-black/60 border-l border-white/10 md:hidden shadow-2xl"
            >
              <nav className="flex flex-col p-4 sm:p-6 gap-3 z-40 sm:gap-4">
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
                            ? 'text-white bg-accent/50 backdrop-blur-sm border border-accent/50' 
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
                  className="pt-3 sm:pt-4 flex items-center justify-center gap-3"
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
