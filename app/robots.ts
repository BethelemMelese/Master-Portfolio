import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, '')
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/studio/'] },
    sitemap: `${base}/sitemap.xml`,
  }
}
