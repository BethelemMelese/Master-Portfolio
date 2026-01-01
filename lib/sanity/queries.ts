export const projectQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  shortDescription,
  fullDescription,
  techStack,
  role,
  liveUrl,
  githubUrl,
  thumbnail{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  images[]{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  featured,
  order,
  completedDate,
  tags
}`

export const projectsQuery = `*[_type == "project"] | order(order asc, completedDate desc){
  _id,
  _type,
  title,
  slug,
  shortDescription,
  techStack,
  role,
  liveUrl,
  githubUrl,
  thumbnail{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  featured,
  order,
  completedDate,
  tags
}`

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc, completedDate desc){
  _id,
  _type,
  title,
  slug,
  shortDescription,
  techStack,
  role,
  liveUrl,
  githubUrl,
  thumbnail{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  featured,
  order,
  completedDate,
  tags
}`

export const skillsQuery = `*[_type == "skill"] | order(category asc, order asc){
  _id,
  _type,
  name,
  category,
  order,
  icon {
    asset -> {
      _id,
      url
    }
  }
}`

export const skillsByCategoryQuery = `*[_type == "skill" && category == $category] | order(order asc){
  _id,
  _type,
  name,
  category,
  order,
  icon {
    asset -> {
      _id,
      url
    }
  }
}`

export const experienceQuery = `*[_type == "experience"] | order(startDate desc, order asc){
  _id,
  _type,
  role,
  company,
  startDate,
  endDate,
  current,
  location,
  description,
  technologies,
  order
}`

export const aboutQuery = `*[_type == "about"][0]{
  _id,
  _type,
  name,
  title,
  bio,
  bioParagraphs,
  profileImage{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  location,
  heroHeadingPrefix,
  heroHeadingHighlight,
  heroHeadingSuffix,
  heroDescription,
  resumeUrl,
  linkedinUrl,
  workPrinciples[]{
    title,
    description,
    icon
  },
  techCategories[]{
    title,
    items
  },
  availableForWork,
  statistics[]{
    value,
    label
  },
  socialLinks[]{
    platform,
    url
  }
}`

export const focusAreasQuery = `*[_type == "focusArea"] | order(order asc){
  _id,
  _type,
  title,
  description,
  icon,
  visualType,
  gradientColors,
  order
}`

export const contactQuery = `*[_type == "contact"][0]{
  _id,
  _type,
  email,
  linkedin,
  github,
  heading,
  description
}`