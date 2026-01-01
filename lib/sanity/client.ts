import { createClient, type SanityClient } from '@sanity/client'

let _client: SanityClient | null = null

function initializeClient(): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

  if (!projectId) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
  })
}

// Lazy initialization using Proxy
export const client = new Proxy({} as SanityClient, {
  get(_target, prop) {
    if (!_client) {
      _client = initializeClient()
    }
    const value = (_client as any)[prop]
    return typeof value === 'function' ? value.bind(_client) : value
  },
})
