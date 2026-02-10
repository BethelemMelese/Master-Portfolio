import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Your role in this project (e.g., Frontend Developer, Full Stack Developer)',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      initialValue: [],
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this project as featured on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower numbers appear first)',
      initialValue: 0,
    }),
    defineField({
      name: 'completedDate',
      title: 'Completed Date',
      type: 'date',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    // Project Details Section
    defineField({
      name: 'problem',
      title: 'The Problem',
      type: 'text',
      rows: 3,
      description: 'Describe the problem this project solves',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'text',
      rows: 3,
      description: 'Describe the target audience for this project',
    }),
    defineField({
      name: 'goal',
      title: 'The Goal',
      type: 'text',
      rows: 3,
      description: 'Describe the main goal of this project',
    }),
    // Process Steps
    defineField({
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
    // Key Features
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Feature Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Icon name from lucide-react (e.g., Fingerprint, PieChart, ArrowLeftRight, Moon)',
              options: {
                list: [
                  { title: 'Fingerprint', value: 'Fingerprint' },
                  { title: 'PieChart', value: 'PieChart' },
                  { title: 'ArrowLeftRight', value: 'ArrowLeftRight' },
                  { title: 'Moon', value: 'Moon' },
                  { title: 'Shield', value: 'Shield' },
                  { title: 'Zap', value: 'Zap' },
                  { title: 'Users', value: 'Users' },
                  { title: 'Target', value: 'Target' },
                  { title: 'Globe', value: 'Globe' },
                  { title: 'Check', value: 'Check' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'icon',
            },
          },
        },
      ],
    }),
    // Project Impact Metrics
    defineField({
      name: 'impactMetrics',
      title: 'Project Impact Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Metric Value',
              type: 'string',
              description: 'e.g., "20%", "1.5m", "4.8"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Metric Label',
              type: 'string',
              description: 'e.g., "Retention Uplift", "Active Users"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Metric Description',
              type: 'string',
              description: 'e.g., "Post-launch 3 month average"',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    // Learnings
    defineField({
      name: 'learnings',
      title: 'What I Learned',
      type: 'text',
      rows: 4,
      description: 'Reflection on what you learned from this project',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'thumbnail',
    },
  },
  orderings: [
    {
      title: 'Order, Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Order, Descending',
      name: 'orderDesc',
      by: [{ field: 'order', direction: 'desc' }],
    },
  ],
})
