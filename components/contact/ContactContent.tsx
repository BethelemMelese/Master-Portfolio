'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, User, AtSign, ArrowRight, Lock, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'

interface ContactData {
  email: string
  linkedin: string
  github: string
  heading: string
  description: string
}

interface ContactContentProps {
  contactData: ContactData | null
}

const ContactContent = ({ contactData }: ContactContentProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Format LinkedIn URL
  const getLinkedInUrl = (linkedin: string) => {
    if (linkedin.startsWith('http')) return linkedin
    if (linkedin.startsWith('/')) return `https://www.linkedin.com${linkedin}`
    return `https://www.linkedin.com/in/${linkedin}`
  }

  // Format GitHub URL
  const getGitHubUrl = (github: string) => {
    if (github.startsWith('http')) return github
    return `https://github.com/${github.replace(/^(github\.com\/|@)/, '')}`
  }

  // Format GitHub display value
  const getGitHubDisplay = (github: string) => {
    return github.replace(/^(https?:\/\/)?(www\.)?github\.com\//, '').replace(/^@/, '')
  }

  // Use CMS data or fallback to defaults
  const email = contactData?.email || 'melesebety2673@gmail.com'
  const linkedin = contactData?.linkedin || '/in/betty-melese'
  const github = contactData?.github || 'BethelemMelese'
  const heading = contactData?.heading || "Let's create something unique."
  const description = contactData?.description || "I'm currently looking for new opportunities in Product Design and UX Strategy. Whether you have a project in mind or just want to say hello, feel free to reach out."

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: email,
      href: `mailto:${email}`
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: linkedin.startsWith('/') ? linkedin : linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//, '/in/'),
      href: getLinkedInUrl(linkedin)
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: `github.com/${getGitHubDisplay(github)}`,
      href: getGitHubUrl(github)
    }
  ]

  return (
    <section className="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20">
      <div className="container mx-auto px-8 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Information */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Open to Work Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-accent"
                />
                <span className="text-accent text-xs font-medium uppercase tracking-wide">
                  Open to Work
                </span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {heading.split('\n').map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 2 && <br />}
                  </span>
                ))}
              </h1>

              {/* Description */}
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-12">
                {description}
              </p>

              {/* Contact Details */}
              <div>
                <h2 className="text-white font-bold text-xl uppercase tracking-wider mb-4">
                  Contact Details
                </h2>

                <div className="space-y-2">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      className="flex items-start gap-4 group p-4 rounded-lg hover:bg-card/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-card border border-white/10 rounded-lg flex items-center justify-center text-white group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300">
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm mb-1">{method.label}</p>
                        <p className="text-white group-hover:text-accent transition-colors duration-300">
                          {method.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-lg border border-white/10 p-6 md:p-8 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-card to-card opacity-100" />
              <div className="relative z-10">
              <h2 className="text-white font-bold text-3xl md:text-4xl mb-2">
                Send a message.
              </h2>
              <p className="text-text-secondary mb-8">
                Fill out the form below and I&#39;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name Field */}
                <div>
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-background border border-white/10 rounded-lg text-white placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                      <AtSign className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-background border border-white/10 rounded-lg text-white placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-white placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400"
                  >
                    <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:bg-accent/50 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Confidentiality Note */}
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Your message will be handled professionally and kept confidential.</span>
                </div>
              </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactContent
