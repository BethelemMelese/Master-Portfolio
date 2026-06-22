import { siteConfig } from '@/lib/seo'

/**
 * JSON-LD structured data for WebSite and Person (portfolio).
 * Helps search engines understand your site and profile.
 */
export default function JsonLd() {
  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', url: `${siteConfig.url}/projects?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
    </>
  )
}
