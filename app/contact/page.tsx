import ContactContent from '@/components/contact/ContactContent'
import { client } from '@/lib/sanity/client'
import { contactQuery } from '@/lib/sanity/queries'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch for collaborations, freelance work, or project inquiries. Available for new opportunities.',
  openGraph: {
    title: 'Contact | Betisha',
    description: 'Get in touch for collaborations and project inquiries.',
  },
}

export default async function Contact() {
  const contactData = await client.fetch(contactQuery)

  return (
    <main className="min-h-screen">
      <ContactContent contactData={contactData} />
    </main>
  )
}
