/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shop: {
          100: '#A3C9D9',
          200: '#283D40',
          300: '#D8F0F2',
          400: '#6D8C84',
          500: '#595840'
        }
      }
    }
  },
  plugins: []
}
