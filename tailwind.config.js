/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          gold: '#F5A623',
          black: '#0A0A0A',
          dark: '#1A1A1A',
          gray: '#2A2A2A',
        },
        queenPink: '#ff6db1',
        goldAccent: '#f9c74f',
        deepPurple: '#7b2cbf',
      },
    },
  },
  plugins: [],
}
