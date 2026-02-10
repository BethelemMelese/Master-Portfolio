import ProjectDetailContent from '@/components/projects/ProjectDetailContent'
import { client } from '@/lib/sanity/client'
import { projectQuery, projectsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'

export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 60
export const dynamic = 'force-dynamic'

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string }
}) {
  let project = null
  
  try {
    project = await client.fetch(projectQuery, { slug: params.slug })
    
    if (!project) {
      notFound()
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    notFound()
  }

  // Process thumbnail image URL
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

  // Process project images
  const imageUrls: string[] = []
  if (project?.images && Array.isArray(project.images)) {
    project.images.forEach((img: any) => {
      if (img?.asset) {
        try {
          const imageBuilder = urlFor(img)
          if (imageBuilder) {
            const url = imageBuilder.url() || img.asset.url
            if (url) imageUrls.push(url)
          } else {
            if (img.asset.url) imageUrls.push(img.asset.url)
          }
        } catch (error) {
          console.error('Error processing image URL:', error)
          if (img.asset.url) imageUrls.push(img.asset.url)
        }
      }
    })
  }

  // Fetch previous & next projects
  let nextProject = null
  let prevProject = null
  try {
    const allProjects = await client.fetch(projectsQuery)
    const currentIndex = allProjects.findIndex((p: any) => p._id === project._id)
    if (currentIndex !== -1) {
      // Next project (if exists)
      if (currentIndex < allProjects.length - 1) {
        const next = allProjects[currentIndex + 1]
        let nextThumbnailUrl: string | undefined
        if (next?.thumbnail?.asset) {
          try {
            const imageBuilder = urlFor(next.thumbnail)
            if (imageBuilder) {
              nextThumbnailUrl = imageBuilder.url() || next.thumbnail.asset.url
            } else {
              nextThumbnailUrl = next.thumbnail.asset.url
            }
          } catch (error) {
            nextThumbnailUrl = next.thumbnail?.asset?.url
          }
        }
        nextProject = {
          slug: next.slug.current,
          title: next.title,
          thumbnailUrl: nextThumbnailUrl,
        }
      }

      // Previous project (if exists)
      if (currentIndex > 0) {
        const prev = allProjects[currentIndex - 1]
        let prevThumbnailUrl: string | undefined
        if (prev?.thumbnail?.asset) {
          try {
            const imageBuilder = urlFor(prev.thumbnail)
            if (imageBuilder) {
              prevThumbnailUrl = imageBuilder.url() || prev.thumbnail.asset.url
            } else {
              prevThumbnailUrl = prev.thumbnail.asset.url
            }
          } catch (error) {
            prevThumbnailUrl = prev.thumbnail?.asset?.url
          }
        }
        prevProject = {
          slug: prev.slug.current,
          title: prev.title,
          thumbnailUrl: prevThumbnailUrl,
        }
      }
    }
  } catch (error) {
    console.error('Error fetching next project:', error)
  }

  return (
    <main className="min-h-screen">
      <ProjectDetailContent 
        project={project} 
        thumbnailUrl={thumbnailUrl}
        imageUrls={imageUrls}
        nextProject={nextProject}
        prevProject={prevProject}
      />
    </main>
  )
}
