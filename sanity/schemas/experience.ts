import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if this is your current position',
    }),
    defineField({
      name: 'current',
      title: 'Current Position',
      type: 'boolean',
      description: 'Check if this is your current position',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Remote, New York, NY',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'company',
      startDate: 'startDate',
      endDate: 'endDate',
      current: 'current',
    },
    prepare({ title, subtitle, startDate, endDate, current }) {
      const start = startDate ? new Date(startDate).getFullYear() : ''
      const end = current ? 'Present' : endDate ? new Date(endDate).getFullYear() : ''
      return {
        title: title,
        subtitle: `${subtitle} • ${start}${end ? ` - ${end}` : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, Descending',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Order, Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
