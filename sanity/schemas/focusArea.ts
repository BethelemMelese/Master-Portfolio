import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'focusArea',
  title: 'Focus Area',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from Lucide (e.g., map-pin, target, sparkles, layers)',
      options: {
        list: [
          { title: 'Map Pin', value: 'map-pin' },
          { title: 'Target', value: 'target' },
          { title: 'Sparkles', value: 'sparkles' },
          { title: 'Layers', value: 'layers' },
          { title: 'Rocket', value: 'rocket' },
          { title: 'Zap', value: 'zap' },
          { title: 'Lightbulb', value: 'lightbulb' },
          { title: 'Star', value: 'star' },
          { title: 'X', value: 'x' },
          { title: 'Check', value: 'check' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visualType',
      title: 'Visual Type',
      type: 'string',
      description: 'Type of visual effect for this focus area',
      options: {
        list: [
          { title: 'Animated Dots', value: 'dots' },
          { title: 'Concentric Circles', value: 'circles' },
          { title: 'Gradient', value: 'gradient' },
        ],
      },
      initialValue: 'gradient',
    }),
    defineField({
      name: 'gradientColors',
      title: 'Gradient Colors',
      type: 'object',
      description: 'Colors for gradient visual (only used if visual type is gradient)',
      fields: [
        {
          name: 'from',
          title: 'From Color',
          type: 'string',
          description: 'CSS color (e.g., #3b82f6, blue-500)',
        },
        {
          name: 'to',
          title: 'To Color',
          type: 'string',
          description: 'CSS color (e.g., #1e40af, blue-600)',
        },
      ],
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
      title: 'title',
      icon: 'icon',
    },
    prepare({ title, icon }) {
      return {
        title: title,
        subtitle: `Icon: ${icon || 'none'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order, Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

