'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'

interface Project {
  title: string
  description: string
  tags: string[]
  visualType: 'browser' | 'single-dot' | 'heart-circle' | 'lines'
  slug: string
}

const projects: Project[] = [
  {
    title: 'Nova Financial',
    description: 'Redesigning the mobile banking experience for a new generation of investors, focusing on clarity and trust.',
    tags: ['Fintech', 'Mobile App'],
    visualType: 'browser',
    slug: 'nova-financial'
  },
  {
    title: 'Orbit Dashboard',
    description: 'Creating a scalable design system and analytics dashboard for enterprise resource planning.',
    tags: ['SaaS', 'Design System'],
    visualType: 'single-dot',
    slug: 'orbit-dashboard'
  },
  {
    title: 'Vitality Plus',
    description: 'A comprehensive wellness platform connecting patients with healthcare providers through seamless UI.',
    tags: ['HealthTech', 'User Research'],
    visualType: 'heart-circle',
    slug: 'vitality-plus'
  },
  {
    title: 'Lumina Store',
    description: 'Reimagining the online shopping experience for a high-end lighting brand with immersive visuals.',
    tags: ['E-Commerce', 'Web Design'],
    visualType: 'lines',
    slug: 'lumina-store'
  }
]

const ProjectVisual = ({ type }: { type: Project['visualType'] }) => {
  switch (type) {
    case 'browser':
      return (
        <div className="w-full h-48 bg-gray-800 rounded-t-lg relative overflow-hidden">
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>
      )
    case 'single-dot':
      return (
        <div className="w-full h-48 bg-gray-800 rounded-t-lg relative overflow-hidden flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-accent" />
        </div>
      )
    case 'heart-circle':
      return (
        <div className="w-full h-48 bg-gray-800 rounded-t-lg relative overflow-hidden flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
      )
    case 'lines':
      return (
        <div className="w-full h-48 bg-gray-800 rounded-t-lg relative overflow-hidden flex flex-col items-center justify-center gap-3 p-8">
          <div className="w-full h-2 bg-gray-600 rounded" />
          <div className="w-3/4 h-2 bg-gray-600 rounded" />
          <div className="w-full h-2 bg-gray-600 rounded" />
          <div className="w-2/3 h-2 bg-gray-600 rounded" />
        </div>
      )
  }
}

const ProjectsSection = () => {
  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-16 bg-accent" />
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Selected Works
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            >
              Crafting Digital Experiences.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-text-secondary text-lg md:text-xl"
            >
              A curated selection of projects demonstrating my expertise in product design, design systems, and user experience.
            </motion.p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-card rounded-lg border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-300 group"
            >
              {/* Visual */}
              <ProjectVisual type={project.visualType} />

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs text-white bg-white/5 rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* CTA */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors duration-300 group/link"
                >
                  <span className="font-medium">View Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
