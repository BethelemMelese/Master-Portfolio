import ProjectsContent from '@/components/projects/ProjectsContent'
import { client } from '@/lib/sanity/client'
import { projectsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { Metadata } from 'next'

export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 60
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Portfolio of web and product projects. Case studies, tech stack, and outcomes for each project.',
  openGraph: {
    title: 'Projects | Betisha',
    description: 'Portfolio of web and product projects. Case studies and outcomes.',
  },
}

export default async function Projects() {
  let projects: any[] = []
  
  try {
    projects = await client.fetch(projectsQuery)
  } catch (error) {
    console.error('Error fetching projects:', error)
  }

  // Process project images
  const processedProjects = projects.map((project) => {
    let thumbnailUrl: string | undefined
    if (project?.thumbnail?.asset) {
      try {
        const imageBuilder = urlFor(project.thumbnail)
        if (imageBuilder) {
          thumbnailUrl = imageBuilder.url() || project.thumbnail.asset.url
        } else {
          thumbnailUrl = project.thumbnail.asset.url
        }
      } catch (error) {
        console.error('Error processing thumbnail URL:', error)
        thumbnailUrl = project.thumbnail?.asset?.url
      }
    }

    return {
      _id: project._id,
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      tags: project.tags || [],
      thumbnailUrl
    }
  })

  return (
    <main className="min-h-screen pt-8 md:pt-12">
      <ProjectsContent projects={processedProjects} />
    </main>
  )
}
