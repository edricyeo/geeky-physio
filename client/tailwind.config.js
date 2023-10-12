/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#112D4E',
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  important: true,
  plugins: [],
}

