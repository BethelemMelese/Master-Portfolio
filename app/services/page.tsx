import ServicesContent from '@/components/services/ServicesContent'

export const metadata = {
  title: 'Services | Expertise & Services',
  description:
    'Bridging the gap between high-fidelity design and high-performance engineering. Full-stack development, UI/UX, consulting, and more.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesContent />
    </main>
  )
}
