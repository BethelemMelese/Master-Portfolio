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

function getClient(): SanityClient {
  if (!_client) {
    _client = initializeClient()
  }
  return _client
}

// Lazy initialization using Proxy - works for both server and client components
export const client = new Proxy({} as SanityClient, {
  get(_target, prop) {
    const actualClient = getClient()
    const value = (actualClient as any)[prop]
    if (typeof value === 'function') {
      return value.bind(actualClient)
    }
    return value
  },
  has(_target, prop) {
    const actualClient = getClient()
    return prop in actualClient
  },
  ownKeys(_target) {
    const actualClient = getClient()
    return Object.keys(actualClient)
  },
  getOwnPropertyDescriptor(_target, prop) {
    const actualClient = getClient()
    const descriptor = Object.getOwnPropertyDescriptor(actualClient, prop)
    return descriptor || {
      enumerable: true,
      configurable: true,
    }
  },
})
