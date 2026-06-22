import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'
import { client } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '')

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  let projectSlugs: { slug: string }[] = []
  try {
    projectSlugs = await client.fetch<{ slug: string }[]>(
      `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`
    )
  } catch (e) {
    console.error('Sitemap: failed to fetch project slugs', e)
  }

  const projectRoutes: MetadataRoute.Sitemap = (projectSlugs || []).map(({ slug }) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes]
}
