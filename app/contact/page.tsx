import ContactContent from '@/components/contact/ContactContent'
import { client } from '@/lib/sanity/client'
import { contactQuery } from '@/lib/sanity/queries'

export const dynamic = 'force-dynamic'

export default async function Contact() {
  const contactData = await client.fetch(contactQuery)

  return (
    <main className="min-h-screen">
      <ContactContent contactData={contactData} />
    </main>
  )
}
