'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Code2,
  MousePointer2,
  Building2,
  Gauge,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Shared animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}
const fadeInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
}
const fadeInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
}
const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
const transitionFast = { duration: 0.4, ease: [0.22, 1, 0.36, 1] }

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Web Development',
    description:
      'Building scalable, robust, and lightning-fast web applications from architecture to deployment.',
    items: [
      'Scalable React & Next.js Architectures',
      'Node.js & Python Backend API Systems',
      'Modern Database Design & Integration',
    ],
  },
  {
    icon: MousePointer2,
    title: 'UI/UX & System Design',
    description:
      'Creating consistent visual languages that improve user engagement and development speed.',
    items: [
      'Comprehensive Design Systems in Figma',
      'User Journey Mapping & Prototyping',
      'Accessibility-First Visual Design',
    ],
  },
  {
    icon: Building2,
    title: 'Business & Enterprise',
    description:
      'Simplifying complex data workflows and internal tools for high-efficiency operations.',
    items: [
      'Custom ERP & CRM Dashboards',
      'Internal Tooling & Workflow Automation',
      'Data Visualization & Reporting',
    ],
  },
  {
    icon: Gauge,
    title: 'Performance & Code Quality',
    description:
      'Optimizing existing applications for speed, security, and maintainability.',
    items: [
      'Web Vitals Optimization & SEO',
      'Codebase Refactoring & Security Audits',
      'CI/CD Pipelines & DevOps Setup',
    ],
  },
  {
    icon: Users,
    title: 'Consulting & Leadership',
    description:
      'Guiding engineering teams and founders through technical hurdles and product strategy.',
    items: [
      'Product Roadmap & Technical Strategy',
      'Tech-Stack Selection & Architecture Advice',
      'Dev-Team Mentorship & Process Design',
    ],
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'In-depth research and goal alignment to define project scope.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Architecting solutions and mapping out the user journey.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Design execution and high-performance coding phase.',
  },
  {
    number: '04',
    title: 'Iteration',
    description: 'Continuous feedback loops and post-launch refinement.',
  },
]

const whyWorkWithMe = [
  {
    title: 'Design-to-Code Efficiency',
    description:
      'Zero communication loss. I translate designs into pixel-perfect code myself, reducing overhead.',
  },
  {
    title: 'Product-First Thinking',
    description:
      "I don't just build features; I focus on your business goals and user needs from day one.",
  },
  {
    title: 'Modern Tech Stack',
    description:
      'Leveraging the latest stable technologies to ensure your product is future-proof and performant.',
  },
]

export default function ServicesContent() {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const whyRef = useRef(null)
  const processRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, margin: '-50px' })
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' })
  const whyInView = useInView(whyRef, { once: true, margin: '-80px' })
  const processInView = useInView(processRef, { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-50px' })

  return (
    <div className="min-h-screen">
      {/* Hero / Expertise & Services */}
      <section
        ref={heroRef}
        className="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={transition}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.1 }}
            >
              Expertise &{' '}
              <span className="text-accent">Services</span>
            </motion.h1>
            <motion.p
              className="text-white/90 text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.2 }}
            >
              Bridging the gap between high-fidelity design and high-performance
              engineering to build digital products that move the needle.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={gridRef} className="pb-16 md:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ ...transitionFast, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-xl bg-card border border-white/5 p-5 md:p-6 hover:border-white/10 transition-colors duration-300"
                >
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white mb-4"
                    initial={{ scale: 0 }}
                    animate={gridInView ? { scale: 1 } : {}}
                    transition={{ ...transitionFast, delay: index * 0.1 + 0.15 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <h2 className="text-white font-bold text-lg md:text-xl mb-2">
                    {service.title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-white/90 text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section ref={whyRef} className="pb-16 md:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={whyInView ? 'visible' : 'hidden'}
              variants={fadeInLeft}
              transition={transition}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: 16 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...transition, delay: 0.1 }}
              >
                Why Work With Me?
              </motion.h2>
              <div className="space-y-8">
                {whyWorkWithMe.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={whyInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ ...transition, delay: 0.2 + index * 0.12 }}
                    className="bg-accent/15 rounded-lg border-l-4 border-accent p-4 md:pl-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/5"
                  >
                    <h3 className="text-white font-bold text-lg md:text-xl mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={whyInView ? 'visible' : 'hidden'}
              variants={fadeInRight}
              transition={{ ...transition, delay: 0.15 }}
              className="relative"
            >
              <motion.div
                className="relative rounded-xl overflow-hidden aspect-[4/3] max-w-lg mx-auto lg:mx-0 bg-card border border-white/10"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={whyInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ ...transition, delay: 0.2 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"
                  alt="Laptop with technical work"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 md:right-4 lg:right-8 rounded-xl bg-card border border-white/10 px-5 py-4 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={whyInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ ...transition, delay: 0.45 }}
              >
                <span className="text-accent font-bold text-3xl block leading-none">
                  10+
                </span>
                <span className="text-white text-xs font-medium uppercase tracking-wider">
                  YEARS INDUSTRY EXP
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section ref={processRef} className="pb-16 md:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={processInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={transition}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.05 }}
            >
              The Process
            </motion.h2>
            <motion.p
              className="text-white/80 text-base md:text-lg max-w-xl mx-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.15 }}
            >
              A structured path from initial spark to final launch.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Connecting line - visible on all screen sizes: vertical when stacked, horizontal when in row(s) */}
            <motion.div
              className="absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-px bg-accent md:hidden origin-top"
              initial={{ scaleY: 0 }}
              animate={processInView ? { scaleY: 1 } : {}}
              transition={{ ...transition, delay: 0.2 }}
              aria-hidden
            />
            <motion.div
              className="absolute top-8 left-0 right-0 h-0.5 bg-accent hidden md:block origin-left"
              initial={{ scaleX: 0 }}
              animate={processInView ? { scaleX: 1 } : {}}
              transition={{ ...transition, delay: 0.2 }}
              aria-hidden
            />
            {/* Second row line on tablet (2 cols) */}
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-accent hidden md:block lg:hidden origin-left"
              style={{ top: '50%' }}
              initial={{ scaleX: 0 }}
              animate={processInView ? { scaleX: 1 } : {}}
              transition={{ ...transition, delay: 0.35 }}
              aria-hidden
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {processSteps.map((step, index) => {
                const isLast = index === processSteps.length - 1
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 24 }}
                    animate={processInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...transitionFast, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="relative flex flex-col items-center text-center"
                  >
                    <motion.div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10 ${
                        isLast
                          ? 'bg-accent'
                          : 'bg-transparent border-2 border-accent'
                      }`}
                      initial={{ scale: 0 }}
                      animate={processInView ? { scale: 1 } : {}}
                      transition={{ ...transitionFast, delay: 0.25 + index * 0.1 }}
                    >
                      {step.number}
                    </motion.div>
                    <h3
                      className={`font-bold text-lg mb-2 ${
                        isLast ? 'text-accent' : 'text-white'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="pb-20 md:pb-24 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={transition}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            className="max-w-3xl mx-auto rounded-2xl bg-card border border-white/10 p-8 md:p-10 lg:p-12 text-center"
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.1 }}
            >
              Ready to build something{' '}
              <span className="text-accent">exceptional?</span>
            </motion.h2>
            <motion.p
              className="text-white/80 text-base md:text-lg mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.2 }}
            >
              Whether you have a fully-formed idea or just the start of a
              concept, let&apos;s chat about how we can make it a reality.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.3 }}
            >
              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white rounded-lg px-6 md:px-8"
              >
                <Link href="/contact">Let&apos;s Work Together</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-lg px-6 md:px-8 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/projects">View My Portfolio</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
