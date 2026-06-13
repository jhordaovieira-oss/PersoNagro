/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: {
          50: '#EAF3DE',
          100: '#C0DD97',
          400: '#639922',
          600: '#3B6D11',
          800: '#27500A',
        },
        terra: {
          50: '#FAEEDA',
          100: '#FAC775',
          400: '#BA7517',
          800: '#633806',
        }
      }
    },
  },
  plugins: [],
}