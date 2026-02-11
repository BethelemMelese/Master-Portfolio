'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface FeaturedProject {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  tags?: string[]
  thumbnailUrl?: string
}

interface FeaturedProjectsSectionProps {
  projects: FeaturedProject[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export default function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  if (!projects || projects.length === 0) return null

  return (
    <section className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="h-px bg-accent"
            />
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Featured Work
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-end">
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-white"
            >
              Highlighted Projects.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed"
            >
              A selection of recent work showcasing product design, systems, and
              user experience.
            </motion.p>
          </div>
        </motion.div>

        {/* Projects Grid - top 3 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.15,
              },
            },
          }}
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
        >
          {projects.slice(0, 3).map((project) => (
            <motion.div
              key={project._id}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              className="bg-card rounded-lg border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-300 group cursor-pointer"
            >
              <Link href={`/projects/${project.slug.current}`} className="block">
                {/* Thumbnail */}
                {project.thumbnailUrl ? (
                  <div className="w-full min-w-0 aspect-video flex items-center justify-center overflow-hidden bg-gray-800/80">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="max-w-full max-h-full w-auto h-auto min-w-0 min-h-0 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gray-800/50 flex items-center justify-center border-b border-white/5">
                    <span className="text-text-secondary text-sm">
                      No image
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 text-xs text-white bg-white/5 rounded-full border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed line-clamp-2 mb-5">
                    {project.shortDescription}
                  </p>

                  <span className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors duration-300 font-medium text-sm group-hover/link:gap-3">
                    View Case Study
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 md:mt-12 flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-white hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 group/btn"
          >
            <span className="font-medium text-sm sm:text-base">
              View all projects
            </span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
