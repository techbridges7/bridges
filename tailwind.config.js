/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors:{
        primary:"#a71615",
        secondary:"#2d4e90",
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '0',
        
        
        
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar'), require('@tailwindcss/aspect-ratio')],
}