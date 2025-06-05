import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#e86e23',
          DEFAULT: '#e86e23',
          dark: '#c64b00',
        },
        background: '#1d1d1d',
        surface: '#232323',
        card: '#272727',
        gray: {
          contrast: '#b3b3b3',
        },
        success: '#4fab2b',
        warning: '#d4d117',
        error: '#c80018',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;