/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#E50914',
        background: {
          dark: '#141414',
          light: '#FFFFFF',
        },
        surface: {
          dark: '#1F1F1F',
          light: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
}
