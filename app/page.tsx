import HomeContent from '@/components/home/HomeContent'
import { client } from '@/lib/sanity/client'
import { aboutQuery, featuredProjectsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

// Revalidate settings - 0 means always fetch fresh data
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 60
export const dynamic = 'force-dynamic' // Force dynamic rendering to always get fresh data

interface Stat {
  value: string
  label: string
}

interface FeaturedProject {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  tags?: string[]
  thumbnailUrl?: string
}

export default async function Home() {
  let resumeUrl: string | undefined = undefined
  let heroHeadingPrefix: string | undefined = undefined
  let heroHeadingHighlight: string | undefined = undefined
  let heroHeadingSuffix: string | undefined = undefined
  let heroDescription: string | undefined = undefined
  let availableForWork: boolean | undefined = undefined
  let statistics: Stat[] | undefined = undefined
  let featuredProjects: FeaturedProject[] = []

  try {
    const aboutData = await client.fetch(aboutQuery)
    resumeUrl = aboutData?.resumeUrl
    heroHeadingPrefix = aboutData?.heroHeadingPrefix
    heroHeadingHighlight = aboutData?.heroHeadingHighlight
    heroHeadingSuffix = aboutData?.heroHeadingSuffix
    heroDescription = aboutData?.heroDescription
    availableForWork = aboutData?.availableForWork
    statistics = aboutData?.statistics
  } catch (error) {
    console.error('Error fetching hero data:', error)
  }

  try {
    const raw = await client.fetch(featuredProjectsQuery)
    const processed = (raw || []).slice(0, 3).map((project: any) => {
      let thumbnailUrl: string | undefined
      if (project?.thumbnail?.asset) {
        try {
          const imageBuilder = urlFor(project.thumbnail)
          thumbnailUrl = imageBuilder ? imageBuilder.url() : project.thumbnail.asset.url
        } catch {
          thumbnailUrl = project.thumbnail?.asset?.url
        }
      }
      return {
        _id: project._id,
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        tags: project.tags || [],
        thumbnailUrl,
      }
    })
    featuredProjects = processed
  } catch (error) {
    console.error('Error fetching featured projects:', error)
  }

  return (
    <HomeContent
      resumeUrl={resumeUrl}
      heroHeadingPrefix={heroHeadingPrefix}
      heroHeadingHighlight={heroHeadingHighlight}
      heroHeadingSuffix={heroHeadingSuffix}
      heroDescription={heroDescription}
      availableForWork={availableForWork}
      statistics={statistics}
      featuredProjects={featuredProjects}
    />
  )
}
