/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        senlab: {
          green: '#00853F',
          'green-dark': '#006B32',
          yellow: '#FDEF42',
          red: '#E31B23',
        },
        lab: {
          floor: '#E8E4DF',
          wall: '#F5F5F5',
          counter: '#4A4A4A',
          metal: '#C0C0C0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
