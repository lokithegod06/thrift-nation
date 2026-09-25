import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1b1c1c',
        secondary: '#6b6b6b',
        surface: '#fbf9f9',
        'surface-container-low': '#f2eeee',
        'on-primary': '#ffffff',
        'on-surface': '#1b1c1c',
      },
      fontFamily: {
        'display-lg': ['Archivo Narrow', 'sans-serif'],
        'headline-lg': ['Archivo Narrow', 'sans-serif'],
        'headline-md': ['Archivo Narrow', 'sans-serif'],
        'body-lg': ['Geist', 'sans-serif'],
        'body-md': ['Geist', 'sans-serif'],
        'label-mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-lg': ['5rem', { lineHeight: '0.95' }],
        'headline-lg': ['3rem', { lineHeight: '1' }],
        'headline-lg-mobile': ['2.25rem', { lineHeight: '1' }],
        'headline-md': ['2rem', { lineHeight: '1.05' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5' }],
        'body-md': ['1rem', { lineHeight: '1.5' }],
        'label-mono': ['0.75rem', { lineHeight: '1.25' }],
      },
    },
  },
  plugins: [],
};

export default config;