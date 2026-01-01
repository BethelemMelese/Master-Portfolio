import { PortableTextBlock } from '@portabletext/react'

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: {
    current: string
  }
  shortDescription: string
  fullDescription: PortableTextBlock[]
  techStack: string[]
  role?: string
  liveUrl?: string
  githubUrl?: string
  thumbnail: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  images?: Array<{
    asset: {
      _ref: string
      _type: 'reference'
    }
  }>
  featured: boolean
  order: number
  completedDate?: string
  tags?: string[]
}

export interface Skill {
  _id: string
  _type: 'skill'
  name: string
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'design' | 'cms' | 'state' | 'other'
  order: number
  icon?: {
    asset: {
      _id: string
      url: string
    }
  }
}

export interface Experience {
  _id: string
  _type: 'experience'
  role: string
  company: string
  startDate: string
  endDate?: string
  current: boolean
  location?: string
  description: PortableTextBlock[]
  technologies?: string[]
  order: number
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'other'
  url: string
}

export interface About {
  _id: string
  _type: 'about'
  bio: PortableTextBlock[]
  profileImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  resumeUrl?: string
  socialLinks?: SocialLink[]
}

export interface FocusArea {
  _id: string
  _type: 'focusArea'
  title: string
  description: string
  icon: string
  visualType?: 'dots' | 'circles' | 'gradient'
  gradientColors?: {
    from?: string
    to?: string
  }
  order: number
}
