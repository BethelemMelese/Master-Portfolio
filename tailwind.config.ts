import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        'background-light': '#f5f5f5',
        card: '#151515',
        'card-light': '#ffffff',
        accent: '#8f0606',
        'text-primary': '#ffffff',
        'text-primary-light': '#0d0d0d',
        'text-secondary': '#a0a0a0',
        'text-secondary-light': '#666666',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
