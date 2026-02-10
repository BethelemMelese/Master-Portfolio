'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  shortDescription: string
  tags?: string[]
  thumbnailUrl?: string
}

interface ProjectsContentProps {
  projects: Project[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

const projectCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
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

const ProjectsContent = ({ projects }: ProjectsContentProps) => {
  return (
    <section className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px bg-accent"
            />
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Selected Works
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-end mb-6 sm:mb-8">
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white"
            >
              Crafting Digital Experiences.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
            >
              A curated selection of projects demonstrating my expertise in
              product design, design systems, and user experience.
            </motion.p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
            className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={projectCardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="bg-card rounded-lg border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-300 group cursor-pointer"
              >
                {/* Thumbnail */}
                {project.thumbnailUrl && (
                  <div className="w-full min-w-0 aspect-video flex items-center justify-center overflow-hidden bg-gray-800">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="max-w-full max-h-full w-auto h-auto min-w-0 min-h-0 object-contain"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex flex-wrap gap-2 mb-4"
                    >
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.4 + index * 0.1 + tagIndex * 0.05,
                            duration: 0.3,
                          }}
                          className="px-3 py-1 text-xs text-white bg-white/5 rounded-full border border-white/10"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300"
                  >
                    {project.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-text-secondary mb-6 leading-relaxed text-sm sm:text-base"
                  >
                    {project.shortDescription}
                  </motion.p>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Link
                      href={`/projects/${project.slug.current}`}
                      className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors duration-300 group/link"
                    >
                      <span className="font-medium text-sm sm:text-base">
                        View Case Study
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <p className="text-text-secondary text-lg">No projects found.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectsContent

