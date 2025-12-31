import AboutContent from '@/components/about/AboutContent'
import { client } from '@/lib/sanity/client'
import { aboutQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

// Revalidate settings - 0 means always fetch fresh data
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 60
export const dynamic = 'force-dynamic' // Force dynamic rendering to always get fresh data

export default async function About() {
  let aboutData = null
  
  try {
    // Fetch data - CDN is already disabled in client config
    aboutData = await client.fetch(aboutQuery)
    
    // Debug: Log the fetched data (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('About Data:', JSON.stringify(aboutData, null, 2))
      console.log('Tech Categories:', aboutData?.techCategories)
      console.log('Work Principles:', aboutData?.workPrinciples)
    }
  } catch (error) {
    console.error('Error fetching about data:', error)
  }

  // Process image URL on the server
  let imageUrl = '/portrait.jpg'
  if (aboutData?.profileImage?.asset) {
    try {
      // Use urlFor to get optimized image URL with proper dimensions
      const imageBuilder = urlFor(aboutData.profileImage)
      if (imageBuilder) {
        imageUrl = imageBuilder.width(800).height(800).fit('crop').url() || aboutData.profileImage.asset.url || '/portrait.jpg'
      } else {
        imageUrl = aboutData.profileImage.asset.url || '/portrait.jpg'
      }
    } catch (error) {
      console.error('Error processing image URL:', error)
      // Fallback to direct URL if available
      imageUrl = aboutData.profileImage?.asset?.url || '/portrait.jpg'
    }
  }

  return (
    <main className="min-h-screen pt-8 md:pt-12">
      <AboutContent aboutData={aboutData} imageUrl={imageUrl} />
    </main>
  )
}
