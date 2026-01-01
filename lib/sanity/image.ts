import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

let _builder: ImageUrlBuilder | null = null

function getBuilder(): ImageUrlBuilder {
  if (!_builder) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

    if (!projectId) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
        console.error('Please create a .env.local file with:')
        console.error('NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id')
        console.error('NEXT_PUBLIC_SANITY_DATASET=production')
      }
      throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
    }

    if (!dataset) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
      }
      throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
    }

    _builder = imageUrlBuilder({
      projectId,
      dataset,
    })
  }
  return _builder
}

export function urlFor(source: SanityImageSource) {
  try {
    const builder = getBuilder()
    return builder.image(source)
  } catch (error) {
    console.error('Error creating image URL builder:', error)
    throw error
  }
}
