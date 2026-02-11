import { defineField, defineType } from 'sanity'

const serviceIconOptions = [
  { title: 'Code (Full-Stack)', value: 'Code2' },
  { title: 'Cursor (UI/UX)', value: 'MousePointer2' },
  { title: 'Building (Enterprise)', value: 'Building2' },
  { title: 'Gauge (Performance)', value: 'Gauge' },
  { title: 'Users (Consulting)', value: 'Users' },
]

export default defineType({
  name: 'services',
  title: 'Services Page',
  type: 'document',
  fields: [
    // Hero
    defineField({
      name: 'heroTitlePrefix',
      title: 'Hero Title Prefix',
      type: 'string',
      description: 'e.g. "Expertise &"',
      initialValue: 'Expertise &',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero Title Highlight',
      type: 'string',
      description: 'Word in accent color, e.g. "Services"',
      initialValue: 'Services',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Paragraph below the hero heading',
      rows: 3,
    }),
    // Services grid
    defineField({
      name: 'servicesList',
      title: 'Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: serviceIconOptions },
              validation: (Rule) => Rule.required(),
            },
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
              name: 'items',
              title: 'Bullet Points',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title: title || 'Service' }
            },
          },
        },
      ],
    }),
    // Why Work With Me
    defineField({
      name: 'whySectionTitle',
      title: 'Why Section Title',
      type: 'string',
      initialValue: 'Why Work With Me?',
    }),
    defineField({
      name: 'whyPoints',
      title: 'Why Work With Me Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title: title || 'Point' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'whyImage',
      title: 'Why Section Image',
      type: 'image',
      description: 'Image shown next to "Why Work With Me" (e.g. laptop). Optional; fallback used if empty.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'whyImageAlt',
      title: 'Why Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'experienceBadgeValue',
      title: 'Experience Badge Value',
      type: 'string',
      description: 'e.g. "10+"',
      initialValue: '10+',
    }),
    defineField({
      name: 'experienceBadgeLabel',
      title: 'Experience Badge Label',
      type: 'string',
      description: 'e.g. "YEARS INDUSTRY EXP"',
      initialValue: 'YEARS INDUSTRY EXP',
    }),
    // Process
    defineField({
      name: 'processTitle',
      title: 'Process Section Title',
      type: 'string',
      initialValue: 'The Process',
    }),
    defineField({
      name: 'processSubtitle',
      title: 'Process Subtitle',
      type: 'string',
      initialValue: 'A structured path from initial spark to final launch.',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number', type: 'string', description: 'e.g. "01", "02"', validation: (Rule) => Rule.required() },
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { number: 'number', title: 'title' },
            prepare({ number, title }) {
              return { title: `${number || '?'} ${title || 'Step'}` }
            },
          },
        },
      ],
    }),
    // CTA
    defineField({
      name: 'ctaHeadingMain',
      title: 'CTA Heading (main)',
      type: 'string',
      description: 'e.g. "Ready to build something"',
      initialValue: "Ready to build something",
    }),
    defineField({
      name: 'ctaHeadingHighlight',
      title: 'CTA Heading (highlight)',
      type: 'string',
      description: 'Accent part, e.g. "exceptional?"',
      initialValue: 'exceptional?',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaPrimaryText',
      title: 'CTA Primary Button Text',
      type: 'string',
      initialValue: "Let's Work Together",
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'CTA Primary Button Link',
      type: 'string',
      description: 'Path or URL, e.g. /contact',
      initialValue: '/contact',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'CTA Secondary Button Text',
      type: 'string',
      initialValue: 'View My Portfolio',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'CTA Secondary Button Link',
      type: 'string',
      description: 'Path or URL, e.g. /projects',
      initialValue: '/projects',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Services Page' }
    },
  },
})
