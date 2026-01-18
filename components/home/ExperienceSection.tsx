'use client'

import { motion } from 'framer-motion'
import { 
  FileText, 
  Rocket, 
  PenTool, 
  MapPin, 
  X, 
  Briefcase, 
  Target, 
  Sparkles, 
  Layers, 
  Zap, 
  Lightbulb, 
  Star, 
  Check,
  LucideIcon
} from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { client } from '@/lib/sanity/client'
import { experienceQuery, focusAreasQuery } from '@/lib/sanity/queries'
import { Experience as SanityExperience, FocusArea as SanityFocusArea } from '@/types'
interface Experience {
  dates: string
  title: string
  company: string
  description: string[]
  skills: string[]
  icon: React.ReactNode
}

// Helper function to extract text from PortableText blocks
const extractTextFromBlock = (block: any): string => {
  if (block._type === 'block' && block.children) {
    return block.children
      .map((child: any) => {
        if (typeof child === 'string') {
          return child
        }
        if (child.text) {
          return child.text
        }
        return ''
      })
      .join('')
  }
  return ''
}

// Helper function to convert PortableText to plain text array
const portableTextToArray = (blocks: any[]): string[] => {
  if (!blocks || blocks.length === 0) return []
  
  const result: string[] = []
  
  blocks.forEach((block) => {
    const text = extractTextFromBlock(block)
    if (text.trim()) {
      result.push(text.trim())
    }
  })
  
  return result
}

// Helper function to format dates
const formatDateRange = (startDate: string, endDate?: string, current?: boolean): string => {
  const start = new Date(startDate).getFullYear()
  const end = current ? 'Present' : endDate ? new Date(endDate).getFullYear() : ''
  return end ? `${start}—${end}` : `${start}`
}

// Helper function to get icon based on role
const getIcon = (role: string): React.ReactNode => {
  const roleLower = role.toLowerCase()
  if (roleLower.includes('lead') || roleLower.includes('manager') || roleLower.includes('director')) {
    return <Rocket className="w-5 h-5" />
  } else if (roleLower.includes('senior') || roleLower.includes('product')) {
    return <FileText className="w-5 h-5" />
  } else if (roleLower.includes('ui') || roleLower.includes('ux') || roleLower.includes('designer')) {
    return <PenTool className="w-5 h-5" />
  }
  return <Briefcase className="w-5 h-5" />
}

interface FocusArea {
  title: string
  description: string
  icon: React.ReactNode
  visual: React.ReactNode
}

// Helper function to get icon component from icon name
const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    'map-pin': MapPin,
    'target': Target,
    'sparkles': Sparkles,
    'layers': Layers,
    'rocket': Rocket,
    'zap': Zap,
    'lightbulb': Lightbulb,
    'star': Star,
    'x': X,
    'check': Check,
  }
  return iconMap[iconName.toLowerCase()] || Target
}

// Helper function to render visual based on type
const renderVisual = (visualType?: string, gradientColors?: { from?: string; to?: string }) => {
  if (visualType === 'dots') {
    return (
      <div className="w-full h-32 bg-gradient-to-br from-blue-500/20from-blue-400/30 to-blue-600/10to-blue-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: `${20 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    )
  }
  
  if (visualType === 'circles') {
    return (
      <div className="w-full h-32 bg-gradient-to-br from-gray-800from-gray-200 to-gray-900to-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-700bg-gray-400 rounded-full shadow-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-600bg-gray-500 rounded-full shadow-md" />
        </div>
      </div>
    )
  }
  
  // Default gradient
  const fromColor = gradientColors?.from || 'rgba(59, 130, 246, 0.2)' // blue-500/20
  const toColor = gradientColors?.to || 'rgba(37, 99, 235, 0.1)' // blue-600/10
  
  // Convert Tailwind color names to rgba if needed
  const getColorValue = (color: string): string => {
    const colorMap: Record<string, string> = {
      'blue-500': 'rgba(59, 130, 246, 0.2)',
      'blue-600': 'rgba(37, 99, 235, 0.1)',
      'purple-500': 'rgba(168, 85, 247, 0.2)',
      'purple-600': 'rgba(147, 51, 234, 0.1)',
      'green-500': 'rgba(34, 197, 94, 0.2)',
      'green-600': 'rgba(22, 163, 74, 0.1)',
    }
    
    // If it's already an rgba/hsl/hex value, return as is
    if (color.startsWith('rgba') || color.startsWith('rgb') || color.startsWith('#') || color.startsWith('hsl')) {
      return color
    }
    
    // Otherwise try to map it
    return colorMap[color] || color
  }
  
  return (
    <div 
      className="w-full h-32 rounded-lg"
      style={{
        background: `linear-gradient(to bottom right, ${getColorValue(fromColor)}, ${getColorValue(toColor)})`,
      }}
    />
  )
}

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([])
  const [loading, setLoading] = useState(true)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch experiences and focus areas in parallel
        const [experiencesData, focusAreasData] = await Promise.all([
          client.fetch<SanityExperience[]>(experienceQuery),
          client.fetch<SanityFocusArea[]>(focusAreasQuery)
        ])
        
        if (!experiencesData || experiencesData.length === 0) {
          console.warn('No experience data returned from Sanity')
        } else {
          // Transform Sanity experiences to component format
          const transformedExperiences: Experience[] = experiencesData
            .filter(exp => exp && exp.role && exp.company) // Filter out invalid entries
            .map((exp) => ({
              dates: formatDateRange(exp.startDate, exp.endDate, exp.current),
              title: exp.role,
              company: exp.company,
              description: portableTextToArray(exp.description || []),
              skills: exp.technologies || [],
              icon: getIcon(exp.role)
            }))
          
          setExperiences(transformedExperiences)
        }
        
        if (!focusAreasData || focusAreasData.length === 0) {
          console.warn('No focus areas data returned from Sanity')
        } else {
          // Transform Sanity focus areas to component format
          const transformedFocusAreas: FocusArea[] = focusAreasData
            .filter(area => area && area.title) // Filter out invalid entries
            .map((area) => {
              const IconComponent = getIconComponent(area.icon || 'target')
              return {
                title: area.title,
                description: area.description || '',
                icon: <IconComponent className="w-5 h-5 text-accent" />,
                visual: renderVisual(area.visualType, area.gradientColors)
              }
            })
          
          setFocusAreas(transformedFocusAreas)
        }
      } catch (error) {
        console.error('Error fetching experience data:', error)
        if (error instanceof Error) {
          console.error('Error details:', error.message)
          console.error('Stack:', error.stack)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <div className="h-20 bg-white/5bg-gray-300/10 rounded mb-4 animate-pulse" />
            <div className="h-6 bg-white/5bg-gray-300/10 rounded max-w-3xl animate-pulse" />
          </div>
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 bg-white/5 rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-3 space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg border border-white/10 p-6 md:p-8 animate-pulse">
                  <div className="h-6 bg-white/5bg-gray-300/10 rounded mb-4 w-3/4" />
                  <div className="h-4 bg-white/5bg-gray-300/10 rounded mb-4 w-1/2" />
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-white/5bg-gray-300/10 rounded" />
                    <div className="h-4 bg-white/5bg-gray-300/10 rounded w-5/6" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-white/5bg-gray-300/10 rounded w-20" />
                    <div className="h-6 bg-white/5bg-gray-300/10 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (experiences.length === 0) {
    return null
  }

  return (
    <section className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block text-white"
            >
              Professional
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block text-accent"
            >
              Experience
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className=" text-text-secondary-light text-lg md:text-xl max-w-3xl"
          >
            10+ Years of crafting digital products, leading design teams, and solving complex problems for global brands.
          </motion.p>
        </motion.div>

        {/* Experience Cards - Clean Vertical Layout with Path */}
        <div className="relative pl-12 md:pl-20 lg:pl-24 ml-auto max-w-5xl">
          {/* Vertical Path Line - Enhanced Styling - Aligned to dots */}
          <div className="absolute left-0 top-0 bottom-0">
            {/* Glow effect behind the line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20 blur-sm" />
            
            {/* Main path line with gradient */}
            <div className="absolute left-0 top-8 bottom-8 w-0.5">
              {/* Animated gradient line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="absolute top-0 left-0 w-full h-full origin-top"
                style={{
                  background: 'linear-gradient(to bottom, #8f0606 0%, #8f0606 50%, rgba(143, 6, 6, 0.6) 70%, rgba(143, 6, 6, 0.3) 100%)',
                  boxShadow: '0 0 8px rgba(143, 6, 6, 0.6), 0 0 16px rgba(143, 6, 6, 0.3)',
                }}
              />
              
              {/* Animated pulse effect */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleY: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-0 left-0 w-full h-full bg-accent/40"
                style={{
                  filter: 'blur(2px)',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-8 md:space-y-10 max-w-3xl">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.title}-${index}`}
                ref={(el) => { cardRefs.current[index] = el }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-card rounded-xl border border-white/10 p-6 md:p-8 hover:border-accent/50 transition-all duration-300 relative"
              >
                {/* Path Dot with Date - Left side connection point with enhanced styling */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1 + 0.3, 
                    type: 'spring', 
                    stiffness: 200 
                  }}
                  className="absolute -left-16 md:-left-20 lg:-left-24 top-8 z-10 flex flex-col items-center gap-2"
                >
                  {/* Outer glow ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-accent rounded-full blur-sm"
                  />
                  {/* Main dot */}
                  <div className="relative w-5 h-5 bg-accent rounded-full border-4 border-background shadow-lg"
                    style={{
                      boxShadow: '0 0 12px rgba(143, 6, 6, 0.8), 0 0 24px rgba(143, 6, 6, 0.4)',
                    }}
                  >
                    {/* Inner highlight */}
                    <div className="absolute inset-1 bg-accent/60 rounded-full" />
                  </div>
                  {/* Date text below dot */}
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="text-accent text-xs font-medium whitespace-nowrap mt-1"
                  >
                    {exp.dates}
                  </motion.div>
                </motion.div>
                
                {/* Accent line on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-xl" />
              
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  {/* Role and Company */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className="mt-1.5 text-accent">
                      {exp.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl md:text-2xl mb-1.5 leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-accent font-medium text-base md:text-lg">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description - Cleaner bullet points */}
              {exp.description.length > 0 && (
                <div className="mb-6 pl-2">
                  <ul className="space-y-3">
                    {exp.description.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                        className="flex items-start gap-3 text-text-secondary text-[15px] leading-relaxed"
                      >
                        <span className="text-accent mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="flex-1">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies - More prominent */}
              {exp.skills.length > 0 && (
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                    Technologies & Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.03 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-lg hover:bg-accent/20 hover:border-accent/50 transition-all duration-200"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          </div>
        </div>

        {/* What I'm Focused On Now */}
        {focusAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 md:mt-24"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
              What I&apos;m Focused On Now
            </h3>
            
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="bg-card rounded-lg border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-300"
                >
                  {/* Visual */}
                  {area.visual}
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {area.icon}
                      <h4 className="text-white font-bold text-xl">{area.title}</h4>
                    </div>
                    <p className="text-text-secondary-light">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ExperienceSection
