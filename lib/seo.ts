/**
 * Central SEO config. Set NEXT_PUBLIC_SITE_URL in .env.local for production.
 */
export const siteConfig = {
  name: 'Betisha',
  shortName: 'Betisha',
  description:
    'Professional portfolio showcasing projects, skills, and experience. Full-stack developer and designer.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.betisham.com/',
  ogImagePath: '/og-image.png', // add a 1200x630 image at public/og-image.png for social shares
  twitterHandle: '', // e.g. '@betisha'
  locale: 'en_US',
  themeColor: '#8f0606',
} as const

export function getAbsoluteUrl(path: string = '') {
  const base = siteConfig.url.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}
