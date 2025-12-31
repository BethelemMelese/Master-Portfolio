import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'string',
      description: 'LinkedIn profile URL or path (e.g., /in/betty-melese)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'string',
      description: 'GitHub username or full URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading text (e.g., "Let\'s create something unique.")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text below the heading',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Information',
      }
    },
  },
})

