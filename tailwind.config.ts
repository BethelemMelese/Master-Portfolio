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
        primary: '#8e0606',
        charcoal: '#1a1a1a',
        muted: '#8a6060',
        'background-light': '#fafafa',
        'background-dark': '#1b1b1d',
        'accent-bronze': '#bda78a',
        // Legacy colors for backward compatibility
        background: '#0d0d0d',
        card: '#151515',
        'card-light': '#ffffff',
        accent: '#8f0606',
        'text-primary': '#ffffff',
        'text-primary-light': '#0d0d0d',
        'text-secondary': '#a0a0a0',
        'text-secondary-light': '#666666',
      },
      fontFamily: {
        display: ['Noto Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
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
