/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './templates/**/*.{hbs,js}',
    "./src/**/*.{html,js}",
    './views/**/*.{html, js}'
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#121212',
      'gray': '#4b5563',
      'green': '#769656',
      'creamwhite': '#eeeed2',
      'red': '#cc0000'
    },
  },
  plugins: [],
}