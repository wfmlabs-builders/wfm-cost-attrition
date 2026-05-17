/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#FFF0E6',
          100: '#FFD9BF',
          200: '#FFC299',
          300: '#FFAB73',
          400: '#FF8C40',
          500: '#FF6D00',
          600: '#CC5700',
          700: '#994100',
          800: '#662C00',
          900: '#331600',
        },
        teal: {
          50: '#E0F7F7',
          100: '#B3ECEC',
          200: '#80DFDF',
          300: '#4DD2D2',
          400: '#26C8C8',
          500: '#00A3A1',
          600: '#008381',
          700: '#006261',
          800: '#004140',
          900: '#002120',
        },
        dark: '#111827',
        darker: '#0a0f1a',
        card: '#1a2332',
        'card-border': '#2a3444',
      },
    },
  },
  plugins: [],
}
