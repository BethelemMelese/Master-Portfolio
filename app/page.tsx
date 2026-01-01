import HomeContent from '@/components/home/HomeContent'
import { client } from '@/lib/sanity/client'
import { aboutQuery } from '@/lib/sanity/queries'

// Revalidate settings - 0 means always fetch fresh data
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 60
export const dynamic = 'force-dynamic' // Force dynamic rendering to always get fresh data

interface Stat {
  value: string
  label: string
}

export default async function Home() {
  let resumeUrl: string | undefined = undefined
  let heroHeadingPrefix: string | undefined = undefined
  let heroHeadingHighlight: string | undefined = undefined
  let heroHeadingSuffix: string | undefined = undefined
  let heroDescription: string | undefined = undefined
  let availableForWork: boolean | undefined = undefined
  let statistics: Stat[] | undefined = undefined
  
  try {
    // Fetch hero section data from about
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

  return (
    <HomeContent
      resumeUrl={resumeUrl}
      heroHeadingPrefix={heroHeadingPrefix}
      heroHeadingHighlight={heroHeadingHighlight}
      heroHeadingSuffix={heroHeadingSuffix}
      heroDescription={heroDescription}
      availableForWork={availableForWork}
      statistics={statistics}
    />
  )
}
