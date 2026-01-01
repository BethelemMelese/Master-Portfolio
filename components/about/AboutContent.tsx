'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, BarChart3, Infinity as InfinityIcon, ExternalLink, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface WorkPrinciple {
  title: string
  description: string
  icon?: string
}

interface TechCategory {
  title: string
  items: string[]
}

interface AboutData {
  name?: string
  title?: string
  bioParagraphs?: string[]
  location?: string
  resumeUrl?: string
  linkedinUrl?: string
  workPrinciples?: WorkPrinciple[]
  techCategories?: TechCategory[]
  availableForWork?: boolean
}

interface AboutContentProps {
  aboutData: AboutData | null
  imageUrl?: string
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Infinity: <InfinityIcon className="w-6 h-6" />,
}

const AboutContent = ({ aboutData, imageUrl = '/portrait.jpg' }: AboutContentProps) => {
  // Refs for scroll animations
  const aboutMeRef = useRef(null)
  const workPrinciplesRef = useRef(null)
  const ctaRef = useRef(null)
  const portraitRef = useRef(null)
  const techRef = useRef(null)
  const availabilityRef = useRef(null)

  // Check if elements are in view
  const aboutMeInView = useInView(aboutMeRef, { once: true, margin: '-100px' })
  const workPrinciplesInView = useInView(workPrinciplesRef, { once: true, margin: '-100px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-50px' })
  const portraitInView = useInView(portraitRef, { once: true, margin: '-100px' })
  const techInView = useInView(techRef, { once: true, margin: '-100px' })
  const availabilityInView = useInView(availabilityRef, { once: true, margin: '-50px' })

  // Default values if data is not available
  const name = aboutData?.name || 'Your Name'
  const title = aboutData?.title || 'Your Title'
  const bioParagraphs = aboutData?.bioParagraphs || []
  const location = aboutData?.location || ''
  const resumeUrl = aboutData?.resumeUrl || '#'
  const linkedinUrl = aboutData?.linkedinUrl || '#'
  
  // Ensure arrays are properly handled
  const workPrinciples = Array.isArray(aboutData?.workPrinciples) 
    ? aboutData.workPrinciples.filter(p => p && p.title && p.description)
    : []
  
  const techCategories = Array.isArray(aboutData?.techCategories)
    ? aboutData.techCategories.filter(c => c && c.title && Array.isArray(c.items))
    : []
  
  const availableForWork = aboutData?.availableForWork ?? true

  // Debug: Log tech categories in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Tech Categories in Component:', techCategories)
    console.log('Work Principles in Component:', workPrinciples)
    console.log('About Data:', aboutData)
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <section className="py-8 sm:py-8 md:py-10 px-4 sm:px-4 lg:px-6 xl:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-10 gap-8 sm:gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-6">
            {/* About Me Section */}
            <motion.div
              ref={aboutMeRef}
              initial="hidden"
              animate={aboutMeInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 sm:mb-10 md:mb-12"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
                <span className="relative">
                  About Me
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-accent origin-left"
                  />
                </span>
              </h1>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {name}
              </h2>
              
              <p className="text-accent text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8">
                {title}
              </p>

              <div className="space-y-4 sm:space-y-5 md:space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
                {bioParagraphs.length > 0 ? (
                  bioParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <>
                    <p>
                      I&apos;m a designer who lives in the details but never loses sight of the bigger picture. With over 8 years of experience crafting digital products, I specialize in untangling complex workflows and turning them into intuitive, human-centered experiences.
                    </p>
                    <p>
                      My background bridges the gap between creative visual design and analytical user research. I believe that great design isn&apos;t just about pixels—it&apos;s about solving real problems with empathy and precision. When I&apos;m not in Figma, you can find me exploring brutalist architecture or tinkering with generative art code.
                    </p>
                  </>
                )}
              </div>
            </motion.div>

            {/* How I Work Section */}
            <motion.div
              ref={workPrinciplesRef}
              initial="hidden"
              animate={workPrinciplesInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 sm:mb-10 md:mb-12"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
                How I Work
              </h3>

              <div className="space-y-6 sm:space-y-8">
                {workPrinciples.length > 0 ? (
                  workPrinciples.map((principle, index) => {
                    const iconComponent = principle.icon ? iconMap[principle.icon] : <Users className="w-6 h-6" />
                    return (
                      <motion.div
                        key={principle.title || index}
                        initial="hidden"
                        animate={workPrinciplesInView ? "visible" : "hidden"}
                        variants={fadeInLeft}
                        transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                        className="flex gap-3 sm:gap-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent/20 rounded flex items-center justify-center text-accent">
                            {iconComponent}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg sm:text-xl mb-1 sm:mb-2">
                            {principle.title}
                          </h4>
                          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                            {principle.description}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })
                ) : (
                  <p className="text-text-secondary">No work principles available.</p>
                )}
              </div>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              ref={ctaRef}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              {resumeUrl && (
                <Link
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-accent rounded-lg text-white hover:bg-white/5 hover:border-accent/50 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </Link>
              )}
              {linkedinUrl && (
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors duration-300"
                >
                  <span>View LinkedIn Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right Column - Visuals and Skills */}
          <div className="lg:col-span-4">
            <motion.div
              initial="hidden"
              animate={portraitInView ? "visible" : "hidden"}
              variants={fadeInRight}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Portrait Image */}
              <div className="mb-6" ref={portraitRef}>
                <div className="w-full aspect-square bg-card border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden mb-4 relative p-3 sm:p-4 md:p-6">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={name}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />
                    {location && (
                      <div className="absolute bottom-4 left-4 z-10">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          // className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2.5 shadow-xl"
                        >
                          <p className="text-white text-xs font-medium uppercase tracking-wider mb-0.5 opacity-80">
                            BASED IN
                          </p>
                          <p className="text-accent text-sm font-bold">
                            {location}
                          </p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech & Tools Focus Section */}
              <motion.div
                ref={techRef}
                initial="hidden"
                animate={techInView ? "visible" : "hidden"}
                variants={scaleIn}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-6 sm:mb-8"
              >
                <div className="bg-card rounded-lg p-4 sm:p-5 md:p-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
                    Tech & Tools Focus
                  </h3>

                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {techCategories.length > 0 ? (
                    techCategories.map((category, index) => (
                      <motion.div
                        key={category.title || index}
                        initial="hidden"
                        animate={techInView ? "visible" : "hidden"}
                        variants={fadeInUp}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                      >
                        <h4 className="text-text-secondary text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">
                          {category.title}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {category.items?.map((item, itemIndex) => (
                            <motion.span
                              key={item}
                              initial="hidden"
                              animate={techInView ? "visible" : "hidden"}
                              variants={fadeInUp}
                              transition={{ duration: 0.3, delay: (index * 0.1) + (itemIndex * 0.05), ease: "easeOut" }}
                              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white bg-accent/20  border border-white/10 rounded-md sm:rounded-lg hover:border-accent/50 transition-colors duration-200"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-text-secondary">No tech categories available.</p>
                  )}
                  </div>
                </div>
              </motion.div>

              {/* Opportunity Status */}
              {availableForWork && (
                <motion.div
                  ref={availabilityRef}
                  initial="hidden"
                  animate={availabilityInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className=" border border-accent/30 rounded-lg p-4 flex items-center gap-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-accent"
                  />
                  <span className="text-accent font-medium">Open to new opportunities</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutContent
