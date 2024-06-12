/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx, html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fdc029',
        secondary: '#000000',
      }
    },
  },
  plugins: [],
}

