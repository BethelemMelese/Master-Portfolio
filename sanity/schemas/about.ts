import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bioParagraphs',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Simple text paragraphs for the bio section',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "San Francisco, CA"',
    }),
    defineField({
      name: 'heroHeadingPrefix',
      title: 'Hero Heading Prefix',
      type: 'string',
      description: 'First part of the hero heading (e.g., "Crafting")',
    }),
    defineField({
      name: 'heroHeadingHighlight',
      title: 'Hero Heading Highlight',
      type: 'string',
      description: 'Highlighted word in the hero heading (e.g., "Intuitive")',
    }),
    defineField({
      name: 'heroHeadingSuffix',
      title: 'Hero Heading Suffix',
      type: 'string',
      description: 'Last part of the hero heading (e.g., "Digital Future.")',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      description: 'Description text below the hero heading',
      rows: 3,
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume URL',
      type: 'url',
      description: 'Link to your resume PDF',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'workPrinciples',
      title: 'Work Principles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Users', value: 'Users' },
                  { title: 'Bar Chart', value: 'BarChart3' },
                  { title: 'Infinity', value: 'Infinity' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'techCategories',
      title: 'Tech & Tools Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Category Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'availableForWork',
      title: 'Available for Work',
      type: 'boolean',
      description: 'Show "Open to new opportunities" badge',
      initialValue: true,
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      description: 'Statistics to display on the homepage (e.g., Years of Experience, Projects, Awards)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The statistic value (e.g., "7+", "50+", "12")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The statistic label (e.g., "Years Exp.", "Projects", "Awards")',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Email', value: 'email' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About',
      }
    },
  },
})
