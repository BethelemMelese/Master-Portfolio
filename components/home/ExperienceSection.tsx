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
import { useEffect, useState } from 'react'
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
      <div className="w-full h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg flex items-center justify-center relative overflow-hidden">
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
      <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-700 rounded-full shadow-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-600 rounded-full shadow-md" />
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch experiences and focus areas in parallel
        const [experiencesData, focusAreasData] = await Promise.all([
          client.fetch<SanityExperience[]>(experienceQuery),
          client.fetch<SanityFocusArea[]>(focusAreasQuery)
        ])
        
        // Transform Sanity experiences to component format
        const transformedExperiences: Experience[] = experiencesData.map((exp) => ({
          dates: formatDateRange(exp.startDate, exp.endDate, exp.current),
          title: exp.role,
          company: exp.company,
          description: portableTextToArray(exp.description),
          skills: exp.technologies || [],
          icon: getIcon(exp.role)
        }))
        
        // Transform Sanity focus areas to component format
        const transformedFocusAreas: FocusArea[] = focusAreasData.map((area) => {
          const IconComponent = getIconComponent(area.icon)
          return {
            title: area.title,
            description: area.description,
            icon: <IconComponent className="w-5 h-5 text-accent" />,
            visual: renderVisual(area.visualType, area.gradientColors)
          }
        })
        
        setExperiences(transformedExperiences)
        setFocusAreas(transformedFocusAreas)
      } catch (error) {
        console.error('Error fetching data:', error)
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
            <div className="h-20 bg-white/5 rounded mb-4 animate-pulse" />
            <div className="h-6 bg-white/5 rounded max-w-3xl animate-pulse" />
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
                  <div className="h-6 bg-white/5 rounded mb-4 w-3/4" />
                  <div className="h-4 bg-white/5 rounded mb-4 w-1/2" />
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-white/5 rounded" />
                    <div className="h-4 bg-white/5 rounded w-5/6" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-white/5 rounded w-20" />
                    <div className="h-6 bg-white/5 rounded w-16" />
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
            className="text-text-secondary text-lg md:text-xl max-w-3xl"
          >
            10+ Years of crafting digital products, leading design teams, and solving complex problems for global brands.
          </motion.p>
        </motion.div>

        {/* Timeline and Experience Cards - Side by Side */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Timeline Column - Left Side */}
          <div className="lg:col-span-2 relative">
            <div className="relative pl-8">
              {/* Vertical Timeline Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top"
              />
              
              {/* Timeline Dates and Dots - Perfectly aligned with cards */}
              <div className="flex flex-col space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={`${exp.dates}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                    className="relative"
                  >
                    {/* Red Dot on Timeline - Positioned to align with card's top edge (top of padding area) */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                      className="absolute left-0 top-6 md:top-8 -translate-x-1/2 w-3 h-3 bg-accent rounded-full z-10"
                    />
                    {/* Date Text - Positioned at same vertical level as dot */}
                    <p className="text-white font-medium text-sm pl-4 pt-6 md:pt-8">
                      {exp.dates}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Cards Column - Right Side */}
          <div className="lg:col-span-3 flex flex-col space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.title}-${index}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.6, -0.05, 0.01, 0.99] }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="bg-card rounded-lg border border-white/10 p-5 sm:p-6 md:p-8 hover:border-accent/50 transition-all duration-300 relative"
              >
                {/* Icon */}
                <div className="absolute top-6 right-6 text-white/20">
                  {exp.icon}
                </div>

                {/* Title and Company */}
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-white font-bold text-xl sm:text-2xl mb-1">{exp.title}</h3>
                  <p className="text-accent text-sm sm:text-base">{exp.company}</p>
                </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-6">
                    {exp.description.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + itemIndex * 0.1 }}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <span className="text-accent mt-1.5">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                {/* Focus Areas Tags */}
                {exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        className="px-3 py-1 text-sm text-white bg-white/10 rounded-md"
                      >
                        {skill}
                      </motion.span>
                    ))}
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
                    <p className="text-text-secondary">{area.description}</p>
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
