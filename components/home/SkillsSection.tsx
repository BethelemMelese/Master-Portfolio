'use client'

import { motion } from 'framer-motion'
import { Code, Server, Database, Settings, Target, Palette, LucideIcon } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { client } from '@/lib/sanity/client'
import { skillsQuery } from '@/lib/sanity/queries'
import { Skill } from '@/types'

// Icon component renderer - isolated to avoid module-level issues
const getCategoryIcon = (category: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    frontend: Code,
    backend: Server,
    database: Database,
    devops: Settings,
    tools: Settings,
    design: Palette,
    other: Target,
  }
  return iconMap[category] || Target
}

const getCategoryTitle = (category: string): string => {
  const titleMap: Record<string, string> = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    database: 'Databases',
    devops: 'DevOps & Tools',
    tools: 'Tools',
    design: 'Product Design',
    other: 'Soft Skills & Methods',
  }
  return titleMap[category] || category.charAt(0).toUpperCase() + category.slice(1)
}

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [groupedSkills, setGroupedSkills] = useState<Record<string, Skill[]>>({})

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await client.fetch<Skill[]>(skillsQuery)
        setSkills(data)
        
        // Group skills by category
        const grouped: Record<string, Skill[]> = {}
        data.forEach((skill) => {
          if (!grouped[skill.category]) {
            grouped[skill.category] = []
          }
          grouped[skill.category].push(skill)
        })
        setGroupedSkills(grouped)
      } catch (error) {
        console.error('Error fetching skills:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Get sorted categories
  const categories = useMemo(() => {
    return Object.keys(groupedSkills).sort((a, b) => {
      const order = ['design', 'frontend', 'backend', 'database', 'devops', 'tools', 'other']
      return (order.indexOf(a) === -1 ? 999 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 999 : order.indexOf(b))
    })
  }, [groupedSkills])

  if (loading) {
    return (
      <section className="pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg border border-white/10 p-6 animate-pulse">
                <div className="w-12 h-12 bg-white/5 rounded mb-4" />
                <div className="h-6 bg-white/5 rounded mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-6 w-20 bg-white/5 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="inline-block"
            >
              Skills
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mx-2"
            >
              &amp;
            </motion.span>
            <span className="relative inline-block">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="inline-block"
              >
                Expertise
              </motion.span>
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ 
                  scaleX: 1, 
                  opacity: 1,
                }}
                viewport={{ once: true, margin: '-100px' }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(143, 6, 6, 0)',
                    '0 0 8px rgba(143, 6, 6, 0.6)',
                    '0 0 12px rgba(143, 6, 6, 0.4)',
                    '0 0 8px rgba(143, 6, 6, 0.6)',
                  ]
                }}
                transition={{
                  scaleX: { 
                    duration: 1,
                    delay: 0.6,
                    type: 'spring',
                    stiffness: 120,
                    damping: 12,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  },
                  opacity: {
                    duration: 0.6,
                    delay: 0.6,
                  },
                  boxShadow: {
                    duration: 2,
                    delay: 1.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }
                }}
                className="absolute bottom-0 left-0 right-0 h-2 bg-accent origin-left rounded-full"
                style={{
                  boxShadow: '0 0 8px rgba(143, 6, 6, 0.6)'
                }}
              >
                {/* Shimmer effect */}
                <motion.span
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '100%' }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 2,
                    delay: 1.8,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ width: '50%' }}
                />
              </motion.span>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-text-secondary text-lg md:text-xl max-w-3xl"
          >
            A comprehensive breakdown of my technical toolkit, design methodologies, and the software I use to bring products to life from concept to deployment.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {categories.map((category, index) => {
            const categorySkills = groupedSkills[category]
            const IconComponent = getCategoryIcon(category)
            const categoryTitle = getCategoryTitle(category)

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className="bg-card rounded-lg border border-white/10 p-6 hover:border-accent/50 transition-all duration-300 group"
              >
                {/* Icon */}
                <motion.div 
                  className="text-accent mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.div>

                {/* Title */}
                <motion.h3 
                  className="text-white font-bold text-xl mb-4 group-hover:text-accent transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {categoryTitle}
                </motion.h3>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill._id}
                      initial={{ opacity: 0, scale: 0, rotate: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.1 + skillIndex * 0.05,
                        type: 'spring',
                        stiffness: 200,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 2,
                        backgroundColor: 'rgba(143, 6, 6, 0.2)',
                        borderColor: '#8f0606'
                      }}
                      className="px-3 py-1 text-sm text-white border border-accent rounded-full bg-transparent hover:bg-accent/10 transition-all duration-200 cursor-default"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
