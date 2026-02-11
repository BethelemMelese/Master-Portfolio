import ServicesContent from '@/components/services/ServicesContent'
import { client } from '@/lib/sanity/client'
import { servicesQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 60
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Services | Expertise & Services',
  description:
    'Bridging the gap between high-fidelity design and high-performance engineering. Full-stack development, UI/UX, consulting, and more.',
}

const DEFAULT_WHY_IMAGE =
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'

export default async function ServicesPage() {
  let servicesData = null

  try {
    servicesData = await client.fetch(servicesQuery)
  } catch (error) {
    console.error('Error fetching services data:', error)
  }

  let whyImageUrl = DEFAULT_WHY_IMAGE
  let whyImageAlt = 'Laptop with technical work'

  if (servicesData?.whyImage?.asset) {
    try {
      const imageBuilder = urlFor(servicesData.whyImage)
      if (imageBuilder) {
        whyImageUrl =
          imageBuilder.width(800).height(600).fit('crop').url() ||
          (servicesData.whyImage.asset as { url?: string })?.url ||
          DEFAULT_WHY_IMAGE
      } else {
        whyImageUrl =
          (servicesData.whyImage.asset as { url?: string })?.url || DEFAULT_WHY_IMAGE
      }
    } catch (error) {
      console.error('Error processing services why image URL:', error)
    }
    if (servicesData.whyImageAlt) {
      whyImageAlt = servicesData.whyImageAlt
    }
  }

  return (
    <main className="min-h-screen">
      <ServicesContent
        servicesData={servicesData}
        whyImageUrl={whyImageUrl}
        whyImageAlt={whyImageAlt}
      />
    </main>
  )
}
